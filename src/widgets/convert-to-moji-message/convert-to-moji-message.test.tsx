import { CreateMojiMessageRequest } from '@/entities/moji-message';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ConvertToMojiMessage } from './convert-to-moji-message';
import copy from 'copy-to-clipboard';
import { Mock } from 'vitest';

vi.mock('@emoji-mart/react');

vi.mock('copy-to-clipboard');
const mockCopy = copy as Mock;

async function submitCreateMojiMessageForm(request: CreateMojiMessageRequest) {
  const messageInput = screen.getByLabelText('Enter a Message');
  await userEvent.type(messageInput, request.message);

  const openMessageEmojiPickerButton = screen.getByLabelText('Choose an Emoji');
  await userEvent.click(openMessageEmojiPickerButton);

  const messageEmoji = screen.getByText(request.messageEmoji);
  await userEvent.click(messageEmoji);

  const openBackgroundEmojiPickeButton = screen.getByLabelText(
    'Choose a Background Emoji'
  );
  await userEvent.click(openBackgroundEmojiPickeButton);

  const backgroundEmoji = screen.getByText(request.backgroundEmoji);
  await userEvent.click(backgroundEmoji);

  const submitButton = screen.getByText('Convert Message');
  await userEvent.click(submitButton);
}

describe('<ConvertToMojiMessage />', () => {
  it('converts message and emojis to moji message', async () => {
    render(<ConvertToMojiMessage />);

    await submitCreateMojiMessageForm({
      message: 'hi',
      messageEmoji: '💜',
      backgroundEmoji: '✨',
    });

    const mojiMessage = screen.getByTestId('mojiMessageOutput');
    expect(mojiMessage.innerHTML).toMatchSnapshot();
  });

  it('copies converted moji message w/ marketing text to clipboard when user clicks copy', async () => {
    render(<ConvertToMojiMessage />);

    await submitCreateMojiMessageForm({
      message: 'hi',
      messageEmoji: '💜',
      backgroundEmoji: '✨',
    });

    const copyButton = screen.getByText('Copy');
    await userEvent.click(copyButton);

    expect(mockCopy.mock.calls[0][0]).toMatchSnapshot();
  });
});
