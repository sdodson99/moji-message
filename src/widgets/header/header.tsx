import classNames from 'classnames';
import Image from 'next/image';

type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      className={classNames(className, 'flex bg-primary py-8 text-white')}
    >
      <div className="container flex items-center">
        <div>
          <Image src="/logo.png" alt="" height="25" width="25" />
        </div>
        <div className="ml-4">Moji Message</div>
      </div>
    </header>
  );
}
