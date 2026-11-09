"use client";

import { useEffect, useRef, useState } from "react";
import { siteContent } from "@/content/site";

export default function WhatsAppButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isObscured, setIsObscured] = useState(false);
  const href = `https://wa.me/${siteContent.whatsapp.phoneNumber}?text=${encodeURIComponent(siteContent.whatsapp.message)}`;

  useEffect(() => {
    const button = buttonRef.current;

    if (!button) {
      return;
    }

    let frame = 0;

    const updateVisibility = () => {
      const buttonRect = button.getBoundingClientRect();
      const overlapsControl = Array.from(
        document.querySelectorAll("a[href], button, video"),
      ).some((element) => {
        if (element === button) {
          return false;
        }

        const elementRect = element.getBoundingClientRect();
        return (
          buttonRect.left < elementRect.right &&
          buttonRect.right > elementRect.left &&
          buttonRect.top < elementRect.bottom &&
          buttonRect.bottom > elementRect.top
        );
      });

      setIsObscured(overlapsControl && document.activeElement !== button);
    };

    const scheduleVisibilityUpdate = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        updateVisibility();
      });
    };

    updateVisibility();
    window.addEventListener("scroll", scheduleVisibilityUpdate, {
      passive: true,
    });
    window.addEventListener("resize", scheduleVisibilityUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleVisibilityUpdate);
      window.removeEventListener("resize", scheduleVisibilityUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      className={`whatsapp-button${isObscured ? " is-obscured" : ""}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={siteContent.whatsapp.accessibleName}
      aria-hidden={isObscured}
      tabIndex={isObscured ? -1 : undefined}
    >
      <svg
        className="whatsapp-button-icon"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <path
          d="M16 3.5a12.45 12.45 0 0 0-10.7 18.8L3.7 28l5.9-1.5A12.5 12.5 0 1 0 16 3.5Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M10.2 7.8c-.5-.5-1.2-.4-1.6.1l-1.1 1.4c-.4.5-.5 1.1-.3 1.7 1.5 5 5.5 9 10.5 10.5.6.2 1.2.1 1.7-.3l1.4-1.1c.5-.4.6-1.1.1-1.6l-2.1-2.1c-.4-.4-1-.5-1.5-.2l-1.6.8a12.6 12.6 0 0 1-4-4l.8-1.6c.3-.5.2-1.1-.2-1.5l-2.1-2.1Z" />
      </svg>
      <span>{siteContent.whatsapp.label}</span>
    </a>
  );
}
