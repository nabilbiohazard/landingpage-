"use client";

import { FormEvent, useRef, useState } from "react";

type SubmitState = "idle" | "sending" | "success" | "error";

export default function SeatRequest() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setState("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/seat-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fields.get("name"),
          email: fields.get("email"),
          phone: fields.get("phone"),
          guests: Number(fields.get("guests")),
          note: fields.get("note"),
          website: fields.get("website"),
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error ?? "Your request could not be sent. Please try again.");
      }

      form.reset();
      setState("success");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Your request could not be sent. Please try again.");
      setState("error");
    }
  }

  return (
    <>
      <button className="seat-request" type="button" onClick={() => { setState("idle"); dialogRef.current?.showModal(); }}>
        <span>REQUEST A SEAT</span><span className="seat-arrow" aria-hidden="true">↗</span>
      </button>
      <dialog className="seat-dialog" ref={dialogRef} onClose={() => setState("idle")} aria-labelledby="seat-dialog-title">
        <button className="dialog-close" type="button" onClick={() => dialogRef.current?.close()} aria-label="Close request form">×</button>
        {state === "success" ? (
          <div className="seat-success" role="status">
            <p className="section-number">ROŪ · DINNER IN TEHRAN</p>
            <h2 id="seat-dialog-title">REQUEST RECEIVED</h2>
            <p>Thank you. Your seat request has been received.</p>
            <button className="form-submit" type="button" onClick={() => dialogRef.current?.close()}>CLOSE</button>
          </div>
        ) : (
          <>
            <p className="section-number">ROŪ · DINNER IN TEHRAN</p>
            <h2 id="seat-dialog-title">REQUEST A SEAT</h2>
            <p className="dialog-intro">Leave your details and we&apos;ll be in touch about the evening.</p>
            <form className="seat-form" onSubmit={submitRequest}>
              <label>Full name<input name="name" type="text" autoComplete="name" maxLength={100} required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
              <label>Phone number<input name="phone" type="tel" autoComplete="tel" maxLength={40} required /></label>
              <label>Seats requested<select name="guests" defaultValue="1">{Array.from({ length: 8 }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}</select></label>
              <label>Note <span>(optional)</span><textarea name="note" rows={3} maxLength={1000} /></label>
              <input className="form-honeypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              {state === "error" && <p className="form-error" role="alert">{errorMessage}</p>}
              <button className="form-submit" type="submit" disabled={state === "sending"}>
                {state === "sending" ? "SENDING…" : "SEND REQUEST"}
              </button>
            </form>
          </>
        )}
      </dialog>
    </>
  );
}
