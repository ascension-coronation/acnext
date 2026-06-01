"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import posthog from "posthog-js";
import { toast, Toaster } from "sonner";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

import { Button } from "@/components/ui/button";
import { SpinnerCustom } from "@/components/ui/spinner";

import "./landing.css";

import "./landing.desktop.css";
import "./landing.mobile.css";

const howThisWorksItems = [
  {
    id: 1,
    title: "sign up",
    caption:
      "Sign up with email, and also sign up for Hack Club Slack to join our awesome community.",
    src: "/illustrations/squid_signup.png",
  },
  {
    id: 2,
    title: "design/draw!",
    caption:
      "Think of your project... try illustration? 3D modeling? wireframes? Learn to make some cool art for your project!",
    src: "/illustrations/squid_draw.png",
  },
  {
    id: 3,
    title: "code it up",
    caption: "Turn your ideas into code! Use whatever frameworks, languages, and tools you want.",
    src: "/illustrations/squid_code.png",
  },
  {
    id: 4,
    title: "track your time",
    caption:
      "You need to track time to get prizes. Coding? Setup Hackatime! Drawing? Use Lapse.",
    src: "/illustrations/squid_time.png",
  },
  {
    id: 5,
    title: "publish your project!",
    caption:
      "Let anyone on the internet see your beautiful creation... (with Vercel, GitHub Pages, itch.io, etc!)",
    src: "/illustrations/squid_publish.png",
  },
  {
    id: 6,
    title: "SUBMIT (for prizes!)",
    caption: "Yay yay yay get a wonderful prize for your efforts",
    src: "/illustrations/squid_submit.png",
  },
];

const faqItems1 = [
  {
    question: "What is Ascension?",
    answer:
      "Ascension is a program promoting creators to make art for their coding projects! Learn to draw, make creative projects, and get coins that you can spend in the shop for prizes.",
  },
  {
    question: "Am I eligible to participate?",
    answer:
      "Anyone aged 13-18 can participate! You will need to verify your identity before being able to purchase items in the shop.",
  },
  {
    question: "Is this legit?",
    answer: "Yes! Ascension is a Hack Club program. Hack Club is NOT actually about hacking, It's a 501(c)(3) nonprofit that's organized many events for teenagers around the world, whether that be a gaming pop-up cafe in China, a hackathon on an island, or a scavenger hunt around New York. We're backed by tech companies like GitHub, AMD, and more; you can learn more on hackclub.com.",
  },
  {
    question: "How much does it cost?",
    answer: "Participating in Ascension is completely free!",
  },
  {
    question: "How do I earn coins?",
    answer:
      "Submit your projects and wait for them to be reviewed by someone on our team. Once your project is approved, you'll be rewarded coins based on the amount of hours you spent on it.",
  },
];

const faqItems2 = [
  {
    question: "What do I use to make my projects?",
    answer: "You can use whatever coding and art programs you want. If you don't know where to start, check out our Quickstart Guide and tutorials!",
  },
  {
    question: "Can I use AI?",
    answer: "AI is not allowed at all for art. If you use AI to create the art (music, character sprites, website backgrounds, game dialogue, etc.) for your project, your project will be rejected. If you're using AI to help you debug, speed up your workflow, or learn something about coding, make sure you can understand the AI code. When you're done your project, you will be required to write about if/how you used AI.",
  },
  {
    question: "What if I don't know how to draw... or code... or build projects? Can I still participate??",
    answer: "Ascension is for creators of all skill levels! We're working on tutorials to follow if it's your first time, and you can always ask for help in #ascension-help or DM our team. No worries if you're never done this before!",
  },
  {
    question: "Who is running this?",
    answer: "A group of ~6 teenagers from around the world! :)",
  },
  {
    question: "How do I sign up?",
    answer: "Enter your email at the top of the page!!",
  },
];

function HowThisWorksItem({
  id,
  title,
  caption,
  src,
}: {
  id: string;
  title: string;
  caption: string;
  src: string;
}) {
  return (
    <div
      className={`how-this-works-item how-this-works-item-noise ${
        [
          "htw-blue",
          "htw-purple",
          "htw-yellow",
          "htw-blue",
          "htw-yellow",
          "htw-blue",
          "htw-purple",
        ][Number(id)]
      }`}
    >
      <h3 className="how-this-works-title">
        {id}. {title}
      </h3>
      <img src={src} alt="" className="how-this-works-image" />
      <p className="how-this-works-caption">{caption}</p>
    </div>
  );
}

function AccordionItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
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
  );
}

export default function Landing() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setProcessing(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string | null;

    posthog.capture("rsvp_form_submitted", { email });
    if (email) posthog.identify(email, { email });

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        const messages = Object.values(data.errors ?? {})
          .flat()
          .filter(Boolean) as string[];

        if (messages.length === 0) {
          toast.error("Something went wrong. Please try again.");
        } else {
          for (const message of new Set(messages)) {
            toast.error(message);
          }
        }
        setError(messages[0] ?? null);
      } else {
        toast.success("You're on the list!");
        (e.target as HTMLFormElement).reset();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setProcessing(false);
    }
  }

  return (
    <>
      <Toaster />
      <main className="landing-page pb-50 h-screen scroll-smooth">
        {/* background image parallax */}
        <div className="relative w-screen h-screen overflow-hidden">
          <ParallaxProvider>
            <Parallax speed={-20} className="absolute inset-0">
              <img
                src="/illustrations/sky_bg/backdrop.avif"
                className="w-screen h-screen"
                alt=""
              />
            </Parallax>
            <Parallax speed={-10} className="absolute inset-0">
              <img
                src="/illustrations/sky_bg/cloud2.avif"
                className="absolute bottom-0 w-full h-full object-cover"
                alt=""
              />
              <img
                src="/illustrations/sky_bg/cloud5.avif"
                className="absolute bottom-0 w-full h-full object-cover"
                alt=""
              />
            </Parallax>
            <Parallax speed={-7} className="absolute inset-0">
              <img
                src="/illustrations/sky_bg/island2.avif"
                className="absolute bottom-0 w-full h-full object-cover"
                alt=""
              />
            </Parallax>
            <Parallax speed={10} className="absolute inset-0">
              <img
                src="/illustrations/sky_bg/cloud3.avif"
                className="absolute bottom-0 w-full h-full object-cover"
                alt=""
              />
              <img
                src="/illustrations/sky_bg/cloud4.avif"
                className="w-screen h-screen"
                alt=""
              />
            </Parallax>
            <Parallax speed={5} className="absolute inset-0">
              <img
                src="/illustrations/sky_bg/island1.avif"
                className="absolute bottom-0 w-full h-full object-cover"
                alt=""
              />
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

      <section className="how-this-works-wrapper">
        <h2 className="section-title">How does this work?</h2>
        <div className="how-this-works">
          {howThisWorksItems.map((item) => (
            <HowThisWorksItem
              key={item.id}
              id={String(item.id)}
              title={item.title}
              caption={item.caption}
              src={item.src}
            />
          ))}
        </div>
      </section>

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
          Still confused? Ask in the{" "}
          <a
            href="https://hackclub.enterprise.slack.com/archives/C0ADX7R2MHB"
            className="channel-link"
          >
            #ascension
          </a>{" "}
          channel on Slack and we&apos;ll help you out, or contact someone on
          the{" "}
          <a href="/team" className="underline hover:decoration-wavy">
            team!
          </a>
        </p>
      </section>

      <Footer />
    </>
  );
}

export function Footer() {
  return (
    <footer className="landing-footer">
      <div className="landing-footer__content">
        <div className="flex flex-row gap-2 items-center">
          <img
            src="/illustrations/squid_blue.svg"
            alt=""
            width="35"
            className="landing-footer__squid"
          />
          <div className="landing-footer__title">ASCENSION</div>
        </div>
        <div className="landing-footer__subtitle">
          Made with ❤︎ for teenagers, by{" "}
          <a href="/team" className="underline hover:decoration-wavy">
            teenagers
          </a>
          <br />{" "}
          <p className="text-[var(--color-purple-dark)]">
            <a
              href="https://hackclub.com"
              target="_blank"
              className="underline hover:decoration-wavy"
            >
              Hack Club
            </a>{" "}
            is a 501(c)(3) nonprofit and network of 60k+ technical
            highschoolers.{" "}
            <a href="#" className="underline hover:decoration-wavy ">
              Join today!
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
