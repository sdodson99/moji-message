import Image from "next/image";
import classNames from "classnames";
import styles from "./header.module.css";

export function Header() {
  return (
    <header className={classNames("py-8 shadow-md", styles.header)}>
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
          <h1 className="font-medium text-green-700 text-lg">Moji Message</h1>
          <div className="font-light text-gray-700 text-sm italic">
            Encode a message with emojis!
          </div>
        </div>
      </div>
    </header>
  );
}
