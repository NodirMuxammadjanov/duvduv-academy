"use client";

import Image from 'next/image';
import styles from './StudentsShowcase.module.css';

const stories = [
  {
    image: '/students/student-3.webp',
    alt: "Friends Moscow mehmoni bilan o'quvchilar",
    title: "Kreativ fikrlash xuddi mushakka o'xshaydi",
    text:
      "Agentligimizning navbatdagi mehmoni Friends Moscow agentligining asoschilaridan biri va kreativ direktori Maksim Ponomarev bo'ldi. U amaliyotchilarimiz uchun kreativ texnikalar va g'oyani mashq qilish metodlari haqida masterklass o'tdi.",
  },
  {
    image: '/students/student-2.webp',
    alt: 'Young Lions vakillari bilan uchrashuv',
    title: '"Young Lions" festivali vakillari Toshkentda',
    text:
      "Xalqaro kreatorlar festivali vakillari bilan ochiq suhbatda ishtirokchilar Young Lions seleksiyasi, marketing, integratsiya va dizayn yo'nalishlari bo'yicha amaliy tavsiyalar oldi.",
  },
  {
    image: '/students/student-1.webp',
    alt: "Duv-Duv o'quvchilarining guruh surati",
    title: 'Bir guruh, bir ritm, bir maqsad',
    text:
      "Har bir oqimda turli tajribadagi yoshlar bir maqsadga jamlanadi: fikrni tizimlashtirish, kuchli g'oya topish va uni bozorga mos kreativ yechimga aylantirish.",
  },
  {
    image: '/students/student-4.webp',
    alt: "Qishki oqim o'quvchilari",
    title: 'Qishda ham temp pasaymaydi',
    text:
      "Offline darslar, mentor feedback va haftalik amaliy vazifalar orqali o'quvchilar qisqa muddatda portfolio darajasidagi natijaga chiqadi.",
  },
  {
    image: '/students/student-5.webp',
    alt: 'Masterklass jarayoni',
    title: 'Nazariya emas, jonli tahlil',
    text:
      "Masterklasslarda real ishlar tahlil qilinadi: briefdan insightgacha, insightdan konseptgacha bo'lgan zanjir amalda ko'rsatiladi.",
  },
  {
    image: '/students/student-6.webp',
    alt: 'Talabalar va mentorlar',
    title: 'Hamjamiyatimiz yil sayin kengaymoqda',
    text:
      "Bitiruvchilar va amaldagi o'quvchilar bitta professional muhitda qoladi: ish imkoniyatlari, hamkorlik va doimiy o'sish uchun yopiq networking ishlaydi.",
  },
];

export default function StudentsShowcase() {
  return (
    <section className={styles.section} id="students">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>AMALIYOTCHILAR</span>
          <h2 className={styles.title}>Bizning <em>o&apos;quvchilar</em></h2>
          <p className={styles.desc}>
            Dars jarayoni, masterklasslar va mentorlar bilan real amaliyotdan lavhalar.
          </p>
        </div>

        <div className={styles.grid}>
          {stories.map((story) => (
            <article key={story.title} className={styles.story}>
              <Image
                src={story.image}
                alt={story.alt}
                className={styles.storyImage}
                width={1280}
                height={1280}
                loading="lazy"
                sizes="(max-width: 920px) 100vw, 50vw"
              />
              <div className={styles.storyText}>
                <h4>{story.title}</h4>
                <p>{story.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
