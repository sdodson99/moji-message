import { createMojiMessage } from '../create-moji-message';

describe('createMojiMessage', () => {
  let messageInput: string;
  let emoji: string;

  beforeEach(() => {
    messageInput = 'abc defghijklmnopqrstuvwxyz';
    emoji = '🚀';
  });

  it('should return message for any alphabetical character', () => {
    const mojiMessage = createMojiMessage(messageInput, emoji);

    expect(mojiMessage).toMatchSnapshot();
  });

  it('should encode message with emoji', () => {
    const mojiMessage = createMojiMessage(messageInput, emoji);

    expect(mojiMessage).toContain(emoji);
  });

  it('should return empty message for unknown characters', () => {
    const mojiMessage = createMojiMessage('!@#$', emoji);

    expect(mojiMessage).not.toContain(emoji);
  });
});
