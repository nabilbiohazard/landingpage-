import PhotoSlideshow from "./PhotoSlideshow";
import BackgroundMusic from "./BackgroundMusic";
import Image from "next/image";
import SeatRequest from "./SeatRequest";

const galleryPhotos = [
  { src: "/next-section/first.jpg", alt: "ROŪ dinner in Tehran mood board", label: "THE EVENING" },
  { src: "/next-section/second.jpg", alt: "ROŪ live music card", label: "LIVE MUSIC" },
  { src: "/next-section/third.jpg", alt: "ROŪ dinner menu", label: "THE TABLE" },
];

export default function Home() {
  return (
    <main className="invitation">
      <BackgroundMusic />
      <div className="invitation-inner">
        <header className="masthead">
          <p className="eyebrow">TAKE&nbsp; a &nbsp;LOOK&nbsp; to</p>
          <h1>A GLIMPSE OF THE NIGHT</h1>
        </header>
        <div className="content-grid">
          <section className="agenda" aria-label="Dinner invitation">
            <article className="invitation-section dinner-section">
              <div className="dinner-details">
                <p className="section-number">01— ROŪ</p>
                <h2>DINNER IN TEHRAN</h2>
                <p className="dinner-offerings">Dinner · Wine · Live Music</p>
                <p className="dinner-location">Private Rooftop</p>
                <p className="dinner-date">THURSDAY · OCTOBER 16</p>
                <p className="dinner-time">8 PM — LATE</p>
              </div>
              <div className="dinner-action">
                <SeatRequest />
                <p className="dinner-signature">A gathering by Roosta Zendegi</p>
              </div>
            </article>
            <article className="invitation-section gathering-section">
              <p className="section-number">02 — THE GATHERING</p>
              <h2>A GATHERING AROUND ONE TABLE</h2>
              <p>An intimate evening in Tehran, built around food, wine, live music and a few people around one table.</p>
              <p>ROŪ brings together food, people, music and place — not as separate parts of a program, but as one shared experience.</p>
              <p>Come for dinner. Stay for the conversation, the music, and a longer night together.</p>
            </article>
          </section>
          <aside className="brand-panel" aria-label="Roū by Roosta Zendegi invitation">
            <div className="brand-name" aria-label="Roū, a gathering by Roosta Zendegi">
              <span className="brand-title">ROŪ</span>
              <span className="brand-byline">A GATHERING BY</span>
              <span className="brand-founder">ROOSTA ZENDEGI</span>
            </div>
            <PhotoSlideshow />
          </aside>
        </div>
        <section className="gallery-section" aria-labelledby="gallery-heading">
          <div className="gallery-heading">
            <p className="section-number">03 — A CLOSER LOOK</p>
            <h2 id="gallery-heading">THE EVENING IN DETAIL</h2>
          </div>
          <div className="gallery-grid">
            {galleryPhotos.map((photo, index) => (
              <figure className="gallery-item" key={photo.src}>
                <div className="gallery-image">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 700px) 90vw, (max-width: 1050px) 30vw, 390px"
                  />
                </div>
                <figcaption><span>0{index + 1}</span>{photo.label}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
