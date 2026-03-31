import HeroSection from '@/components/HeroSection';
import StatsBar from '@/components/StatsBar';
import FeaturesSection from '@/components/FeaturesSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main style={{ paddingTop: '8rem', paddingBottom: '0' }}>
      <HeroSection />
      <StatsBar />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </main>
  );
}
