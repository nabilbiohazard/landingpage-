# ROŪ dinner invitation

A responsive Next.js invitation page with a photo slideshow, background music, and a seat request form.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Connect seat requests to Google Sheets

The form sends requests to the server route at `/api/seat-requests`. The server appends a row to a Google Sheet. Google credentials must stay on the server; never add them to `NEXT_PUBLIC_` variables or commit them.

1. Create or choose a Google Sheet. Add a tab named `Seat Requests` with these headers in row 1: `Submitted at`, `Name`, `Email`, `Phone`, `Seats`, `Note`.
2. In a Google Cloud project, enable the Google Sheets API and create a service account with a JSON key.
3. Share the Sheet with the service account email as an Editor.
4. Add the following variables to `.env.local` (and to your hosting provider's server environment):

```text
GOOGLE_SHEET_ID=the_id_between_d_and_edit_in_the_sheet_url
GOOGLE_SHEET_TAB=Seat Requests
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

The form saves the submission time, name, email, phone, seat count, and optional note. It only shows a success message after Google Sheets confirms the append. If the variables are missing or Sheets rejects the write, the form shows an error and keeps the visitor's details so they can retry.

Run `npm run build` and `npm run lint` before deployment.
