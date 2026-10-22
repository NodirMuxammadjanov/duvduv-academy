"use client";
import { motion } from 'framer-motion';
import styles from './Modules.module.css';

export default function Modules() {
  const modules = [
    {
      num: '01',
      title: 'Marketing bloki',
      content: ['Biznes qanday ishlaydi va pul topadi', 'Marketing nima va u qanday ishlaydi', 'Marketingning vazifalari va maqsadlari']
    },
    {
      num: '02',
      title: 'Strategiya bloki',
      content: ["Brend strategiyasi - nima va nima uchun kerak", 'Kommunikatsion strategiya tuzish', 'Freymvorklar va shablonlar', "Strategiya bo'yicha praktika"]
    },
    {
      num: '03',
      title: 'Kreativ bloki',
      content: ['Reklama turlari va qanday ishlaydi', 'HMW, SCAMPER, Lateral Thinking, BBDO 35', 'Brain Writing, Random Word, "Yes, And..."', 'Kreativlik mashqlari va workshoplar']
    },
    {
      num: '04',
      title: 'Amaliyot bloki',
      content: ["Real mijozdan haqiqiy brif", "Riserch olib borish va g'oyalar ishlab chiqish", "Eng yaxshi g'oyalar real loyihaga kiradi", 'Prezentatsiya va himoya - sertifikat uchun']
    }
  ];

  return (
    <section className={styles.section} id="program">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>KURS DASTURI</h2>
          <p className={styles.desc}>Marketing asoslaridan real loyiha himoyasigacha - ketma-ket va mantiqiy tuzilgan dastur.</p>
        </div>

        <div className={styles.grid}>
          {modules.map((mod, idx) => (
            <motion.div
              key={idx}
              className={styles.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className={styles.num}>{mod.num}</span>
              <h3>{mod.title}</h3>
              <ul>
                {mod.content.map((item, i) => (
                  <li key={i}><span>→</span> {item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
