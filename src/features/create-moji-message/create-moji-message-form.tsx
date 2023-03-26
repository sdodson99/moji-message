import {
  createMojiMessage,
  CreateMojiMessageRequest,
} from '@/entities/moji-message';
import styles from './create-moji-message-form.module.css';
import classNames from 'classnames';
import { useForm } from 'react-hook-form';
import { EmojiPicker, EmojiSelectEvent } from './emoji-picker';

type CreateMojiMessageFieldValues = {
  message: string;
  messageEmoji: string;
  backgroundEmoji: string;
};

export type CreateMojiMessageFormProps = {
  onMojiMessageCreate?: (
    mojiMessage: string,
    createMojiMessageRequest: CreateMojiMessageRequest
  ) => void;
};

export function CreateMojiMessageForm({
  onMojiMessageCreate,
}: CreateMojiMessageFormProps) {
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

  const onSelectedMessageEmojiChange = ({ emoji }: EmojiSelectEvent) => {
    setValue('messageEmoji', emoji, { shouldValidate: true });
  };

  const onSelectedBackgroundEmojiChange = ({ emoji }: EmojiSelectEvent) => {
    setValue('backgroundEmoji', emoji, { shouldValidate: true });
  };

  const onSubmit = (
    createMojiMessageFieldValues: CreateMojiMessageFieldValues
  ) => {
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
          <EmojiPicker
            ref={messageEmojiField.ref}
            id="messageEmojiPicker"
            className={classNames({
              [styles.invalid]: errors.messageEmoji,
            })}
            selectedEmoji={messageEmojiValue}
            onSelectedEmojiChange={onSelectedMessageEmojiChange}
          />
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
          <EmojiPicker
            ref={backgroundEmojiField.ref}
            id="backgroundEmojiPicker"
            className={classNames({
              [styles.invalid]: errors.backgroundEmoji,
            })}
            selectedEmoji={backgroundEmojiValue}
            onSelectedEmojiChange={onSelectedBackgroundEmojiChange}
          />
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
