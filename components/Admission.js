"use client";
import styles from './Admission.module.css';

export default function Admission() {
  const steps = [
    { num: '1', title: 'Kursga yozilish', desc: 'Maxsus anketa to\'ldiring. Kasbingiz, tajribangiz va motivatsiyangiz haqida batafsil ma\'lumot bering.' },
    { num: '2', title: 'Suhbatdan o\'ting', desc: 'Arizangiz ko\'rib chiqilgandan so\'ng, siz bilan qisqa suhbat o\'tkazamiz.' },
    { num: '3', title: 'To\'lovni amalga oshiring', desc: 'Qabul qilinganingiz haqida xabar olganingizdan so\'ng, to\'lovni amalga oshiring.' }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>QABUL JARAYONI</span>
          <h2 className={styles.title}>3 bosqichda <em>qabul</em></h2>
          <p className={styles.desc}>Biz hammani qabul qilmaymiz. Sizning motivatsiyangiz va potentsialingizni baholaymiz.</p>
        </div>

        <div className={styles.grid}>
          {steps.map((s, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.line}></div>
              <div className={styles.num}>{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
