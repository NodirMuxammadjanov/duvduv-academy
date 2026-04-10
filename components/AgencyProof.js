"use client";
import styles from './AgencyProof.module.css';

export default function AgencyProof() {
  return (
    <section className={styles.section} id="agency">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.tag}>REAL AMALIYOT</span>
          <h2 className={styles.title}>Agency 605 bilan <br/>birga <em>o'samiz</em></h2>
          <p className={styles.desc}>
            Kurs davomida siz tayyor keyslar bilan emas, balki Agency 605 ning real mijozlari brifi ustida ishlaysiz. Eng yaxshi bitiruvchilar agentlikda doimiy ish bilan ta'minlanadi.
          </p>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.val}>15+</span>
              <span className={styles.label}>BITIRUVCHILAR ISHGA KIRGAN</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.val}>9 ta</span>
              <span className={styles.label}>HOZIRDA AGENTLIKDA ISHLAYDI</span>
            </div>
          </div>
        </div>
        
        <div className={styles.visual}>
          <img src="/work-1.png" alt="Agency 605 Creative Work" />
          <div className={styles.badge}>
            <span className={styles.badgeIcon}>🔥</span>
            <span>REAL MIJOZLAR BILAN ISHLASH</span>
          </div>
        </div>
      </div>
    </section>
  );
}
