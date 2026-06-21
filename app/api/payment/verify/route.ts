import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { FieldValue } from 'firebase-admin/firestore'
import { adminDb } from '@/lib/firebase-admin'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

const PROGRAM_NAMES: Record<string, string> = {
  '4-week': 'Soul Blueprint Intensive (4-Week)',
  '8-week': 'Soul Awakening: Empowered You (8-Week)',
}

const PROGRAM_AMOUNTS: Record<string, string> = {
  '4-week': '₹5,999',
  '8-week': '₹51,000',
}

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      programId,
      userEmail,
      userName,
    } = await req.json()

    // ── Validate required fields ──────────────────────────────────────────────
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !userId ||
      !programId
    ) {
      return NextResponse.json(
        { error: 'Missing required payment fields' },
        { status: 400 },
      )
    }

    // ── Verify Razorpay signature ─────────────────────────────────────────────
    const body = `${razorpay_order_id}|${razorpay_payment_id}`
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(body)
      .digest('hex')

    if (expected !== razorpay_signature) {
      return NextResponse.json(
        { error: 'Invalid payment signature' },
        { status: 400 },
      )
    }

    // ── Double-check not already enrolled ─────────────────────────────────────
    const existingEnroll = await adminDb
      .collection('enrollments')
      .where('userId', '==', userId)
      .where('programId', '==', programId)
      .get()

    if (!existingEnroll.empty) {
      return NextResponse.json(
        { error: 'Already enrolled in this program' },
        { status: 400 },
      )
    }

    // ── Batch write ───────────────────────────────────────────────────────────
    const batch = adminDb.batch()

    // Update payment record
    const paymentSnap = await adminDb
      .collection('payments')
      .where('orderId', '==', razorpay_order_id)
      .get()

    if (!paymentSnap.empty) {
      batch.update(paymentSnap.docs[0].ref, {
        status: 'paid',
        paymentId: razorpay_payment_id,
        paidAt: new Date(),
      })
    }

    // Create enrollment
    const enrollRef = adminDb.collection('enrollments').doc()
    batch.set(enrollRef, {
      userId,
      programId,
      startDate: new Date(),
      currentWeek: 1,
      progress: {},
      createdAt: new Date(),
    })

    // Update user's enrolledPrograms
    const userRef = adminDb.collection('users').doc(userId)
    batch.update(userRef, {
      enrolledPrograms: FieldValue.arrayUnion(programId),
      updatedAt: new Date(),
    })

    await batch.commit()

    // ── Send confirmation email to student ────────────────────────────────────
    await transporter.sendMail({
      from: `"Soul Awakening Academy" <${process.env.GMAIL_USER}>`,
      to: userEmail,
      subject: 'Payment confirmed — Welcome to Soul Awakening Academy ✦',
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:520px;
                    margin:0 auto;padding:40px 20px;">
          <div style="background:#1A1412;border-radius:16px;padding:28px;
                      text-align:center;margin-bottom:24px;">
            <p style="color:#C2847A;font-size:11px;letter-spacing:0.2em;
                      text-transform:uppercase;margin:0 0 8px">
              Soul Awakening Academy
            </p>
            <h1 style="color:#FDFAF5;font-size:22px;margin:0;
                       font-weight:400;font-style:italic;">
              Your journey begins ✦
            </h1>
          </div>

          <div style="background:#FFF8F5;border:1px solid #EDD9D4;
                      border-radius:12px;padding:28px;margin-bottom:20px;">
            <p style="color:#7B6F69;font-size:15px;margin:0 0 16px;">
              Dear ${userName},
            </p>
            <p style="color:#7B6F69;font-size:14px;line-height:1.8;
                      margin:0 0 20px;">
              Your payment has been confirmed and you are now enrolled in:
            </p>

            <div style="background:white;border:1px solid #EDD9D4;
                        border-radius:10px;padding:16px;margin-bottom:20px;">
              <p style="color:#C2847A;font-size:11px;letter-spacing:0.15em;
                        text-transform:uppercase;margin:0 0 6px">
                Program
              </p>
              <p style="color:#1A1412;font-size:16px;font-weight:600;
                        margin:0 0 4px;">
                ${PROGRAM_NAMES[programId]}
              </p>
              <p style="color:#9B8B85;font-size:13px;margin:0;">
                Amount paid: ${PROGRAM_AMOUNTS[programId]}
              </p>
            </div>

            <table style="width:100%">
              ${[
                ['Payment ID', razorpay_payment_id],
                ['Order ID', razorpay_order_id],
                ['Status', 'Confirmed ✓'],
              ]
                .map(
                  ([label, value]) => `
                <tr>
                  <td style="padding:8px 0;border-bottom:1px solid #EDD9D4;
                             font-size:12px;color:#9B8B85;width:120px;">
                    ${label}
                  </td>
                  <td style="padding:8px 0;border-bottom:1px solid #EDD9D4;
                             font-size:13px;color:#1A1412;font-weight:500;">
                    ${value}
                  </td>
                </tr>
              `,
                )
                .join('')}
            </table>
          </div>

          <div style="background:#1A1412;border-radius:12px;padding:20px;
                      text-align:center;">
            <p style="color:#B8AE98;font-size:13px;margin:0 0 14px;">
              Sapna will reach out to you within 24 hours to schedule
              your first session.
            </p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
               style="display:inline-block;background:#C2847A;color:white;
                      padding:12px 28px;border-radius:99px;font-size:13px;
                      font-weight:600;text-decoration:none;">
              Go to My Dashboard →
            </a>
          </div>

          <p style="text-align:center;font-size:12px;color:#B8AE98;
                    margin-top:24px;font-style:italic;">
            "Healing should feel supported, safe, and compassionate."
            <br/>— Sapna Lamba
          </p>
        </div>
      `,
    })

    // ── Notify Sapna ──────────────────────────────────────────────────────────
    await transporter.sendMail({
      from: `"Soul Awakening Academy" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `💰 New enrollment — ${userName} — ${PROGRAM_NAMES[programId]}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:480px;padding:32px;">
          <h2 style="color:#1A1412;">New enrollment received</h2>
          <table style="width:100%;margin-top:16px;">
            ${[
              ['Student', userName],
              ['Email', userEmail],
              ['Program', PROGRAM_NAMES[programId]],
              ['Amount', PROGRAM_AMOUNTS[programId]],
              ['Payment ID', razorpay_payment_id],
              ['Order ID', razorpay_order_id],
            ]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding:8px 0;border-bottom:1px solid #EDD9D4;
                           font-size:13px;color:#9B8B85;width:120px;">
                  ${label}
                </td>
                <td style="padding:8px 0;border-bottom:1px solid #EDD9D4;
                           font-size:14px;color:#1A1412;font-weight:600;">
                  ${value}
                </td>
              </tr>
            `,
              )
              .join('')}
          </table>
          <div style="margin-top:20px;padding:16px;background:#FFF8F5;
                      border-radius:10px;border:1px solid #EDD9D4;">
            <p style="font-size:12px;color:#9B8B85;margin:0 0 6px">
              Quick action
            </p>
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/students"
               style="font-size:13px;color:#C2847A;font-weight:600;">
              View in Admin Panel →
            </a>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('verify error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 },
    )
  }
}
