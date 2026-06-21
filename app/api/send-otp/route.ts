import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { generateOtp, saveOtp } from '@/lib/otp'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const otp = generateOtp()
    await saveOtp(email, otp)

    await transporter.sendMail({
      from: `"Soul Awakening Academy" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Your verification code',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#FDFAF5;font-family:'DM Sans',system-ui,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#FDFAF5;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="480" cellpadding="0" cellspacing="0"
                  style="background:#FFFFFF;border-radius:16px;border:1px solid #EDD9D4;overflow:hidden;">

                  <!-- Header -->
                  <tr>
                    <td style="background:#1A1412;padding:28px 40px;text-align:center;">
                      <p style="margin:0;color:#C2847A;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:600;">
                        Soul Awakening Academy
                      </p>
                      <h1 style="margin:8px 0 0;color:#FDFAF5;font-size:22px;font-weight:400;font-style:italic;font-family:Georgia,serif;">
                        Verify your identity
                      </h1>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      <p style="margin:0 0 8px;color:#7B6F69;font-size:15px;font-weight:300;">
                        Hi ${name || 'there'},
                      </p>
                      <p style="margin:0 0 32px;color:#7B6F69;font-size:15px;font-weight:300;line-height:1.6;">
                        Use the code below to complete your sign-in.
                        This code expires in <strong style="color:#1A1412;">10 minutes</strong>.
                      </p>

                      <!-- OTP Box -->
                      <div style="background:#FFF8F5;border:1px solid #EDD9D4;border-radius:12px;
                                  padding:28px;text-align:center;margin-bottom:32px;">
                        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.2em;
                                  text-transform:uppercase;color:#9B8B85;font-weight:600;">
                          Your verification code
                        </p>
                        <p style="margin:0;font-size:42px;font-weight:700;letter-spacing:0.18em;
                                  color:#1A1412;font-family:Georgia,serif;">
                          ${otp}
                        </p>
                      </div>

                      <p style="margin:0;font-size:13px;color:#B8AE98;line-height:1.6;">
                        If you didn't request this, you can safely ignore this email.
                        Never share this code with anyone.
                      </p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="padding:20px 40px;border-top:1px solid #EDD9D4;text-align:center;">
                      <p style="margin:0;font-size:12px;color:#B8AE98;">
                        © ${new Date().getFullYear()} Soul Awakening Academy · Sapna Lamba
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('send-otp error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
