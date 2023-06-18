import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ConvertToMojiMessage } from '@/widgets/convert-to-moji-message';
import styles from './index.module.css';
import classNames from 'classnames';
import { FirebaseCommentsProvider } from '@headless-comments/react';
import { useState } from 'react';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { CommentsSection } from '@/widgets/comments-section';

const firebaseConfig = {
  apiKey: 'AIzaSyDbK5y_XvQ4IRWL9XTrOW4aYn-wwHOHLkA',
  authDomain: 'moji-message-35c73.firebaseapp.com',
  projectId: 'moji-message-35c73',
  storageBucket: 'moji-message-35c73.appspot.com',
  messagingSenderId: '1016794220787',
  appId: '1:1016794220787:web:63921c0b0b3eb222944f86',
  measurementId: 'G-EC6DSKCG31',
};

export default function Index() {
  const [firebaseApp] = useState<FirebaseApp>(() =>
    initializeApp(firebaseConfig)
  );

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
            <div className="mt-4">
              <FirebaseCommentsProvider
                contentId={'moji-message'}
                firebaseApp={firebaseApp}
              >
                <CommentsSection />
              </FirebaseCommentsProvider>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}
