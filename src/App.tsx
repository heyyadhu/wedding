import { useEffect } from "react";
import Intro from "./Intro";

const asset = (name: string) => `/assets/${name}`;

function addToCalendar() {
  const event = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    "UID:anoop-ambika-wedding-20261206",
    "DTSTAMP:20250101T000000Z",
    "DTSTART:20261206T060000Z",
    "SUMMARY:Anoop & Ambika’s Wedding",
    "LOCATION:Sree Thirumandhamkunnu Bhagavathi Temple, Angadippuram",
    "DESCRIPTION:Together with their families, Anoop and Ambika request the pleasure of your company.",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([event], { type: "text/calendar" }));
  link.download = "anoop-and-ambika-wedding.ics";
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(link.href), 100);
}

export default function App() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const parallaxElements = document.querySelectorAll<HTMLElement>("[data-parallax]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    let animationFrame = 0;
    const updateParallax = () => {
      const viewportHeight = window.innerHeight;

      parallaxElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distanceFromCenter = (elementCenter - viewportHeight / 2) / viewportHeight;
        const clampedDistance = Math.max(-1, Math.min(1, distanceFromCenter));
        const depth = Number(element.dataset.parallax) || 14;
        element.style.setProperty("--parallax-offset", `${clampedDistance * depth}px`);
      });
      animationFrame = 0;
    };

    const handleScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const scrollToInvitation = () => {
    const element = document.getElementById("invitation");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Intro onComplete={scrollToInvitation} />
      <main id="invitation" className="invitation" aria-label="Wedding invitation for Anoop and Ambika">
      <div className="paper-texture" aria-hidden="true" />

      <div className="flourish-wrap flourish-top" data-parallax="18" aria-hidden="true">
        <img className="flourish" src={asset("80695.png")} alt="" />
      </div>
      <div className="flourish-wrap flourish-right" data-parallax="28" aria-hidden="true">
        <img className="flourish" src={asset("80695.png")} alt="" />
      </div>

      <section className="intro" data-reveal data-parallax="8">
        <p className="warmly">You’re Warmly</p>
        <h1>Invited</h1>
      </section>

      <div className="gold-rule rule-one" aria-hidden="true">
        <img src={asset("b7fc9-trim.svg")} alt="" />
      </div>

      <p className="families" data-reveal>
        Together with thier
        <br />
        families
      </p>

      <section className="couple" data-reveal data-parallax="7">
        <span className="initial initial-one">A</span>
        <p className="name name-one">
          noop
          <br />
          Sreedhar
        </p>
        <div className="ampersand">&amp;</div>
        <span className="initial initial-two">A</span>
        <p className="name name-two">mbika</p>
      </section>

      <img className="sun" src={asset("9aaf7.png")} data-parallax="20" alt="" />

      <p className="request" data-reveal>
        request the pleasure of your
        <br />
        company to celebrate thier
      </p>

      <p className="wedding-script" data-reveal data-parallax="8">
        Wedding
      </p>

      <button
        className="date-card"
        type="button"
        onClick={addToCalendar}
        data-reveal
        data-parallax="10"
      >
        <img className="save-date-art" src={asset("e0a35.png")} alt="" />
        <span className="date-copy">
          <span>Sunday</span>
          <span>
            December <b>6</b>
          </span>
          <span>2026</span>
          <small>At 11:30 am onwards</small>
        </span>
        <span className="date-action">Tap to save the date</span>
      </button>

      <div className="date-line" aria-hidden="true">
        <img src={asset("3bc4a.svg")} alt="" />
      </div>

      <div className="flourish-wrap flourish-middle" data-parallax="26" aria-hidden="true">
        <img className="flourish" src={asset("80695.png")} alt="" />
      </div>

      <section className="venue" data-reveal data-parallax="8">
        <h2>Venue</h2>
        <p>Sree Thirumandhamkunnu Bhagavathi Temple Angadippuram,</p>
        <a
          className="location-button"
          href="https://www.google.com/maps/search/?api=1&query=Sree+Thirumandhamkunnu+Bhagavathi+Temple+Angadippuram"
          target="_blank"
          rel="noreferrer"
        >
          <span>location</span>
          <img src={asset("c7944.svg")} alt="" />
        </a>
        <p className="blessing">
          your presence and blessings will make our celebration truly special.
        </p>
        <p className="regards">
          With love &amp;
          <br />
          warm regards
        </p>
      </section>

      <div className="gold-rule rule-two" aria-hidden="true">
        <img src={asset("b7fc9.svg")} alt="" />
      </div>

      <div className="flourish-wrap flourish-bottom" data-parallax="24" aria-hidden="true">
        <img className="flourish" src={asset("80695.png")} alt="" />
      </div>
      <img className="pillar" src={asset("80763.png")} data-parallax="16" alt="" />
    </main>
    </>
  );
}
