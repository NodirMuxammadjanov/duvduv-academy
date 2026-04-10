"use client";
import styles from './Mentors.module.css';

export default function Mentors() {
  const awards = [
    { icon: '🥇', label: 'TAF! 2024 & 2025 — Yil Agentligi' },
    { icon: '🥈', label: 'Jolbors Festival — Kumush' },
    { icon: '🥉', label: 'Jolbors Festival — Bronza' }
  ];

  const team = [
    { name: 'Aziz Gapparov', role: 'ASOSCHI & BIZNES KONSULTANT', bio: '605 Agency asoschisi. Biznes strategiya va agentlik boshqaruvi bo\'yicha tajriba.' },
    { name: 'Otabek Sharapov', role: 'ASOSCHI & KREATIV DIREKTOR', bio: 'Agentlikning kreativ yo\'nalishini boshqaradi. Jolbors va TAF! mukofotlari sohibi.' },
    { name: 'Sevara Asamova', role: 'STRATEGIYA DIREKTORI', bio: 'Brend va kommunikatsion strategiya bo\'yicha mutaxassis. Tadqiqotga asoslangan yondashuv.' },
    { name: 'Bekzod Nazirov', role: 'KREATIV JAMOA BOSHI', bio: '"Xo\'jayin", "Texnomart To\'yi", "Onasini emsin" kabi taniqli loyihalar muallifi.' },
    { name: 'Dilya Alimova', role: 'MARKETING DIREKTOR', bio: 'Marketing strategiya va kampaniya boshqaruvi bo\'yicha ekspert.' },
    { name: 'Shukurullo Xudayberidiyev', role: 'DIZAYN JAMOA BOSHI', bio: 'Firma uslubi, brend dizayni va vizual identifikatsiya yo\'nalishida rahbar.' }
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>AGENCY 605</span>
          <h2 className={styles.title}>Sizga <em>kim dars o'tadi?</em></h2>
          <p className={styles.desc}>
            Kursni 2021-yildan buyon ishlab kelayotgan, Jolbors festivalidan kumush va bronza, TAF! 2024 va 2025 da "Yil Agentligi" bo'lgan Agency 605 jamoasi o'qitadi.
          </p>
        </div>

        <div className={styles.awards}>
          {awards.map((a, i) => (
            <div key={i} className={styles.awardItem}>
              <span>{a.icon}</span> {a.label}
            </div>
          ))}
        </div>
        
        <div className={styles.grid}>
          {team.map((m, i) => (
            <div key={i} className={styles.card}>
              <h3>{m.name}</h3>
              <span className={styles.role}>{m.role}</span>
              <p>{m.bio}</p>
            </div>
          ))}
        </div>

        <div className={styles.footer}>
          <p>
            <strong>605 Agency</strong> — bu bizneslarga kreativ yechim beruvchi agentlik. Strategiya, dizayn va promo yo'nalishlarida ishlaydi. 
            Tadqiqotga asoslanib, raqobatchilardan ajralib turuvchi, auditoriya uchun foydali va biznes uchun manfaatli yechimlar yaratadi. <span>605agency.uz →</span>
          </p>
        </div>
      </div>
    </section>
  );
}
