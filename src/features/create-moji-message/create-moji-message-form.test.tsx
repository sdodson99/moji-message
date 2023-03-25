import { CreateMojiMessageRequest } from '@/entities/moji-message';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateMojiMessageForm, CreateMojiMessageFormProps } from './create-moji-message-form';
import '@testing-library/jest-dom';

vi.mock('@emoji-mart/react');

async function completeCreateMojiMessageForm(request: Partial<CreateMojiMessageRequest>) {
  if (request.message) {
    const messageInput = screen.getByLabelText('Enter a Message');
    await userEvent.type(messageInput, request.message);
  }

  if (request.messageEmoji) {
    const openMessageEmojiPickerButton = screen.getByLabelText('Choose an Emoji');
    await userEvent.click(openMessageEmojiPickerButton);

    const messageEmoji = screen.getByText(request.messageEmoji);
    await userEvent.click(messageEmoji);
  }

  if (request.backgroundEmoji) {
    const openBackgroundEmojiPickeButton = screen.getByLabelText('Choose a Background Emoji');
    await userEvent.click(openBackgroundEmojiPickeButton);

    const backgroundEmoji = screen.getByText(request.backgroundEmoji);
    await userEvent.click(backgroundEmoji);
  }
}

async function submitCreateMojiMessageForm() {
  const submitButton = screen.getByText('Convert Message');
  await userEvent.click(submitButton);
}

describe('<CreateMojiMessageForm />', () => {
  let props: CreateMojiMessageFormProps;

  beforeEach(() => {
    props = {
      onMojiMessageCreate: vi.fn(),
    };
  });

  it('creates moji message from form inputs', async () => {
    render(<CreateMojiMessageForm {...props} />);

    await completeCreateMojiMessageForm({
      message: 'hi',
      messageEmoji: '💜',
      backgroundEmoji: '✨',
    });

    await submitCreateMojiMessageForm();

    expect(props.onMojiMessageCreate).toBeCalledWith(expect.stringContaining('💜✨'), {
      message: 'hi',
      messageEmoji: '💜',
      backgroundEmoji: '✨',
    });
  });

  it('logs convert message event for form inputs', async () => {
    render(<CreateMojiMessageForm {...props} />);

    await completeCreateMojiMessageForm({
      message: 'hi',
      messageEmoji: '💜',
      backgroundEmoji: '✨',
    });

    await submitCreateMojiMessageForm();

    expect(window.dataLayer.push).toBeCalledWith({
      event: 'convert_message',
      message_length: 2,
      emoji: '💜',
      background_emoji: '✨',
    });
  });

  it('shows error message for no message provided', async () => {
    render(<CreateMojiMessageForm {...props} />);

    await completeCreateMojiMessageForm({
      message: undefined,
      messageEmoji: '💜',
      backgroundEmoji: '✨',
    });

    await submitCreateMojiMessageForm();

    const errorMessage = screen.getByText('Please enter a message.');
    expect(errorMessage).toBeInTheDocument();
  });

  it('shows error message for no message emoji provided', async () => {
    render(<CreateMojiMessageForm {...props} />);

    await completeCreateMojiMessageForm({
      message: 'hi',
      messageEmoji: undefined,
      backgroundEmoji: '✨',
    });

    await submitCreateMojiMessageForm();

    const errorMessage = screen.getByText('Please select an emoji.');
    expect(errorMessage).toBeInTheDocument();
  });
});
