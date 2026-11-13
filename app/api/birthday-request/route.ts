import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend with your environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { requestText } = await request.json();

    if (!requestText || requestText.trim() === '') {
      return NextResponse.json({ error: 'Request cannot be empty.' }, { status: 400 });
    }

    // Send the email via Resend
    const data = await resend.emails.send({
      from: 'Multiverse Portfolio <onboarding@resend.dev>', // Or your verified domain email
      to: ['krizzyworld9@gmail.com'],
      subject: "Oluchi's Birthday Request",
      html: `
        <div style="font-family: sans-serif; padding: 20px; background: #0D0B0C; color: #F8F9FA; border-radius: 12px;">
          <h2 style="color: #FF334B;">🎁 New Birthday Request Received!</h2>
          <p style="font-size: 16px; line-height: 1.5; color: #E8E1E5;">
            <strong>Oluchi wrote:</strong>
          </p>
          <blockquote style="background: #1A1618; padding: 15px; border-left: 4px solid #D4AF37; margin: 10px 0; font-style: italic;">
            "${requestText}"
          </blockquote>
          <p style="font-size: 12px; color: #9E9398; margin-top: 20px;">
            Sent securely from the Level 19 Multiverse Portal.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Failed to send birthday request email:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}