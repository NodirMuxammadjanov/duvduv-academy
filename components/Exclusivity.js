"use client";
import { motion } from 'framer-motion';
import styles from './Exclusivity.module.css';

export default function Exclusivity() {
  const stats = [
    { num: '500+', label: 'ARIZA TOPSHIRILGAN' },
    { num: '60', label: 'QABUL QILINGANLAR' },
    { num: '12%', label: 'QABUL KO\'RSATKICHI' },
    { num: '15+', label: 'AGENTLIKKA ISHGA KIRGAN' }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>EKSKLYUZIVLIK</span>
          <h2 className={styles.title}>Nega hamma ham bizga <br/><em>qabul qilinmaydi?</em></h2>
          <p className={styles.desc}>
            Duv-Duv Gap — bu shunchaki kurs emas, bu kreativ hamjamiyat. Biz faqat soha rivoji uchun chin dildan harakat qiladiganlarni saralab olamiz.
          </p>
        </div>
        
        <div className={styles.grid}>
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              className={styles.card}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={styles.num}>{stat.num}</div>
              <div className={styles.label}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
