import { createPopup, PopupPickerController } from '@picmo/popup-picker';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Header } from '@/widgets/header';
import { Footer } from '@/widgets/footer';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import { createMojiMessage } from '@/domain';
import copy from 'copy-to-clipboard';

const COPY_SUCCESS_DISPLAY_TIMEOUT = 2000;

const MARKETING_SUFFIX =
  '🚀 Powered by Moji Message (https://emoji.seandodson.com)';

type EmojiSelectEvent = {
  emoji: string;
};

type CreateMojiMessageFieldValues = {
  message: string;
  messageEmoji: string;
  backgroundEmoji: string;
};

export default function Index() {
  const {
    formState: { errors },
    register,
    watch,
    setValue,
    handleSubmit,
  } = useForm<CreateMojiMessageFieldValues>({
    defaultValues: {
      backgroundEmoji: '⚪️',
    },
  });

  const messageField = register('message', {
    required: 'Please enter a message.',
  });

  const messageEmojiValue = watch('messageEmoji');
  const messageEmojiField = register('messageEmoji', {
    required: 'Please select an emoji.',
  });

  const backgroundEmojiValue = watch('backgroundEmoji');
  const backgroundEmojiField = register('backgroundEmoji', {
    required: 'Please select a background emoji.',
  });

  const emojiPickerRef = useRef<HTMLButtonElement | null>(null);
  const backgroundEmojiPickerRef = useRef<HTMLButtonElement | null>(null);

  const [isPickingBackgroundEmoji, setIsPickingBackgroundEmoji] =
    useState(false);

  const emojiPickerPopupRef = useRef<PopupPickerController>();

  useEffect(() => {
    emojiPickerPopupRef.current = createPopup(
      {},
      {
        position: 'bottom-start',
        className: 'emoji-picker-popup',
      }
    );
  }, []);

  const onEmojiPickerSelect = useCallback(
    (e: EmojiSelectEvent) => {
      if (isPickingBackgroundEmoji) {
        return setValue('backgroundEmoji', e.emoji, { shouldValidate: true });
      }

      return setValue('messageEmoji', e.emoji, { shouldValidate: true });
    },
    [isPickingBackgroundEmoji, setValue]
  );

  useEffect(() => {
    emojiPickerPopupRef.current?.addEventListener(
      'emoji:select',
      onEmojiPickerSelect
    );

    return () =>
      emojiPickerPopupRef.current?.removeEventListener(
        'emoji:select',
        onEmojiPickerSelect
      );
  }, [emojiPickerPopupRef, onEmojiPickerSelect]);

  const openEmojiPicker = (rootElement?: HTMLElement) => {
    rootElement?.scrollIntoView?.({
      behavior: 'smooth',
    });

    emojiPickerPopupRef.current?.toggle({
      triggerElement: rootElement,
      referenceElement: rootElement,
    });
  };

  const onEmojiPickerClick = () => {
    setIsPickingBackgroundEmoji(false);

    openEmojiPicker(emojiPickerRef.current ?? undefined);
  };

  const onBackgroundEmojiPickerClick = () => {
    setIsPickingBackgroundEmoji(true);

    openEmojiPicker(backgroundEmojiPickerRef.current ?? undefined);
  };

  const [mojiMessage, setMojiMessage] = useState<string>();
  const [lastMojiMessageFieldValue, setLastMojiMessageFieldValues] =
    useState<CreateMojiMessageFieldValues>();

  const onSubmit = (
    createMojiMessageFieldValues: CreateMojiMessageFieldValues
  ) => {
    const mojiMessage = createMojiMessage(createMojiMessageFieldValues);

    setMojiMessage(mojiMessage);
    setLastMojiMessageFieldValues(createMojiMessageFieldValues);

    window.dataLayer?.push({
      event: 'convert_message',
      message_length: createMojiMessageFieldValues.message.length,
      emoji: createMojiMessageFieldValues.messageEmoji,
      background_emoji: createMojiMessageFieldValues.backgroundEmoji,
    });
  };

  const [copySuccess, setCopySuccess] = useState(false);
  const [copySuccessTimeout, setCopySuccessTimeout] = useState<number>();

  const onCopyMojiMessageOutput = () => {
    setCopySuccess(true);

    window.clearTimeout(copySuccessTimeout);
    setCopySuccessTimeout(
      window.setTimeout(() => {
        setCopySuccess(false);
      }, COPY_SUCCESS_DISPLAY_TIMEOUT)
    );

    copy(`${mojiMessage}\n\n${MARKETING_SUFFIX}`);

    if (!lastMojiMessageFieldValue) {
      return;
    }

    window.dataLayer?.push({
      event: 'copy_message',
      message_length: lastMojiMessageFieldValue.message.length,
      emoji: lastMojiMessageFieldValue.messageEmoji,
      background_emoji: lastMojiMessageFieldValue.backgroundEmoji,
    });
  };

  return (
    <div>
      <div className="min-h-screen">
        <Header />
        <main className="container my-8">
          <section>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="message">
                  Enter a <strong>Message</strong>
                </label>
                <input
                  type="text"
                  id="message"
                  className={classNames('mt-1', {
                    invalid: errors.message,
                  })}
                  {...messageField}
                />
                {errors.message && (
                  <p role="alert" className="mt-1 form-error">
                    {errors.message.message}
                  </p>
                )}
              </div>
              <div className="mt-4 form-group">
                <label htmlFor="messageEmoji">
                  Choose an <strong>Emoji</strong>
                </label>
                <div>
                  <button
                    id="messageEmoji"
                    ref={(r) => {
                      messageEmojiField.ref(r);
                      emojiPickerRef.current = r;
                    }}
                    aria-label="Open emoji selector"
                    className={classNames('emoji-picker', {
                      invalid: errors.messageEmoji,
                    })}
                    type="button"
                    onClick={onEmojiPickerClick}
                  >
                    {messageEmojiValue ? (
                      messageEmojiValue
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.messageEmoji && (
                  <p role="alert" className="mt-1 form-error">
                    {errors.messageEmoji.message}
                  </p>
                )}
              </div>
              <div className="mt-4 form-group">
                <label htmlFor="backgroundEmoji">
                  Choose a <strong>Background Emoji</strong>
                </label>
                <div>
                  <button
                    id="backgroundEmoji"
                    ref={(r) => {
                      backgroundEmojiField.ref(r);
                      backgroundEmojiPickerRef.current = r;
                    }}
                    aria-label="Open emoji selector"
                    className={classNames('emoji-picker', {
                      invalid: errors.backgroundEmoji,
                    })}
                    type="button"
                    onClick={onBackgroundEmojiPickerClick}
                  >
                    {backgroundEmojiValue ? (
                      backgroundEmojiValue
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.backgroundEmoji && (
                  <p role="alert" className="mt-1 form-error">
                    {errors.backgroundEmoji.message}
                  </p>
                )}
              </div>
              <div className="mt-8">
                <button className="btn btn-primary">Convert Message</button>
              </div>
            </form>
          </section>
          {mojiMessage ? (
            <section className="relative mt-12">
              <div className="absolute top-5 right-5">
                <button
                  id="copyButton"
                  type="button"
                  className="btn btn-secondary"
                  onClick={onCopyMojiMessageOutput}
                >
                  {!copySuccess ? (
                    <div className="flex items-center">
                      <div>Copy</div>
                      <div className="ml-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div>Copied</div>
                      <div className="ml-3 text-green-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </button>
              </div>
              <div className="moji-output-container">
                <div className="whitespace-pre p-5">{mojiMessage}</div>
              </div>
            </section>
          ) : null}
        </main>
      </div>
      <Footer />
    </div>
  );
}
