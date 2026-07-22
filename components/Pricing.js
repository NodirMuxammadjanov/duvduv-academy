"use client";
import styles from './Pricing.module.css';
import { COURSE_PRICE_AMOUNT, COURSE_SPLIT_PRICE } from '@/lib/coursePricing';

export default function Pricing() {
  const features = [
    '3 oy, haftada 1 marta jonli darslar',
    'Platformada darslik',
    'Real mijozlar bilan amaliyot',
    'Portfolio - real loyiha ishi',
    'Online + 1 oy amaliyot',
    'Agency 605 jamoasi dars o\'tadi',
    'Sertifikat (himoyadan so\'ng)',
    'Agency 605 da amaliyot imkoni'
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>KURS NARXI</span>
          <h2 className={styles.title}>Kreativ karyerangizga <br/><em>investitsiya</em></h2>
        </div>

        <div className={styles.card}>
          <div className={styles.price}>
            <span className={styles.currency}>so&apos;m</span>{COURSE_PRICE_AMOUNT}
          </div>
          <div className={styles.duration}>3 oylik to'liq kurs</div>

          <div className={styles.split}>
            Yoki <span>{`3 x ${COURSE_SPLIT_PRICE}`}</span> bo'lib to'lash mumkin
          </div>

          <div className={styles.grid}>
            {features.map((f, i) => (
              <div key={i} className={styles.feature}>
                <span className={styles.check}>+</span> {f}
              </div>
            ))}
          </div>

          <a href="#contact" className={styles.btn}>
            Kursga yozilish <span>-&gt;</span>
          </a>

          <p className={styles.footerNote}>O'rinlar cheklangan - faqat 30 kishi qabul qilinadi.</p>
        </div>
      </div>
    </section>
  );
}
