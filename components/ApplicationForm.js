"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ApplicationForm.module.css';

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '+998 ',
    telegram: '',
    occupation: '',
    experience: '',
    payment: 'To\'liq to\'lash — $750',
    source: 'Ijtimoiy tarmoqlar'
  });
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Ensure +998 stays
    if (!value.startsWith('+998 ')) {
      value = '+998 ';
    }

    // Strip non-digits after +998
    let digits = value.slice(5).replace(/\D/g, '');
    
    // Limit to 9 digits (XX-XXX-XX-XX)
    digits = digits.slice(0, 9);

    // Format: 90-123-45-67
    let formatted = '';
    if (digits.length > 0) {
      formatted += digits.slice(0, 2);
      if (digits.length > 2) {
        formatted += '-' + digits.slice(2, 5);
      }
      if (digits.length > 5) {
        formatted += '-' + digits.slice(5, 7);
      }
      if (digits.length > 7) {
        formatted += '-' + digits.slice(7, 9);
      }
    }

    setFormData({ ...formData, phone: '+998 ' + formatted });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError('');

    try {
      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await resp.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
      }
    } catch (err) {
      setError('Server bilan bog\'lanishda xatolik yuz berdi.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tag}>KURSGA YOZILISH</span>
          <h2 className={styles.title}>Kreativ karyerangizni <em>605'dan boshlang.</em></h2>
        </header>

        <div className={styles.formCard}>
          {isSubmitted ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.success}
            >
              <h2>Muvaffaqiyatli!</h2>
              <p>Tez orada bizning jamoa siz bilan bog'lanadi.</p>
            </motion.div>
          ) : (
            <>
              <div className={styles.steps}>
                {[1, 2, 3].map((s) => (
                  <div key={s} className={`${styles.stepDot} ${step >= s ? styles.active : ''}`} />
                ))}
              </div>

              <AnimatePresence mode="wait">
                <form key={step} onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()} className={styles.form}>
                  {step === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3>Shaxsiy ma'lumotlar</h3>
                      <div className={styles.field}>
                        <label>Ism va familiya *</label>
                        <input 
                          type="text" 
                          placeholder="Masalan: Nodirbek Ergashev"
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className={styles.field}>
                        <label>Yoshingiz *</label>
                        <input 
                          type="number" 
                          placeholder="Masalan: 24"
                          required 
                          value={formData.age}
                          onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        />
                      </div>
                      <div className={styles.field}>
                        <label>Telefon raqam *</label>
                        <input 
                          type="tel" 
                          placeholder="+998 90-123-45-67"
                          required 
                          value={formData.phone}
                          onChange={handlePhoneChange}
                        />
                      </div>
                      <button type="button" onClick={nextStep} className={styles.btn}>Davom etish →</button>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3>Siz haqingizda</h3>
                      <div className={styles.field}>
                        <label>Kasbingiz *</label>
                        <input 
                          type="text" 
                          placeholder="Masalan: Grafik dizayner yoki Talaba"
                          required 
                          value={formData.occupation}
                          onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        />
                      </div>
                      <div className={styles.field}>
                        <label>Tajribangiz bormi? (Soha bo'yicha) *</label>
                        <textarea 
                          placeholder="Qancha vaqtdan beri bu sohada faoliyat ko'rsatasiz?"
                          required 
                          value={formData.experience}
                          onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                        />
                      </div>
                      <div className={styles.actions}>
                        <button type="button" onClick={prevStep} className={styles.backBtn}>Orqaga</button>
                        <button type="button" onClick={nextStep} className={styles.btn}>Davom etish →</button>
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <h3>Qo'shimcha ma'lumotlar</h3>
                      <div className={styles.field}>
                        <label>Telegram username *</label>
                        <input 
                          type="text" 
                          placeholder="@username"
                          required 
                          value={formData.telegram}
                          onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                        />
                      </div>
                      <div className={styles.field}>
                        <label>To'lov varianti *</label>
                        <select value={formData.payment} onChange={(e) => setFormData({ ...formData, payment: e.target.value })}>
                          <option>To'liq to'lash — $750</option>
                          <option>Bo'lib to'lash — 3 × $250</option>
                        </select>
                      </div>
                      <div className={styles.field}>
                        <label>Duv-Duv Gap haqida qayerdan eshitdingiz?</label>
                        <select value={formData.source} onChange={(e) => setFormData({ ...formData, source: e.target.value })}>
                          <option>Ijtimoiy tarmoqlar</option>
                          <option>Do'stlarimdan</option>
                          <option>Bepul leksiyaga qatnashgan edim</option>
                          <option>Tavsiya asosida</option>
                        </select>
                      </div>
                      <div className={styles.actions}>
                        <button type="button" onClick={prevStep} className={styles.backBtn} disabled={isPending}>Orqaga</button>
                        <button type="submit" className={styles.btn} disabled={isPending}>
                          {isPending ? 'Jo\'natilmoqda...' : 'KURSGA YOZILISH'}
                        </button>
                      </div>
                      {error && <p className={styles.error}>{error}</p>}
                    </motion.div>
                  )}
                </form>
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
