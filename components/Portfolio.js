"use client";

import { useState } from 'react';
import Image from 'next/image';
import styles from './Portfolio.module.css';

const portfolioItems = [
  {
    title: '"Onasini emsin"',
    brand: 'Ijtimoiy loyiha',
    period: 'Iyul, 2024',
    image: '/portfolio/onasini-emsin.webp',
    source: 'https://605agency.uz/page53844335.html',
    videoId: '7q2GfePSebc',
    summary:
      "Yosh onalar orasida emizish ko'rsatkichlari pasayishini keskin, ammo ijtimoiy foydali xabar bilan yoritib, offline va digital kanallar orqali katta muhokama yaratildi.",
  },
  {
    title: "Texnomart: To'y sales",
    brand: 'Texnomart',
    period: 'Avgust, 2024',
    image: '/portfolio/texnomart.webp',
    source: 'https://605agency.uz/page55427879.html',
    videoId: 'DXRJtmchgwg',
    summary:
      "Yoz mavsumidagi past oqimni oshirish uchun tug'ilgan kun aksiyasi to'y formatida qayta qadoqlandi: taklifnomalar, savdo nuqtasi tajribasi va mahalliy atributlar bitta g'oyaga birlashtirildi.",
  },
  {
    title: 'Juda foydali diplom',
    brand: "Najot Ta'lim",
    period: '9-oktabr, 2020',
    image: '/portfolio/foydali-diplom.webp',
    source: 'https://605agency.uz/foydali_diplom/uz',
    videoId: 'hMEHLo5QyD4',
    summary:
      "Abituriyentlar bosimini inobatga olib, diplomdan ko'ra bilim va tajriba muhim degan g'oya uch seriyali rolikda ochib berildi va auditoriyani real qarorga undovchi kreativ yechim yaratildi.",
  },
];

function VideoFacade({ videoId, title }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title={`${title} video`}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className={styles.videoButton}
      onClick={() => setIsPlaying(true)}
      aria-label={`${title} videosini ochish`}
    >
      <img src={thumbnail} alt={`${title} video poster`} loading="lazy" />
      <span className={styles.playIcon} aria-hidden="true">▶</span>
    </button>
  );
}

export default function Portfolio() {
  return (
    <section className={styles.section} id="portfolio">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>PORTFOLIO</span>
          <h2 className={styles.title}>Duv-duv <em>Portfolio</em></h2>
          <p className={styles.desc}>
            605 Agency case&apos;laridan tanlangan ishlar: qisqa tahlil, vizual va video.
          </p>
        </div>

        <div className={styles.grid}>
          {portfolioItems.map((item) => (
            <article key={item.title} className={styles.card}>
              <Image
                src={item.image}
                alt={item.title}
                className={styles.image}
                width={1680}
                height={945}
                loading="lazy"
                sizes="(max-width: 980px) 100vw, 52vw"
              />
              <div className={styles.body}>
                <div className={styles.meta}>
                  <span>{item.brand}</span>
                  <span>{item.period}</span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <div className={styles.videoWrap}>
                  <VideoFacade videoId={item.videoId} title={item.title} />
                </div>
                <a href={item.source} target="_blank" rel="noreferrer noopener" className={styles.link}>
                  Case sahifasi →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
