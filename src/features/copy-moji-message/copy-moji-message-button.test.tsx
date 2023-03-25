import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CopyMojiMessageButton, CopyMojiMessageButtonProps } from './copy-moji-message-button';
import copy from 'copy-to-clipboard';
import '@testing-library/jest-dom';
import { Mock } from 'vitest';

vi.mock('copy-to-clipboard');
const mockCopy = copy as Mock;

describe('<CopyMojiMessageButton />', () => {
  let props: CopyMojiMessageButtonProps;

  beforeEach(() => {
    props = {
      mojiMessage: 'test',
      lastCreateMojiMessageRequest: {
        message: 'test',
        messageEmoji: '😂',
        backgroundEmoji: '⚪️',
      },
    };
  });

  it('copies moji message to clipboard when clicked', async () => {
    render(<CopyMojiMessageButton {...props} />);

    const copyButton = screen.getByText('Copy');
    await userEvent.click(copyButton);

    expect(mockCopy).toBeCalledWith(`${props.mojiMessage}\n\n🚀 Powered by Moji Message (https://emoji.seandodson.com)`);
  });

  it('logs copy moji message event when clicked', async () => {
    render(<CopyMojiMessageButton {...props} />);

    const copyButton = screen.getByText('Copy');
    await userEvent.click(copyButton);

    expect(window.dataLayer.push).toBeCalledWith({
      event: 'copy_message',
      message_length: props.lastCreateMojiMessageRequest?.message.length,
      emoji: props.lastCreateMojiMessageRequest?.messageEmoji,
      background_emoji: props.lastCreateMojiMessageRequest?.backgroundEmoji,
    });
  });

  it('shows copy ready text by default', () => {
    render(<CopyMojiMessageButton {...props} />);

    const copyReadyText = screen.getByText('Copy');

    expect(copyReadyText).toBeInTheDocument();
  });

  it('temporarily shows copy success text when clicked', async () => {
    render(<CopyMojiMessageButton {...props} />);

    const copyButton = screen.getByText('Copy');
    await userEvent.click(copyButton);

    const copySuccessText = await screen.findByText('Copied');
    expect(copySuccessText).toBeInTheDocument();

    const copyReadyText = await screen.findByText('Copy', undefined, { timeout: 3000 });
    expect(copyReadyText).toBeInTheDocument();
  });
});
