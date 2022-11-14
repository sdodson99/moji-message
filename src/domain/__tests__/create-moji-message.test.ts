import { createMojiMessage } from '../create-moji-message';
import { CreateMojiMessageRequest } from '../create-moji-message-request';

describe('createMojiMessage', () => {
  let request: CreateMojiMessageRequest;

  beforeEach(() => {
    request = {
      message: 'abcdefghijklmnopqrstuvwxyz ?! 1234567890',
      messageEmoji: '🔴',
      backgroundEmoji: '⚪️',
    };
  });

  it('should return encoded message', () => {
    const mojiMessage = createMojiMessage(request);

    expect(mojiMessage).toMatchSnapshot();
  });

  it('should encode message with emoji', () => {
    const mojiMessage = createMojiMessage(request);

    expect(mojiMessage).toContain(request.messageEmoji);
  });

  it('should encode message background with background emoji', () => {
    const mojiMessage = createMojiMessage(request);

    expect(mojiMessage).toContain(request.backgroundEmoji);
  });

  it('should return empty message for unknown characters', () => {
    request.message = '%@#$';

    const mojiMessage = createMojiMessage(request);

    expect(mojiMessage).toBeFalsy();
  });
});
