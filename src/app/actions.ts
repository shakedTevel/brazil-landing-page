'use server'

import { sendContactEmail } from '@/lib/contact-mailer'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
  errors?: {
    fullName?: string[]
    email?: string[]
    country?: string[]
    phone?: string[]
    notes?: string[]
  }
}

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const fullName = (formData.get('fullName') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const country = (formData.get('country') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const notes = (formData.get('notes') as string)?.trim()
  const testCapturePath = (formData.get('__testCapturePath') as string)?.trim()

  const errors: ContactFormState['errors'] = {}

  if (!fullName) errors.fullName = ['Full name is required']
  if (!email) {
    errors.email = ['Email is required']
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ['Please enter a valid email address']
  }
  if (!country) errors.country = ['Please select your country']
  if (!phone) errors.phone = ['Phone number is required']

  if (Object.keys(errors).length > 0) {
    return { status: 'error', message: 'Please fix the errors below', errors }
  }

  try {
    await sendContactEmail({
      fullName,
      email,
      country,
      phone,
      notes,
      testCapturePath,
    })
  } catch (error) {
    console.error('Failed to send contact form email', error)

    return {
      status: 'error',
      message: 'We could not send your message right now. Please try again in a few minutes.',
    }
  }

  return {
    status: 'success',
    message: "Thank you! We'll be in touch shortly.",
  }
}
