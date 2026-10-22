import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Modules from '@/components/Modules';
import Mentors from '@/components/Mentors';
import Pricing from '@/components/Pricing';
import Portfolio from '@/components/Portfolio';
import StudentsShowcase from '@/components/StudentsShowcase';
import FAQ from '@/components/FAQ';
import ApplicationForm from '@/components/ApplicationForm';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Modules />
      <Mentors />
      <Pricing />
      <Portfolio />
      <StudentsShowcase />
      <FAQ />
      <ApplicationForm />

      <footer style={{
        padding: '32px 48px',
        background: 'var(--night)',
        color: 'rgba(255,255,255,0.3)',
        fontSize: '12px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255,255,255,0.05)'
      }}>
        © 2026 Duv-Duv Gap. O'zbekistondagi birinchi kreativlik maktabi.
      </footer>
    </main>
  );
}
