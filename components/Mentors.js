"use client";
import Image from 'next/image';
import styles from './Mentors.module.css';

export default function Mentors() {
  const awards = [
    { icon: '🥇', label: 'TAF! 2024 & 2025 - Yil Agentligi' },
    { icon: '🥈', label: 'Jolbors Festival - Kumush' },
    { icon: '🥉', label: 'Jolbors Festival - Bronza' }
  ];

  return (
    <section className={styles.section} id="mentors">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>AGENCY 605</span>
          <h2 className={styles.title}>Sizga <em>kim dars o'tadi?</em></h2>
          <p className={styles.desc}>
            Kursni 2021-yildan buyon ishlab kelayotgan, Jolbors festivalidan kumush va bronza, TAF! 2024 va 2025 da "Yil Agentligi" bo'lgan Agency 605 jamoasi o'qitadi.
          </p>
        </div>

        <div className={styles.awards}>
          {awards.map((a) => (
            <div key={a.label} className={styles.awardItem}>
              <span>{a.icon}</span> {a.label}
            </div>
          ))}
        </div>

        <article className={styles.mentorCard}>
          <Image
            src="/students/mentor-otabek.webp"
            alt="Kurs mentori Otabek Sharapov"
            className={styles.mentorImage}
            width={1340}
            height={2520}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 92vw"
          />
          <div className={styles.mentorBody}>
            <span className={styles.mentorLabel}>KURS MENTORI</span>
            <h3>Otabek Sharapov</h3>
            <p className={styles.mentorRole}>Asoschi va Kreativ Direktor, Agency 605</p>
            <p className={styles.mentorDesc}>
              Kursning asosiy darslarini Otabek Sharapov olib boradi. U strategiya va kreativni real bozor kampaniyalari orqali tushuntirib, g'oyani ishlaydigan yechimga aylantirish metodikasini amaliy formatda beradi.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
