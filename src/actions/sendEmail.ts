"use server";

import { Resend } from "resend";

// Initialize Resend with your environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !message) {
    return { error: "Please fill out all fields." };
  }

  try {
    const data = await resend.emails.send({
      from: "Swarn Srinkhla Concierge <onboarding@resend.dev>", // Resend's testing email
      to: "snehilraj9570@gmail.com", // <-- REPLACE THIS WITH YOUR REAL EMAIL
      subject: `New Concierge Inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; color: #1A1A1A;">
          <h2 style="color: #D4AF37;">Swarn Srinkhla Concierge Desk</h2>
          <p><strong>Guest Name:</strong> ${name}</p>
          <p><strong>Reply to:</strong> ${email}</p>
          <hr style="border-color: #E0E0E0;" />
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    return { error: "Failed to send message. Please try again later." };
  }
}