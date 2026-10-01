import { google } from "googleapis";

export const runtime = "nodejs";

type SeatRequest = {
  name?: unknown;
  phone?: unknown;
  guests?: unknown;
  note?: unknown;
  website?: unknown;
};

export async function POST(request: Request) {
  const bodyText = await request.text();
  if (bodyText.length > 10_000) {
    return Response.json({ error: "Request is too large." }, { status: 413 });
  }

  let body: SeatRequest;
  try {
    body = JSON.parse(bodyText);
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.website) return Response.json({ ok: true });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const note = typeof body.note === "string" ? body.note.trim() : "";
  const guests = body.guests;

  if (
    !name || name.length > 100 ||
    !/^09\d{9}$/.test(phone) ||
    !Number.isInteger(guests) || Number(guests) < 1 || Number(guests) > 8 ||
    note.length > 1000
  ) {
    return Response.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const keyFile = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;
  const tab = process.env.GOOGLE_SHEET_TAB || "Seat Requests";

  if (!spreadsheetId || (!keyFile && (!clientEmail || !privateKey))) {
    return Response.json({ error: "Seat requests are not available yet. Please try again later." }, { status: 503 });
  }

  try {
    const auth = new google.auth.GoogleAuth({
      ...(keyFile
        ? { keyFile }
        : { credentials: { client_email: clientEmail, private_key: privateKey?.replace(/\\n/g, "\n") } }),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `'${tab.replaceAll("'", "''")}'!A:E`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [[new Date().toISOString(), name, phone, guests, note]] },
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("Seat request could not be saved to Google Sheets:", error instanceof Error ? error.message : "Unknown error");
    return Response.json({ error: "Your request could not be saved. Please try again later." }, { status: 502 });
  }
}
