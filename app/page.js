import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Exclusivity from '@/components/Exclusivity';
import Admission from '@/components/Admission';
import Modules from '@/components/Modules';
import Mentors from '@/components/Mentors';
import Pricing from '@/components/Pricing';
import AgencyProof from '@/components/AgencyProof';
import FAQ from '@/components/FAQ';
import ApplicationForm from '@/components/ApplicationForm';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Exclusivity />
      <Admission />
      <Modules />
      <Mentors />
      <Pricing />
      <AgencyProof />
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
