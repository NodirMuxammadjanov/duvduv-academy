"use client";

import { useId, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ApplicationForm.module.css';
import { formatPhoneNumber, isPhoneComplete } from '@/lib/phoneUtils';
import { PAYMENT_OPTIONS, PAYMENT_QUESTION } from '@/lib/coursePricing';

const MIN_LOADING_MS = 2500;

const EXPERIENCE_OPTIONS = ['1 yilgacha', '1-2 yil', '3 yildan ko\'p'];
const INCOME_OPTIONS = ['1-3 million', '3-5 million', '5-10 million', '10 million+'];
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function normalizeTelegram(value) {
  const trimmed = value.trim().replace(/^@+/, '');
  return trimmed ? `@${trimmed}` : '';
}

function validateStep1(formData) {
  const name = formData.name.trim();
  const age = formData.age.trim();
  const telegram = formData.telegram.trim();

  if (!name || !age || !formData.phone.trim() || !telegram) {
    return 'Iltimos, 1-bosqichdagi barcha maydonlarni to\'ldiring.';
  }

  if (!Number.isFinite(Number(age)) || Number(age) <= 0) {
    return 'Yoshni to\'g\'ri kiriting.';
  }

  if (!isPhoneComplete(formData.phone)) {
    return 'Telefon raqamini to\'liq kiriting.';
  }

  return '';
}

function validateStep2(formData) {
  if (!formData.field.trim()) {
    return 'Iltimos, 2-bosqichdagi barcha maydonlarni to\'ldiring.';
  }

  if (!formData.experience || !formData.income || !formData.languages.trim() || !formData.payment) {
    return 'Iltimos, 2-bosqichdagi barcha maydonlarni to\'ldiring.';
  }

  return '';
}

function DropdownField({ label, value, placeholder, options, onChange, isOpen, onToggle }) {
  const id = useId();

  const selectedLabel = value || placeholder;

  return (
    <div className={styles.dropdownField}>
      <button
        type="button"
        className={`${styles.dropdownTrigger} ${value ? styles.dropdownTriggerSelected : ''}`}
        aria-haspopup="listbox"
        aria-label={`${label}: ${selectedLabel}`}
        aria-expanded={isOpen}
        aria-controls={id}
        onClick={onToggle}
      >
        <span>{selectedLabel}</span>
        <span className={`${styles.dropdownChevron} ${isOpen ? styles.dropdownChevronOpen : ''}`}>▾</span>
      </button>

      {isOpen && (
        <div className={styles.dropdownMenu} role="listbox" id={id} aria-label={label}>
          {options.map((option) => (
            <button
              key={option}
              type="button"
              role="option"
              aria-selected={value === option}
              className={`${styles.dropdownOption} ${value === option ? styles.dropdownOptionActive : ''}`}
              onClick={() => {
                onChange(option);
                onToggle(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ApplicationForm() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    phone: '+998 ',
    telegram: '',
    field: '',
    experience: '',
    income: '',
    languages: '',
    payment: '',
  });

  const handlePhoneChange = (e) => {
    setFormData((current) => ({ ...current, phone: formatPhoneNumber(e.target.value) }));
  };

  const handleTelegramChange = (e) => {
    const value = e.target.value.replace(/^@+/, '');
    setFormData((current) => ({ ...current, telegram: value }));
  };

  const goNext = () => {
    const validationError = validateStep1(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setStep(2);
  };

  const goBack = () => {
    if (isPending) return;
    setError('');
    setStep(1);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown((current) => (current === name ? null : name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateStep2(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsPending(true);
    setError('');

    const startedAt = Date.now();

    try {
      const payload = {
        name: formData.name.trim(),
        age: formData.age.trim(),
        phone: formData.phone.trim(),
        telegram: normalizeTelegram(formData.telegram),
        field: formData.field.trim(),
        experience: formData.experience,
        income: formData.income,
        languages: formData.languages.trim(),
        payment: formData.payment,
      };

      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await resp.json();
      const elapsed = Date.now() - startedAt;

      if (elapsed < MIN_LOADING_MS) {
        await sleep(MIN_LOADING_MS - elapsed);
      }

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.error || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
      }
    } catch (err) {
      const elapsed = Date.now() - startedAt;

      if (elapsed < MIN_LOADING_MS) {
        await sleep(MIN_LOADING_MS - elapsed);
      }

      setError('Server bilan bog\'lanishda xatolik yuz berdi.');
    } finally {
      setIsPending(false);
    }
  };

  const renderStep = () => {
    if (step === 1) {
      return (
        <motion.div
          key="step-1"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          className={styles.stepContent}
        >
          <h3>1-bosqich: Asosiy ma&apos;lumotlar</h3>
          <div className={styles.field}>
            <label htmlFor="name">Ism familyangizni yozing *</label>
            <input
              id="name"
              type="text"
              placeholder="Masalan: Nodirbek Ergashev"
              autoComplete="name"
              required
              value={formData.name}
              onChange={(e) => setFormData((current) => ({ ...current, name: e.target.value }))}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="age">Yoshingizni yozing *</label>
            <input
              id="age"
              type="number"
              inputMode="numeric"
              placeholder="Masalan: 24"
              min="1"
              required
              value={formData.age}
              onChange={(e) => setFormData((current) => ({ ...current, age: e.target.value }))}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="phone">Telefon raqamingizni yozing *</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+998 90-123-45-67"
              autoComplete="tel-national"
              inputMode="tel"
              required
              value={formData.phone}
              onChange={handlePhoneChange}
              onInput={handlePhoneChange}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="telegram">Telegram username</label>
            <div className={styles.telegramRow}>
              <span className={styles.telegramPrefix}>@</span>
              <input
                id="telegram"
                type="text"
                placeholder="username"
                autoComplete="off"
                required
                value={formData.telegram}
                onChange={handleTelegramChange}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.btn} onClick={goNext}>
              Davom etish
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <motion.div
        key="step-2"
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        className={styles.stepContent}
      >
          <h3>2-bosqich: Anketa savollari</h3>

        <div className={styles.field}>
          <label htmlFor="field">Qaysi sohada ishlaysiz? *</label>
          <input
            id="field"
            type="text"
            placeholder="Masalan: Marketing"
            required
            value={formData.field}
            onChange={(e) => setFormData((current) => ({ ...current, field: e.target.value }))}
          />
        </div>

        <div className={styles.field}>
          <label>Ish tajribangiz qancha? *</label>
          <DropdownField
            label="Ish tajribangiz qancha?"
            value={formData.experience}
            placeholder="Tanlang"
            options={EXPERIENCE_OPTIONS}
            isOpen={openDropdown === 'experience'}
            onToggle={() => toggleDropdown('experience')}
            onChange={(experience) =>
              setFormData((current) => ({ ...current, experience }))
            }
          />
        </div>

        <div className={styles.field}>
          <label>Taxminiy oylik daromadingiz qancha? *</label>
          <DropdownField
            label="Taxminiy oylik daromadingiz qancha?"
            value={formData.income}
            placeholder="Tanlang"
            options={INCOME_OPTIONS}
            isOpen={openDropdown === 'income'}
            onToggle={() => toggleDropdown('income')}
            onChange={(income) => setFormData((current) => ({ ...current, income }))}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="languages">Qaysi tillarni bilasiz? *</label>
          <input
            id="languages"
            type="text"
            placeholder="Masalan: O'zbek, Rus, Ingliz"
            required
            value={formData.languages}
            onChange={(e) => setFormData((current) => ({ ...current, languages: e.target.value }))}
          />
        </div>

        <div className={styles.field}>
          <label>{PAYMENT_QUESTION} *</label>
          <DropdownField
            label={PAYMENT_QUESTION}
            value={formData.payment}
            placeholder="Tanlang"
            options={PAYMENT_OPTIONS}
            isOpen={openDropdown === 'payment'}
            onToggle={() => toggleDropdown('payment')}
            onChange={(payment) => setFormData((current) => ({ ...current, payment }))}
          />
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.backBtn} onClick={goBack} disabled={isPending}>
            Orqaga
          </button>
          <button type="submit" className={styles.btn} disabled={isPending}>
            {isPending ? 'Jo\'natilmoqda...' : 'Kursga yozilish'}
          </button>
        </div>
      </motion.div>
    );
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.tag}>KURSGA YOZILISH</span>
          <h2 className={styles.title}>
            Anketani to&apos;ldiring <em>va suhbatga o&apos;ting.</em>
          </h2>
        </header>

        <div className={styles.formCard}>
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              className={styles.success}
            >
              <h2>Rahmat</h2>
              <p>Rahmat, siz bilan suhbat uchun tez orada bog&apos;lanamiz.</p>
            </motion.div>
          ) : isPending ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.loading}
              role="status"
              aria-live="polite"
            >
              <div className={styles.spinner} aria-hidden="true" />
              <h3>Ma&apos;lumotlaringiz yuborilmoqda...</h3>
              <p>Iltimos, bir necha soniya kuting.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleSubmit}
              className={styles.form}
            >
              <div className={styles.stepper} aria-label="Anketa bosqichlari">
                <span className={`${styles.stepDot} ${step >= 1 ? styles.stepDotActive : ''}`} />
                <span className={`${styles.stepDot} ${step >= 2 ? styles.stepDotActive : ''}`} />
              </div>

              {renderStep()}

              {error && <p className={styles.error}>{error}</p>}
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
}
