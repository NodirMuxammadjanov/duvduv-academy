"use client";
import { motion } from 'framer-motion';
import styles from './Modules.module.css';

const CURRICULUM = [
  { type: 'lesson', num: '01', title: 'Tanishuv va Top of mind keyslar tahlili', date: '19.01.2027' },
  { type: 'lesson', num: '02', title: 'Brend pozitsiyasi', date: '23.01.2027' },
  { type: 'lesson', num: '03', title: 'Strategiya', date: '26.01.2027' },
  { type: 'lesson', num: '04', title: '4C, insayt va kreativ brief', date: '30.01.2027' },
  { type: 'practice', title: 'Amaliyot kurator bilan' },
  { type: 'lesson', num: '05', title: 'Real loyiha bilan strategiya qilish', date: '02.02.2027' },
  { type: 'lesson', num: '06', title: 'Kreativ reklama haqida', date: '06.02.2027' },
  { type: 'lesson', num: '07', title: "Idea va execution. G'oya topishni o'rganamiz", date: '09.02.2027' },
  { type: 'lesson', num: '08', title: 'Research va insayt', date: '13.02.2027' },
  { type: 'practice', title: 'Amaliyot kurator bilan' },
  { type: 'lesson', num: '09', title: 'Chiroyli matn', date: '16.02.2027' },
  { type: 'lesson', num: '10', title: 'Reference topish', date: '20.02.2027' },
  { type: 'lesson', num: '11', title: 'Ideani realizatsiya qilish va reklama kampaniya formatlari', date: '23.02.2027' },
  { type: 'lesson', num: '12', title: 'Minimal budjet va budjetsiz reklama kampaniya. Partizancha marketing', date: '27.02.2027' },
  { type: 'practice', title: 'Amaliyot' },
  { type: 'lesson', num: '13', title: 'Brainstorming', date: '02.03.2027' },
  { type: 'lesson', num: '14', title: 'Kreativ brief', date: '06.03.2027' },
  { type: 'lesson', num: '15', title: "G'oyalarni mijozga prezentatsiya qilish", date: '06.03.2027' },
  { type: 'practice', title: 'Amaliyot' },
  { type: 'lesson', num: '16', title: 'Diplom ishi', date: '09.03.2027' },
];

const CHIPS = ['2 oy', '16 dars', '4 amaliyot'];

export default function Modules() {
  return (
    <section className={styles.section} id="program">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>O&apos;QUV DASTURI</span>
          <h2 className={styles.title}>KURS DASTURI</h2>
          <div className={styles.chips}>
            {CHIPS.map((chip, i) => (
              <span key={chip} className={i === 0 ? styles.chipActive : styles.chip}>{chip}</span>
            ))}
          </div>
          <p className={styles.desc}>
            7-potok 2027-yil yanvar oyida boshlanadi. Haftada 2 marta oflayn dars.
          </p>
        </div>

        <motion.div
          className={styles.list}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {CURRICULUM.map((item, idx) =>
            item.type === 'practice' ? (
              <div key={idx} className={styles.practice}>
                <span className={styles.practiceTitle}>
                  <span className={styles.dot} aria-hidden="true" />
                  {item.title}
                </span>
                <span className={styles.practiceTag}>Offlayn</span>
              </div>
            ) : (
              <div key={idx} className={styles.row}>
                <span className={styles.num}>{item.num}</span>
                <span className={styles.lessonTitle}>{item.title}</span>
                <span className={styles.date}>{item.date}</span>
              </div>
            )
          )}

          <div className={styles.summary}>
            16 ta dars <span>+</span> 4 ta amaliyot
          </div>
        </motion.div>
      </div>
    </section>
  );
}
