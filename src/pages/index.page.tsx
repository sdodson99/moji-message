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
        <main className="container">
          <section
            className={classNames('my-8', styles.remainingHeightAboveFold)}
          >
            <h2 className="sr-only">Create a Moji Message</h2>
            <ConvertToMojiMessage />
          </section>
          <section className="my-8">
            <h2 className="text-2xl font-bold">Comments</h2>
            <p className="mt-4">Comment section coming soon!</p>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
