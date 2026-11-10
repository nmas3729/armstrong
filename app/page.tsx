import Image from "next/image";
import CollectionPhotoCard from "@/components/CollectionPhotoCard";
import Navbar from "@/components/Navbar";
import ProductionPhotos from "@/components/ProductionPhotos";
import { siteContent } from "@/content/site";

export default function Home() {
  return (
    <div className="site-shell" id="top">
      <Navbar />
      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-inner">
            <div className="hero-art" aria-hidden="true">
              <span className="hero-art-ring hero-art-ring-outer" />
              <span className="hero-art-ring hero-art-ring-inner" />
              <span className="hero-art-cross hero-art-cross-horizontal" />
              <span className="hero-art-cross hero-art-cross-vertical" />
              <span className="hero-art-monogram">
                {siteContent.hero.monogram}
              </span>
              <span className="hero-art-point hero-art-point-top" />
              <span className="hero-art-point hero-art-point-bottom" />
              <span className="hero-art-orbit hero-art-orbit-one" />
              <span className="hero-art-orbit hero-art-orbit-two" />
            </div>
            <div className="hero-copy">
              <p className="hero-eyebrow">
                <span className="hero-eyebrow-line" aria-hidden="true" />
                {siteContent.hero.eyebrow}
              </p>
              <h1 className="hero-title" id="hero-title">
                <span className="hero-title-line hero-title-line-one">
                  {siteContent.hero.title}
                </span>
                <span className="hero-title-line hero-title-line-two">
                  {siteContent.hero.introduction}
                </span>
              </h1>
              <div className="hero-bottom">
                <div className="hero-links">
                  <a className="hero-link hero-link-primary" href="#collections">
                    <span>{siteContent.hero.collectionLink}</span>
                    <span className="hero-link-arrow" aria-hidden="true">
                      ↘
                    </span>
                  </a>
                  <a className="hero-link hero-link-secondary" href="#story">
                    {siteContent.hero.storyLink}
                  </a>
                </div>
                <span className="hero-edition">{siteContent.hero.edition}</span>
              </div>
            </div>
          </div>
          <span className="hero-coordinate hero-coordinate-left" aria-hidden="true">
            {siteContent.brandName}
          </span>
          <span className="hero-coordinate hero-coordinate-right" aria-hidden="true">
            {siteContent.tagline}
          </span>
        </section>

        <section
          className="tagline-marquee"
          aria-label={siteContent.tagline}
        >
          <div className="marquee-track" aria-hidden="true">
            {Array.from({ length: 4 }, (_, index) => (
              <span className="marquee-group" key={index}>
                <span>{siteContent.tagline}</span>
                <span className="marquee-separator">✳</span>
              </span>
            ))}
          </div>
        </section>

        <section
          className="content-section production-section"
          aria-labelledby="production-title"
        >
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">{siteContent.production.eyebrow}</p>
              <h2 className="section-title" id="production-title">
                {siteContent.production.title}
              </h2>
            </div>
            <p className="section-introduction">
              {siteContent.production.introduction}
            </p>
          </div>

          <div className="production-grid">
            <ProductionPhotos groups={siteContent.production.photoGroups} />

            <figure className="production-video-card">
              <figcaption className="production-video-copy">
                <p className="section-eyebrow">
                  {siteContent.production.printing.label}
                </p>
                <p className="production-video-description">
                  {siteContent.production.printing.description}
                </p>
              </figcaption>
              <video
                className="production-video"
                controls
                playsInline
                preload="metadata"
                aria-label={siteContent.production.printing.description}
              >
                <source
                  src={siteContent.production.printing.source}
                  type="video/mp4"
                />
              </video>
            </figure>
          </div>
        </section>

        <section
          className="content-section collection-section"
          id="collections"
          aria-labelledby="collection-title"
        >
          <div className="section-heading collection-heading">
            <div>
              <p className="section-eyebrow">{siteContent.collection.eyebrow}</p>
              <h2 className="section-title" id="collection-title">
                {siteContent.collection.title}
              </h2>
            </div>
            <p className="section-introduction">
              {siteContent.collection.introduction}
            </p>
          </div>

          <div className="category-grid">
            {siteContent.collection.categories.map((category) => {
              return (
                <CollectionPhotoCard
                  key={category.index}
                  photos={siteContent.collection[category.photos]}
                  title={category.title}
                  index={category.index}
                  preloadCover={category.photos === "footwearPhotos"}
                />
              );
            })}
          </div>
        </section>

        <section
          className="story-section"
          id="story"
          aria-labelledby="story-title"
        >
          <div className="story-inner">
            <p className="section-eyebrow">{siteContent.story.eyebrow}</p>
            <h2 className="story-title" id="story-title">
              {siteContent.story.title}
            </h2>
            <span className="story-signature">{siteContent.story.signature}</span>
          </div>
          <span className="story-mark" aria-hidden="true">
            {siteContent.story.watermark}
          </span>
        </section>

        <section
          className="content-section showcase-section"
          id="showcase"
          aria-labelledby="showcase-title"
        >
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">{siteContent.showcase.eyebrow}</p>
              <h2 className="section-title" id="showcase-title">
                {siteContent.showcase.title}
              </h2>
            </div>
            <p className="section-introduction">
              {siteContent.showcase.introduction}
            </p>
          </div>

          <div className="showcase-grid">
            {siteContent.showcase.images.map((image) => (
              <figure
                className={`showcase-item ${image.shape}`}
                key={image.image}
              >
                <div className="showcase-image-wrap">
                  <Image
                    className="showcase-image"
                    src={image.image}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    sizes="(max-width: 700px) 92vw, 50vw"
                  />
                </div>
                <figcaption className="showcase-caption">
                  <span>{image.caption}</span>
                  <span aria-hidden="true">↗</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className="content-section video-section"
          aria-labelledby="video-title"
        >
          <div className="section-heading">
            <div>
              <p className="section-eyebrow">{siteContent.videos.eyebrow}</p>
              <h2 className="section-title" id="video-title">
                {siteContent.videos.title}
              </h2>
            </div>
            <p className="section-introduction">
              {siteContent.videos.introduction}
            </p>
          </div>

          <div className="video-grid">
            {siteContent.videos.items.map((video) => (
              <figure className="video-card" key={video.source}>
                <video
                  className="video-player"
                  controls
                  playsInline
                  preload="metadata"
                  aria-label={video.label}
                >
                  <source src={video.source} type="video/mp4" />
                </video>
                <figcaption className="video-caption">{video.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact-inner">
            <div className="contact-copy">
              <p className="section-eyebrow">{siteContent.contact.eyebrow}</p>
              <h2 className="contact-title" id="contact-title">
                {siteContent.contact.title}
              </h2>
              <p className="contact-description">
                {siteContent.contact.description}
              </p>
            </div>
            <a
              className="contact-link"
              href={siteContent.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{siteContent.contact.linkLabel}</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="footer-brand" href="#top">
          {siteContent.brandName}
        </a>
        <p className="footer-note">{siteContent.footer.note}</p>
        <p className="footer-credit">
          Design &amp; hosted by{" "}
          <a href="https://sihleb.co.za" target="_blank" rel="noopener noreferrer">
            SihleB Digital Studio
          </a>
        </p>
        <a className="footer-top-link" href="#top">
          {siteContent.footer.backToTop}
          <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </div>
  );
}
