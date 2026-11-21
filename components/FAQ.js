"use client";
import { useState } from 'react';
import styles from './FAQ.module.css';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const questions = [
    { q: 'Kursga qabul qilinish uchun tajriba kerakmi?', a: 'Yo\'q, tajriba shart emas. Lekin sizda kuchli ishtiyoq va kreativlikka qiziqish bo\'lishi kerak.' },
    { q: 'Kurs qaysi tilda o\'tadi?', a: 'Darslar o\'zbek tilida olib boriladi.' },
    { q: 'Kurs qachon boshlanadi va qancha davom etadi?', a: '7-potok yanvar oyida boshlanadi. Kurs 2 oy davom etadi, darslar haftada 2 marta o\'tadi.' },
    { q: 'Oflayn kursda darslar yozib olinadimi?', a: 'Yo\'q, oflayn kursda darslar yozib olinmaydi. Barcha darslar jonli formatda o\'tadi.' },
    { q: 'Bepul leksiyalardan nimasi farq qiladi?', a: 'Bizda faqat nazariya emas, balki real loyihalar ustida Agency 605 mentorlari bilan yakkama-yakka ishlaysiz.' },
    { q: 'Agency 605 da ishlash kafolatlanadimi?', a: 'Eng yaxshi bitiruvchilar (imtihondan muvaffaqiyatli o\'tganlar) ish bilan ta\'minlanadi.' }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>SAVOLLAR</span>
          <h2 className={styles.title}>Ko'p beriladigan <em>savollar</em></h2>
        </div>

        <div className={styles.list}>
          {questions.map((item, i) => (
            <div key={i} className={styles.item} onClick={() => setOpenIdx(openIdx === i ? null : i)}>
              <div className={styles.question}>
                {item.q}
                <span className={styles.icon}>{openIdx === i ? '−' : '+'}</span>
              </div>
              {openIdx === i && (
                <div className={styles.answer}>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
