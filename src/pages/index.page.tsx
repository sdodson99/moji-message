import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { ConvertToMojiMessage } from '@/widgets/convert-to-moji-message';

export default function Index() {
  return (
    <div>
      <div className="min-h-screen">
        <Header />
        <main className="container my-8">
          <ConvertToMojiMessage />
        </main>
      </div>
      <Footer />
    </div>
  );
}
