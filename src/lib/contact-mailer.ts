import nodemailer from 'nodemailer'

export type ContactSubmission = {
  fullName: string
  email: string
  country: string
  phone: string
  notes?: string
}

type SmtpConfig = {
  host: string
  port: number
  secure: boolean
  from: string
  to: string
}

function getRequiredEnv(name: string) {
  const value = process.env[name]?.trim()
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }

  return value
}

function getSmtpConfig(): SmtpConfig {
  const host = getRequiredEnv('SMTP_HOST')
  const portRaw = getRequiredEnv('SMTP_PORT')
  const from = getRequiredEnv('SMTP_FROM')
  const to = getRequiredEnv('CONTACT_FORM_TO')
  const secure = process.env.SMTP_SECURE?.trim() === 'true'
  const port = Number(portRaw)

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error('SMTP_PORT must be a valid positive integer')
  }

  return {
    host,
    port,
    secure,
    from,
    to,
  }
}

function createTransport(config: SmtpConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
  })
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function formatNotes(notes?: string) {
  if (!notes) {
    return 'No additional notes provided.'
  }

  return notes
}

function buildTextBody(submission: ContactSubmission) {
  return [
    'New Tevel contact form submission',
    '',
    `Full name: ${submission.fullName}`,
    `Email: ${submission.email}`,
    `Country: ${submission.country}`,
    `Phone: ${submission.phone}`,
    '',
    'Notes:',
    formatNotes(submission.notes),
  ].join('\n')
}

function buildHtmlBody(submission: ContactSubmission) {
  return `
    <div style="font-family:Arial,Helvetica,sans-serif;background:#f5f8fb;padding:24px;color:#102033">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5edf5;border-radius:20px;overflow:hidden">
        <div style="padding:20px 24px;background:linear-gradient(135deg,#0693e3 0%,#00d084 100%);color:#ffffff">
          <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;opacity:0.88">Contact Form</p>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.1">New Tevel inquiry</h1>
        </div>
        <div style="padding:24px">
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e9eef5;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b">Full name</td>
              <td style="padding:12px 0;border-bottom:1px solid #e9eef5;font-size:15px;color:#0f172a">${escapeHtml(submission.fullName)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e9eef5;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b">Email</td>
              <td style="padding:12px 0;border-bottom:1px solid #e9eef5;font-size:15px;color:#0f172a">${escapeHtml(submission.email)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e9eef5;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b">Country</td>
              <td style="padding:12px 0;border-bottom:1px solid #e9eef5;font-size:15px;color:#0f172a">${escapeHtml(submission.country)}</td>
            </tr>
            <tr>
              <td style="padding:12px 0;border-bottom:1px solid #e9eef5;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b">Phone</td>
              <td style="padding:12px 0;border-bottom:1px solid #e9eef5;font-size:15px;color:#0f172a">${escapeHtml(submission.phone)}</td>
            </tr>
          </table>
          <div style="margin-top:20px">
            <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#64748b">Notes</p>
            <div style="border-radius:16px;background:#f8fafc;border:1px solid #e9eef5;padding:16px;font-size:15px;line-height:1.6;color:#0f172a;white-space:pre-wrap">${escapeHtml(formatNotes(submission.notes))}</div>
          </div>
        </div>
      </div>
    </div>
  `.trim()
}

export async function sendContactEmail(submission: ContactSubmission) {
  const config = getSmtpConfig()
  const transport = createTransport(config)
  const subject = `New Tevel contact inquiry from ${submission.fullName}`

  await transport.sendMail({
    from: config.from,
    to: config.to,
    replyTo: submission.email,
    subject,
    text: buildTextBody(submission),
    html: buildHtmlBody(submission),
  })
}
