import { HTMLHead } from '@/components/HTMLHead';
import { Header } from '@/components/Header';
import HomePage from './HomePage';
import { Footer } from '@/components/Footer';

export default function Home() {

  return (
    <>
      <HTMLHead />
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}
