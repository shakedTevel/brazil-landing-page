import ContactForm from '@/app/components/ContactForm'

export default function Home() {
  return (
    <div className="tevel-page flex min-h-screen flex-col font-sans">
      <main className="relative isolate overflow-hidden px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-4">
        <div className="pointer-events-none absolute inset-0 -z-10 tevel-mesh" />
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col rounded-[1.75rem] border border-white/40 bg-white/12 shadow-[0_24px_80px_rgba(4,25,34,0.18)] ring-1 ring-white/20 backdrop-blur-xl lg:min-h-[calc(100svh-5.5rem)]">
          <header className="flex flex-col gap-4 border-b border-white/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8 lg:py-4">
            <h1 className="text-2xl font-bold text-white">Tevel Aerobotics Technologies</h1>
          </header>

          <section className="grid flex-1 items-center gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:grid-cols-[0.98fr_1.02fr] lg:gap-8 lg:px-8 lg:py-6 xl:grid-cols-[1.02fr_0.98fr]">
            <div className="max-w-xl lg:max-w-none">
              <h1 className="mt-2 max-w-xl text-4xl font-semibold leading-[0.94] tracking-[-0.05em] text-white sm:text-5xl lg:max-w-lg lg:text-[clamp(3rem,4vw,4.4rem)]">
                Precision agriculture with a brighter, smarter edge.
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-6 text-white/82 sm:text-base sm:leading-7 lg:max-w-lg">
                Tevel&apos;s flying robots help growers harvest with consistency, speed, and AI-led
                precision. The page now opens with a cleaner, more premium look that keeps the
                brand front and center.
              </p>

              <div className="mt-5 grid max-w-xl grid-cols-1 gap-3 min-[480px]:grid-cols-3">
                <div className="rounded-2xl border border-white/24 bg-white/12 p-3.5 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white sm:text-3xl">24/7</p>
                  <p className="mt-1.5 text-xs leading-5 text-white/72 sm:text-sm">
                    Continuous harvesting support
                  </p>
                </div>
                <div className="rounded-2xl border border-white/24 bg-white/12 p-3.5 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white sm:text-3xl">AI</p>
                  <p className="mt-1.5 text-xs leading-5 text-white/72 sm:text-sm">
                    Real-time fruit detection and picking
                  </p>
                </div>
                <div className="rounded-2xl border border-white/24 bg-white/12 p-3.5 backdrop-blur-sm">
                  <p className="text-2xl font-semibold text-white sm:text-3xl">Global</p>
                  <p className="mt-1.5 text-xs leading-5 text-white/72 sm:text-sm">
                    Built for modern orchards worldwide
                  </p>
                </div>
              </div>
            </div>

            <div
              id="contact"
              className="rounded-[1.75rem] border border-white/55 bg-white px-4 py-5 shadow-[0_22px_60px_rgba(3,23,31,0.18)] sm:px-6 sm:py-6 lg:px-7 lg:py-6"
            >
              <div className="mb-5 sm:mb-6">
                <h2
                  className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:mt-3 sm:text-3xl"
                  style={{ color: 'var(--tevel-navy)' }}
                >
                  Bring Tevel&apos;s technology to your operation
                </h2>
                <p
                  className="mt-2 max-w-xl text-sm leading-6 sm:mt-3 sm:text-base sm:leading-7"
                  style={{ color: 'var(--tevel-text-muted)' }}
                >
                  Share a few details and our team will reach out within one business day.
                </p>
              </div>
              <ContactForm />
            </div>
          </section>
        </div>
      </main>

      <footer className="px-4 pb-5 pt-2 text-white/78 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
          <p className="text-sm">
            © {new Date().getFullYear()} Tevel Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
