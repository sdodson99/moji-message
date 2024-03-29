import Image from 'next/image';
import classNames from 'classnames';
import styles from './header.module.css';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={classNames('flex py-8 shadow-md', styles.header, className)}
    >
      <div className="container flex items-center">
        <div>
          <Image
            src="/logo.png"
            className="max-h-10 max-w-full"
            alt=""
            height="40"
            width="40"
          />
        </div>
        <div className="ml-5">
          <h1 className="text-lg font-medium text-green-700">Moji Message</h1>
          <div className="text-sm font-light italic text-gray-700">
            Encode a message with emojis!
          </div>
        </div>
      </div>
    </header>
  );
}
