"use client";
import styles from './Pricing.module.css';
import { COURSE_PRICE_AMOUNT, COURSE_START, ONLINE_PRICE_AMOUNT } from '@/lib/coursePricing';

export default function Pricing() {
  const offlineFeatures = [
    '2 oy, haftada 2 marta darslar',
    '16 ta dars + 4 ta amaliyot',
    'Real mijoz bilan amaliyot',
    'Portfolio - real loyiha ishi',
    'Faqat oflayn - jonli ta\'lim',
    'Agency 605 jamoasi dars o\'tadi',
    'Sertifikat (himoyadan so\'ng)',
    'Agency 605 da amaliyot imkoni'
  ];

  const onlineFeatures = [
    '3 oy, haftada 1 marta jonli darslar',
    'Platformada darslik',
    'Real mijozlar bilan amaliyot',
    'Portfolio - real loyiha ishi',
    'Online + 1 oy amaliyot',
    'Agency 605 jamoasi dars o\'tadi',
    'Sertifikat (himoyadan so\'ng)',
    'Agency 605 da amaliyot imkoni'
  ];

  const plans = [
    { type: 'Oflayn', amount: COURSE_PRICE_AMOUNT, duration: '2 oylik to\'liq kurs', start: COURSE_START, features: offlineFeatures },
    { type: 'Online', amount: ONLINE_PRICE_AMOUNT, duration: '3 oylik to\'liq kurs', features: onlineFeatures },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>KURS NARXI</span>
          <h2 className={styles.title}>Kreativ karyerangizga <br/><em>investitsiya</em></h2>
        </div>

        <div className={styles.cards}>
          {plans.map((plan) => (
            <div className={styles.card} key={plan.type}>
              <span className={styles.cardType}>{plan.type}</span>
              <div className={styles.price}>
                <span className={styles.currency}>so&apos;m</span>{plan.amount}
              </div>
              <div className={styles.duration}>{plan.duration}</div>

              {plan.start && (
                <div className={styles.split}>
                  <span>{plan.start}</span>
                </div>
              )}

              <div className={styles.grid}>
                {plan.features.map((f, i) => (
                  <div key={i} className={styles.feature}>
                    <span className={styles.check}>+</span> {f}
                  </div>
                ))}
              </div>

              <a href="#contact" className={styles.btn}>
                Kursga yozilish <span>-&gt;</span>
              </a>
            </div>
          ))}
        </div>

        <p className={styles.footerNote}>O'rinlar cheklangan - faqat 30 kishi qabul qilinadi.</p>
      </div>
    </section>
  );
}
