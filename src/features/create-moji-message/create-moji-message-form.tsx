import { createMojiMessage, CreateMojiMessageRequest } from '@/entities/moji-message';
import styles from './create-moji-message-form.module.css';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import Picker from '@emoji-mart/react';
import Popup from 'reactjs-popup';
import { useState } from 'react';

type CreateMojiMessageFieldValues = {
  message: string;
  messageEmoji: string;
  backgroundEmoji: string;
};

type EmojiSelectEvent = {
  native: string;
};

export type CreateMojiMessageFormProps = {
  onMojiMessageCreate?: (mojiMessage: string, createMojiMessageRequest: CreateMojiMessageRequest) => void;
};

export function CreateMojiMessageForm({ onMojiMessageCreate }: CreateMojiMessageFormProps) {
  const {
    formState: { errors },
    register,
    watch,
    setValue,
    setFocus,
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

  const [isMessageEmojiPickerOpen, setIsMessageEmojiPickerOpen] = useState(false);

  const onOpenMessageEmojiPickerClick = () => {
    setIsMessageEmojiPickerOpen(true);
  };

  const onMessageEmojiSelect = ({ native }: EmojiSelectEvent) => {
    setValue('messageEmoji', native, { shouldValidate: true });
    setIsMessageEmojiPickerOpen(false);
  };

  const onMessageEmojiPickerClose = () => {
    setIsMessageEmojiPickerOpen(false);
    setFocus('messageEmoji');
  };

  const [isBackgroundEmojiPickerOpen, setIsBackgroundEmojiPickerOpen] = useState(false);

  const onOpenBackgroundEmojiPickerClick = () => {
    setIsBackgroundEmojiPickerOpen(true);
  };

  const onBackgroundEmojiSelect = ({ native }: EmojiSelectEvent) => {
    setValue('backgroundEmoji', native, { shouldValidate: true });
    setIsBackgroundEmojiPickerOpen(false);
  };

  const onBackgroundEmojiPickerClose = () => {
    setIsBackgroundEmojiPickerOpen(false);
    setFocus('backgroundEmoji');
  };

  const onSubmit = (createMojiMessageFieldValues: CreateMojiMessageFieldValues) => {
    const mojiMessage = createMojiMessage(createMojiMessageFieldValues);

    onMojiMessageCreate?.(mojiMessage, createMojiMessageFieldValues);

    window.dataLayer?.push({
      event: 'convert_message',
      message_length: createMojiMessageFieldValues.message.length,
      emoji: createMojiMessageFieldValues.messageEmoji,
      background_emoji: createMojiMessageFieldValues.backgroundEmoji,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="message">
          Enter a <strong>Message</strong>
        </label>
        <input
          type="text"
          id="message"
          className={classNames('mt-1', {
            [styles.invalid]: errors.message,
          })}
          {...messageField}
        />
        {errors.message && (
          <p role="alert" className={classNames('mt-1', styles.formError)}>
            {errors.message.message}
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label htmlFor="messageEmojiPicker">
          Choose an <strong>Emoji</strong>
        </label>
        <div>
          <button
            id="messageEmojiPicker"
            ref={messageEmojiField.ref}
            aria-label="Open emoji selector"
            className={classNames('mt-1 border rounded w-10 h-10 flex items-center justify-center', {
              [styles.invalid]: errors.messageEmoji,
            })}
            type="button"
            onClick={onOpenMessageEmojiPickerClick}
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
          <Popup trigger={() => <span />} open={isMessageEmojiPickerOpen} onClose={onMessageEmojiPickerClose}>
            <Picker onEmojiSelect={onMessageEmojiSelect} autoFocus />
          </Popup>
        </div>
        {errors.messageEmoji && (
          <p role="alert" className={classNames('mt-1', styles.formError)}>
            {errors.messageEmoji.message}
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-col">
        <label htmlFor="backgroundEmojiPicker">
          Choose a <strong>Background Emoji</strong>
        </label>
        <div>
          <button
            id="backgroundEmojiPicker"
            ref={backgroundEmojiField.ref}
            aria-label="Open background emoji selector"
            className={classNames('mt-1 border rounded w-10 h-10 flex items-center justify-center', {
              [styles.invalid]: errors.backgroundEmoji,
            })}
            type="button"
            onClick={onOpenBackgroundEmojiPickerClick}
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
          <Popup trigger={() => <span />} open={isBackgroundEmojiPickerOpen} onClose={onBackgroundEmojiPickerClose}>
            <Picker onEmojiSelect={onBackgroundEmojiSelect} autoFocus />
          </Popup>
        </div>
        {errors.backgroundEmoji && (
          <p role="alert" className={classNames('mt-1', styles.formError)}>
            {errors.backgroundEmoji.message}
          </p>
        )}
      </div>
      <div className="mt-8">
        <button className="btn btn-primary">Convert Message</button>
      </div>
    </form>
  );
}
