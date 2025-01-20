import Hero from '@/components/home/Hero';
import WebHostingPlan from '@/components/home/WebHostingPlan';
// import Loading from './loading';

export default function Home() {
  return (
    <section>
      {/* <Loading /> */}
      <Hero />
      <WebHostingPlan />
    </section>
  );
}
