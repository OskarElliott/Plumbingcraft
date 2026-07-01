import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Where enquiries land. For the demo this is the business Gmail.
const TARGET_EMAIL = 'zigzag1896@gmail.com'

// DEMO sender. Resend's shared onboarding@resend.dev delivers without a verified domain.
// TODO (once plumbingcraft.pl is verified in Resend): switch to
//   'PlumbingCraft <kontakt@plumbingcraft.pl>'
const FROM = 'PlumbingCraft <onboarding@resend.dev>'

function validatePhone(value: string) {
  const stripped = value.replace(/[\s-]/g, '')
  return /^(\+48)?[0-9]{9}$/.test(stripped)
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, email, message } = body

    // Server-side validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Imię jest wymagane.' }, { status: 400 })
    }
    if (!phone || typeof phone !== 'string' || !validatePhone(phone)) {
      return NextResponse.json({ error: 'Podaj prawidłowy numer telefonu.' }, { status: 400 })
    }
    if (email && typeof email === 'string' && email.trim() && !validateEmail(email)) {
      return NextResponse.json({ error: 'Podaj prawidłowy adres e-mail.' }, { status: 400 })
    }

    const emailText = email && typeof email === 'string' ? email.trim() : ''
    const messageText = message && typeof message === 'string' ? message.trim() : ''

    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #0F1B2A; color: #F7F5F1; padding: 24px; border-radius: 8px 8px 0 0;">
          <h2 style="margin: 0; font-size: 20px;">Nowe zapytanie ze strony</h2>
          <p style="margin: 4px 0 0 0; color: #C0895F; font-size: 14px;">PlumbingCraft · plumbingcraft.pl</p>
        </div>
        <div style="background-color: #F7F5F1; padding: 24px; border: 1px solid #DED8CC; border-top: none; border-radius: 0 0 8px 8px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #DED8CC; font-weight: bold; color: #0F1B2A; width: 120px;">Imię:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #DED8CC; color: #0F1B2A;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #DED8CC; font-weight: bold; color: #0F1B2A;">Telefon:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #DED8CC;">
                <a href="tel:${escapeHtml(phone)}" style="color: #8A5C3D; font-weight: bold; font-size: 18px; text-decoration: none;">${escapeHtml(phone)}</a>
              </td>
            </tr>
            ${emailText ? `
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #DED8CC; font-weight: bold; color: #0F1B2A;">E-mail:</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #DED8CC; color: #0F1B2A;">
                <a href="mailto:${escapeHtml(emailText)}" style="color: #8A5C3D; text-decoration: none;">${escapeHtml(emailText)}</a>
              </td>
            </tr>` : ''}
            ${messageText ? `
            <tr>
              <td style="padding: 12px 0; font-weight: bold; color: #0F1B2A; vertical-align: top;">Wiadomość:</td>
              <td style="padding: 12px 0; color: #0F1B2A; white-space: pre-wrap;">${escapeHtml(messageText)}</td>
            </tr>` : ''}
          </table>
        </div>
      </div>
    `

    const text = `
NOWE ZAPYTANIE - PLUMBINGCRAFT

Imię: ${name}
Telefon: ${phone}${emailText ? `\nE-mail: ${emailText}` : ''}${messageText ? `\n\nWiadomość:\n${messageText}` : ''}
    `.trim()

    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [TARGET_EMAIL],
      replyTo: emailText || undefined,
      subject: `Nowe zapytanie ze strony: ${name}`,
      html,
      text,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Błąd wysyłki. Proszę spróbować ponownie.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Błąd serwera. Proszę spróbować ponownie.' }, { status: 500 })
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
