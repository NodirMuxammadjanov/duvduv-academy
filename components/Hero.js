"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
        >
          <h1>
            O'zbekistondagi <em>birinchi</em> kreativ reklama maktabi
          </h1>
          <p className={styles.sub}>
            3 oyda kreativ kommunikatsiyalar sohasida professional bilim, real loyihalar va Agency 605 da ishlash imkoniyati.
          </p>
          <div className={styles.actions}>
            <a href="#contact" className={styles.primaryBtn}>KURSGA YOZILISH</a>
            <a href="#program" className={styles.secondaryBtn}>DASTURNI KO'RISH</a>
          </div>
          <div className={styles.meta}>
            <div className={styles.metaItem}>
              <span className={styles.metaVal}>500+</span>
              <span className={styles.metaLabel}>ARIZALAR</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaVal}>3 OY</span>
              <span className={styles.metaLabel}>DAVOMIYLIGI</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaVal}>60+</span>
              <span className={styles.metaLabel}>BITIRUVCHI</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src="/hero-image.jpg"
              alt="Duv-Duv Academy Logo"
              width={900}
              height={900}
              priority
              sizes="(max-width: 960px) 100vw, 42vw"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
