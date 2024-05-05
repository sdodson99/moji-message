import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ConvertToMojiMessage } from '@/widgets/convert-to-moji-message';
import styles from './index.module.css';
import classNames from 'classnames';

export default function Index() {
  return (
    <div className={styles.layout}>
      <div className="min-h-screen">
        <Header className={styles.headerHeight} />
        <main>
          <section
            className={classNames(
              styles.remainingHeightAboveFold,
              'bg-primary py-8 text-white'
            )}
          >
            <div className="container">
              <h1 className="text-5xl font-bold md:text-7xl">
                The <span className="text-yellow-300">Fun</span> Way To Create a
                Message
              </h1>
              <p className="mt-8 text-lg md:text-2xl">
                Encode a message with emojis to spice up your delivery and make
                your message stick.
              </p>
              <div className="mt-8">
                <button className="rounded-lg bg-white px-8 py-4 text-slate-800 transition hover:bg-slate-200">
                  Get Started
                </button>
              </div>
            </div>
          </section>
          <section className="container my-8">
            <h2 className="sr-only">Create a Moji Message</h2>
            <ConvertToMojiMessage />
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
