'use client'

import { ChangeEvent, useActionState, useState } from 'react'
import { submitContact, ContactFormState } from '@/app/actions'

const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
  'Belgium', 'Bolivia', 'Brazil', 'Bulgaria', 'Canada', 'Chile', 'China',
  'Colombia', 'Croatia', 'Czech Republic', 'Denmark', 'Ecuador', 'Egypt',
  'Finland', 'France', 'Germany', 'Ghana', 'Greece', 'Guatemala', 'Hungary',
  'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Japan', 'Jordan', 'Kenya', 'South Korea', 'Kuwait', 'Lebanon', 'Malaysia',
  'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria', 'Norway',
  'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland',
  'Portugal', 'Qatar', 'Romania', 'Russia', 'Saudi Arabia', 'Serbia',
  'Singapore', 'South Africa', 'Spain', 'Sweden', 'Switzerland', 'Thailand',
  'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom',
  'United States', 'Uruguay', 'Venezuela', 'Vietnam',
]

const COUNTRY_DIAL_CODES: Record<string, string> = {
  Afghanistan: '+93',
  Albania: '+355',
  Algeria: '+213',
  Argentina: '+54',
  Australia: '+61',
  Austria: '+43',
  Belgium: '+32',
  Bolivia: '+591',
  Brazil: '+55',
  Bulgaria: '+359',
  Canada: '+1',
  Chile: '+56',
  China: '+86',
  Colombia: '+57',
  Croatia: '+385',
  'Czech Republic': '+420',
  Denmark: '+45',
  Ecuador: '+593',
  Egypt: '+20',
  Finland: '+358',
  France: '+33',
  Germany: '+49',
  Ghana: '+233',
  Greece: '+30',
  Guatemala: '+502',
  Hungary: '+36',
  India: '+91',
  Indonesia: '+62',
  Iran: '+98',
  Iraq: '+964',
  Ireland: '+353',
  Israel: '+972',
  Italy: '+39',
  Japan: '+81',
  Jordan: '+962',
  Kenya: '+254',
  'South Korea': '+82',
  Kuwait: '+965',
  Lebanon: '+961',
  Malaysia: '+60',
  Mexico: '+52',
  Morocco: '+212',
  Netherlands: '+31',
  'New Zealand': '+64',
  Nigeria: '+234',
  Norway: '+47',
  Pakistan: '+92',
  Panama: '+507',
  Paraguay: '+595',
  Peru: '+51',
  Philippines: '+63',
  Poland: '+48',
  Portugal: '+351',
  Qatar: '+974',
  Romania: '+40',
  Russia: '+7',
  'Saudi Arabia': '+966',
  Serbia: '+381',
  Singapore: '+65',
  'South Africa': '+27',
  Spain: '+34',
  Sweden: '+46',
  Switzerland: '+41',
  Thailand: '+66',
  Turkey: '+90',
  Ukraine: '+380',
  'United Arab Emirates': '+971',
  'United Kingdom': '+44',
  'United States': '+1',
  Uruguay: '+598',
  Venezuela: '+58',
  Vietnam: '+84',
}

const initialState: ContactFormState = { status: 'idle', message: '' }

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null
  return <p className="mt-2 text-xs font-medium text-rose-500">{messages[0]}</p>
}

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState)
  const [country, setCountry] = useState('')
  const [phone, setPhone] = useState('')
  const fieldClassName =
    'w-full rounded-[1.05rem] border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[var(--tevel-blue)] focus:bg-white focus:ring-4 focus:ring-sky-100'
  const labelClassName =
    'mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:text-xs'
  const selectedDialCode = country ? COUNTRY_DIAL_CODES[country] ?? '' : ''

  function handleCountryChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextCountry = event.target.value
    const nextDialCode = COUNTRY_DIAL_CODES[nextCountry] ?? ''
    const previousDialCode = country ? COUNTRY_DIAL_CODES[country] ?? '' : ''

    setCountry(nextCountry)
    setPhone((currentPhone) => {
      const trimmedPhone = currentPhone.trim()

      if (!nextDialCode) {
        return previousDialCode && trimmedPhone.startsWith(previousDialCode)
          ? trimmedPhone.slice(previousDialCode.length).trimStart()
          : currentPhone
      }

      if (!trimmedPhone) {
        return `${nextDialCode} `
      }

      if (previousDialCode && trimmedPhone.startsWith(previousDialCode)) {
        const remainder = trimmedPhone.slice(previousDialCode.length).trimStart()
        return remainder ? `${nextDialCode} ${remainder}` : `${nextDialCode} `
      }

      if (trimmedPhone.startsWith('+')) {
        return currentPhone
      }

      return `${nextDialCode} ${trimmedPhone}`
    })
  }

  if (state.status === 'success') {
    return (
      <div className="rounded-[1.5rem] border border-emerald-200 bg-emerald-50/80 p-6 text-center sm:p-8">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_rgba(16,185,129,0.10)]">
          <svg className="h-8 w-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald-700/80 sm:text-xs">
          Inquiry Received
        </p>
        <h3 className="mb-2 mt-2 text-2xl font-semibold tracking-[-0.03em] text-emerald-950">Message Sent!</h3>
        <p className="mx-auto max-w-md text-sm leading-6 text-emerald-900/75 sm:text-base">
          {state.message}
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === 'error' && !Object.keys(state.errors ?? {}).length && (
        <div className="rounded-[1.25rem] border border-rose-200 bg-rose-50/80 px-4 py-3.5 text-sm text-rose-700">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-rose-500">Unable To Send</p>
          <p className="mt-1 leading-6">{state.message}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-0.5">
          <label htmlFor="fullName" className={labelClassName}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="John Smith"
            className={fieldClassName}
          />
          <FieldError messages={state.errors?.fullName} />
        </div>

        <div className="space-y-0.5">
          <label htmlFor="email" className={labelClassName}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="john@company.com"
            className={fieldClassName}
          />
          <FieldError messages={state.errors?.email} />
        </div>

        <div className="space-y-0.5">
          <label htmlFor="country" className={labelClassName}>
            Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="country"
              name="country"
              value={country}
              onChange={handleCountryChange}
              className={`${fieldClassName} appearance-none pr-11`}
            >
              <option value="">Select your country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M5 7.5 10 12.5 15 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <FieldError messages={state.errors?.country} />
        </div>

        <div className="space-y-0.5">
          <label htmlFor="phone" className={labelClassName}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder={selectedDialCode ? `${selectedDialCode} 555 000 0000` : '+1 (555) 000-0000'}
            className={fieldClassName}
          />
          <FieldError messages={state.errors?.phone} />
        </div>
      </div>

      <div className="space-y-0.5">
        <label htmlFor="notes" className={labelClassName}>
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Tell us about your project or how we can help..."
          className={`${fieldClassName} min-h-28 resize-none`}
        />
        <FieldError messages={state.errors?.notes} />
      </div>

      <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50/70 p-3.5 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-slate-500 sm:max-w-[16rem]">
            We typically respond within one business day with the next steps.
          </p>
          <div className="flex items-center gap-3">
            <div className="hidden h-9 w-px bg-slate-200 sm:block" />
            <button
              type="submit"
              disabled={pending}
              className="inline-flex w-full items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--tevel-blue),var(--tevel-green))] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_14px_34px_rgba(6,147,227,0.24)] transition-all hover:translate-y-[-1px] hover:shadow-[0_18px_38px_rgba(6,147,227,0.30)] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[11rem]"
            >
              {pending ? 'Sending…' : 'Send Message'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
