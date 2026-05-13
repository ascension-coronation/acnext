"use client"

import { FormEvent, useState } from "react"
import Image from "next/image"
import posthog from "posthog-js"
import { toast, Toaster } from "sonner"
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

import { Button } from "@/components/ui/button"
import { SpinnerCustom } from "@/components/ui/spinner"

// @ts-ignore
import "./landing.css"
// @ts-ignore
import "./landing.desktop.css"
import "./landing.mobile.css"

const faqItems1 = [
  {
    question: "Will there be any guides or workshops?",
    answer:
      "Yep! Guides for ________ can be found on this site, and stay tuned for some workshops in the slack!",
  },
  {
    question: "Do I have to use a specific library/language?",
    answer:
      "Nope! You can use any framework and any libraries that you'd like.",
  },
  {
    question: "Can you add x to the shop?",
    answer: "Ask in #ascension in slack!",
  },
]

const faqItems2 = [
  {
    question: "Can I double dip?",
    answer: "Nope, sorry :p",
  },
  {
    question: 'idk',
    answer:
      "sfdakl;auioahdsouiphdsfagpiofdgoiadfvp[oksosdfgokfdgs].",
  },
  {
    question: "Does my project have to be open source?",
    answer: "Yep! It needs to be open source & easily usable by anybody.",
  },
]

function AccordionItem({
  question,
  answer,
}: {
  question: string
  answer: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="faq-item">
      <button
        type="button"
        className="faq-trigger"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{question}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`faq-chevron ${open ? "faq-chevron--open" : ""}`}
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path
            fill="currentColor"
            d="M8.99999 13.5C8.80799 13.5 8.61599 13.4271 8.46999 13.2801L2.21999 7.03005C1.92699 6.73705 1.92699 6.26202 2.21999 5.96902C2.51299 5.67602 2.98799 5.67602 3.28099 5.96902L9.00099 11.689L14.721 5.96902C15.014 5.67602 15.489 5.67602 15.782 5.96902C16.075 6.26202 16.075 6.73705 15.782 7.03005L9.53199 13.2801C9.38599 13.4261 9.19399 13.5 9.00199 13.5H8.99999Z"
          />
        </svg>
      </button>
      <div className={`faq-content ${open ? "faq-content--open" : ""}`}>
        <p className="faq-answer">{answer}</p>
      </div>
    </div>
  )
}

export default function Landing() {
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setProcessing(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string | null

    posthog.capture("rsvp_form_submitted", { email })
    if (email) posthog.identify(email, { email })

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!res.ok) {
        const data = await res.json()
        const messages = Object.values(data.errors ?? {})
          .flat()
          .filter(Boolean) as string[]

        if (messages.length === 0) {
          toast.error("Something went wrong. Please try again.")
        } else {
          for (const message of new Set(messages)) {
            toast.error(message)
          }
        }
        setError(messages[0] ?? null)
      } else {
        toast.success("You're on the list!")
          ; (e.target as HTMLFormElement).reset()
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <>
      <Toaster />
      <main className="landing-page pb-50 h-screen">
      {/* background image parallax */}
        <div className="relative w-screen h-screen overflow-hidden">
          <ParallaxProvider>
            <Parallax speed={-20} className="absolute inset-0">
              <img src="/illustrations/sky_bg/backdrop.avif" className="w-screen h-screen" alt="" />
            </Parallax>
            <Parallax speed={-10} className="absolute inset-0">
              <img src="/illustrations/sky_bg/cloud2.avif" className="absolute bottom-0 w-full h-full object-cover" alt="" />
              <img src="/illustrations/sky_bg/cloud5.avif" className="absolute bottom-0 w-full h-full object-cover" alt="" /> 
            </Parallax>
            <Parallax speed={-7} className="absolute inset-0">
              <img src="/illustrations/sky_bg/island2.avif" className="absolute bottom-0 w-full h-full object-cover" alt="" />
            </Parallax>
            <Parallax speed={10} className="absolute inset-0">
              <img src="/illustrations/sky_bg/cloud3.avif" className="absolute bottom-0 w-full h-full object-cover" alt="" />
              <img src="/illustrations/sky_bg/cloud4.avif" className="w-screen h-screen" alt=""/>
            </Parallax>
            <Parallax speed={5} className="absolute inset-0">
              <img src="/illustrations/sky_bg/island1.avif" className="absolute bottom-0 w-full h-full object-cover" alt="" />
            </Parallax>
          </ParallaxProvider>
        </div>      
        <div className="flex flex-col">
          <Image
            className="landing-page__logo"
            src="/illustrations/ascensionHeroSVG.svg"
            alt="Ascension"
            width={1048}
            height={313}
          />
          <h1 className="landing-page__headline">
            <span className="landing-page__headline-part">
              make projects <span aria-hidden="true">✦</span>{" "}
            </span>
            <span className="landing-page__headline-part-italic">
              get prizes.
            </span>
          </h1>
          <form onSubmit={handleSubmit}>
            <div
              className="cta-email"
              role="group"
              aria-label="Email call to action"
            >
              <div className="cta-email__field-wrap">
                <input
                  className="cta-email__input"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  aria-label="Email"
                  required
                />
                <div className="cta-email__noise" aria-hidden="true" />
              </div>
              <Image
                className="cta-email__ornament cta-email__ornament--left"
                src="/illustrations/heroInput-scrollTexture.svg"
                alt=""
                aria-hidden
                width={86}
                height={40}
              />
              <Image
                className="cta-email__ornament cta-email__ornament--right"
                src="/illustrations/heroInput-scrollTexture.svg"
                alt=""
                aria-hidden
                width={86}
                height={40}
              />
            </div>
            {error ? (
              <p className="mt-2 text-center text-sm text-white">{error}</p>
            ) : null}
            <div className="cta-button-anchor">
              <Button
                className="cta-button"
                variant="cta"
                type="submit"
                disabled={processing}
              >
                {processing ? <SpinnerCustom /> : "RSVP →"}
              </Button>
            </div>
          </form>
          <div className="landing-page__color-overlay" aria-hidden="true" />
          <div className="landing-page__noise-overlay" aria-hidden="true" />
        </div>
      </main>

      <section className="faq-wrapper">

        <h2 className="section-title italic">FAQ</h2>
        <div className="faq-columns">
          <div className="faq-column">
            {faqItems1.map((item) => (
              <AccordionItem key={item.question} {...item} />
            ))}
          </div>
          <div className="faq-column">
            {faqItems2.map((item) => (
              <AccordionItem key={item.question} {...item} />
            ))}
          </div>
        </div>
        <p className="faq-help-text">
          Still confused? Ask in the #ascension channel on slack and we can help you out!
        </p>
      </section>

      <footer className="landing-footer">
        <div>
          <div className="landing-footer__title">ASCENSION</div>
          <div className="landing-footer__subtitle">Made with ❤️ by hackclubbers like you</div>
        </div>
      </footer>
    </>
  )
}
