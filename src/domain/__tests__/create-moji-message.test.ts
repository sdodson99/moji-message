import { createMojiMessage } from '../create-moji-message';

describe('createMojiMessage', () => {
  let messageInput: string;
  let emoji: string;
  let backgroundEmoji: string;

  beforeEach(() => {
    messageInput = 'abc defghijklmnopqrstuvwxyz';
    emoji = '🔴';
    backgroundEmoji = '⚪️';
  });

  it('should return encoded message', () => {
    const mojiMessage = createMojiMessage(messageInput, emoji, backgroundEmoji);

    expect(mojiMessage).toMatchSnapshot();
  });

  it('should encode message with emoji', () => {
    const mojiMessage = createMojiMessage(messageInput, emoji, backgroundEmoji);

    expect(mojiMessage).toContain(emoji);
  });

  it('should encode message background with background emoji', () => {
    const mojiMessage = createMojiMessage(messageInput, emoji, backgroundEmoji);

    expect(mojiMessage).toContain(backgroundEmoji);
  });

  it('should return empty message for unknown characters', () => {
    const mojiMessage = createMojiMessage('%@#$', emoji, backgroundEmoji);

    expect(mojiMessage).not.toContain(emoji);
  });
});
