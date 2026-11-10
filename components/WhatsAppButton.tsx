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
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.198.297-.767.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.372-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.064 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.693.626.711.226 1.358.194 1.87.118.57-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.999-3.648-.235-.374a9.86 9.86 0 0 1-1.511-5.26c.002-5.45 4.437-9.884 9.893-9.884 2.64.001 5.12 1.03 6.985 2.897a9.82 9.82 0 0 1 2.892 6.989c-.002 5.45-4.437 9.884-9.886 9.884m8.41-18.294A11.815 11.815 0 0 0 12.047 0C5.495 0 .16 5.335.157 11.893c0 2.096.547 4.142 1.588 5.946L0 24l6.335-1.662a11.933 11.933 0 0 0 5.707 1.453h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.479-8.407"
        />
      </svg>
    </a>
  );
}
