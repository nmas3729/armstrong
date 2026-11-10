"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function OwnerMessage({
  title,
  paragraphs,
  signature,
}: {
  title: string;
  paragraphs: readonly string[];
  signature: readonly string[];
}) {
  const isEnhanced = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="owner-message-card">
      <h2 className="owner-message-title" id="owner-message-title">
        {title}
      </h2>
      <div
        className="owner-message-copy"
        id="owner-message-details"
      >
        {paragraphs.map((paragraph, index) => (
          <p key={paragraph} hidden={isEnhanced && !isExpanded && index > 0}>
            {paragraph}
          </p>
        ))}
        <div
          className="owner-message-signature"
          hidden={isEnhanced && !isExpanded}
        >
          {signature.map((line, index) => (
            <p
              className={index === 0 ? "owner-message-signature-name" : ""}
              key={line}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
      {isEnhanced && (
        <button
          className="owner-message-toggle"
          type="button"
          aria-expanded={isExpanded}
          aria-controls="owner-message-details"
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
