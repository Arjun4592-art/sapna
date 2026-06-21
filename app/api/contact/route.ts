import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase/config'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, program, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email and message are required' },
        { status: 400 },
      )
    }

    // Save to Firestore
    await addDoc(collection(db, 'contactMessages'), {
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || '',
      program: program || '',
      message: message.trim(),
      read: false,
      createdAt: serverTimestamp(),
    })

    // Notify Sapna
    await transporter.sendMail({
      from: `"Soul Awakening Academy" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `New inquiry from ${name}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:520px;
                    margin:0 auto;padding:32px 20px;">
          <div style="background:#1A1412;border-radius:12px;padding:20px 24px;
                      margin-bottom:24px;">
            <p style="color:#C2847A;font-size:11px;letter-spacing:0.2em;
                      text-transform:uppercase;margin:0 0 6px">
              Soul Awakening Academy
            </p>
            <h2 style="color:#FDFAF5;margin:0;font-size:18px;font-weight:400;">
              New contact inquiry
            </h2>
          </div>

          <table style="width:100%;border-collapse:collapse;">
            ${[
              ['Name', name],
              ['Email', email],
              ['Phone', phone || '—'],
              ['Program', program || 'Not specified'],
            ]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #EDD9D4;
                           font-size:12px;color:#9B8B85;width:100px;">
                  ${label}
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #EDD9D4;
                           font-size:13px;color:#1A1412;font-weight:500;">
                  ${value}
                </td>
              </tr>
            `,
              )
              .join('')}
          </table>

          <div style="background:#FFF8F5;border:1px solid #EDD9D4;
                      border-radius:10px;padding:16px;margin-top:20px;">
            <p style="font-size:11px;color:#9B8B85;text-transform:uppercase;
                      letter-spacing:0.15em;margin:0 0 8px">
              Message
            </p>
            <p style="font-size:14px;color:#3D2E2A;line-height:1.7;margin:0;">
              ${message}
            </p>
          </div>

          <p style="font-size:12px;color:#B8AE98;margin-top:20px;">
            Reply directly to this email to respond to ${name}.
          </p>
        </div>
      `,
      replyTo: email,
    })

    // Auto-reply to user
    await transporter.sendMail({
      from: `"Sapna Lamba" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for reaching out ✦',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:480px;
                    margin:0 auto;padding:40px 20px;">
          <div style="background:#1A1412;border-radius:12px;padding:24px;
                      text-align:center;margin-bottom:24px;">
            <p style="color:#C2847A;font-size:11px;letter-spacing:0.2em;
                      text-transform:uppercase;margin:0 0 8px">
              Soul Awakening Academy
            </p>
            <h1 style="color:#FDFAF5;font-size:20px;margin:0;
                       font-weight:400;font-style:italic;">
              Thank you, ${name} ✦
            </h1>
          </div>

          <div style="background:#FFF8F5;border:1px solid #EDD9D4;
                      border-radius:12px;padding:28px;">
            <p style="color:#7B6F69;font-size:14px;line-height:1.8;
                      margin:0 0 16px;">
              I have received your message and will get back to you
              within 24–48 hours.
            </p>
            <p style="color:#7B6F69;font-size:14px;line-height:1.8;margin:0;">
              In the meantime, know that reaching out is already a
              beautiful step toward your healing journey.
            </p>
          </div>

          <p style="text-align:center;font-size:13px;color:#B8AE98;
                    margin-top:24px;font-style:italic;">
            — Sapna Lamba, Soul Awakening Academy
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('contact error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
