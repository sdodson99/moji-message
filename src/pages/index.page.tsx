import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ConvertToMojiMessage } from '@/widgets/convert-to-moji-message';
import styles from './index.module.css';
import { useRef } from 'react';

export default function Index() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className={styles.layout}>
      <div className="min-h-screen">
        <Header className={styles.headerHeight} />
        <main>
          <section className={styles.remainingHeightAboveFold}>
            <div className="bg-primary pt-8 pb-16 text-white">
              <div className="container">
                <h1 className="text-5xl font-bold md:text-7xl">
                  The <span className="text-yellow-300">Fun</span> Way to Create
                  a Message
                </h1>
                <p className="mt-8 text-lg md:text-2xl">
                  Encode a message with emojis to spice up your delivery and
                  make your message stick.
                </p>
                <div className="mt-8">
                  <button
                    className="rounded-lg bg-white px-8 py-4 text-slate-800 transition hover:bg-slate-200"
                    onClick={() =>
                      formRef?.current?.scrollIntoView({ behavior: 'smooth' })
                    }
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.wave}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
              >
                <path
                  d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                  className="fill-primary"
                ></path>
              </svg>
            </div>
          </section>
          <section ref={formRef} className="container min-h-screen py-24">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 md:text-5xl">
                Create Your Moji Message
              </h2>
              <div className="mt-16">
                <ConvertToMojiMessage />
              </div>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
