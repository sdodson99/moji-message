import { createMojiMessage, CreateMojiMessageRequest } from '.';

describe('createMojiMessage', () => {
  let request: CreateMojiMessageRequest;

  beforeEach(() => {
    request = {
      message: 'abcdefghijklmnopqrstuvwxyz ?! 1234567890',
      messageEmoji: '🔴',
      backgroundEmoji: '⚪️',
    };
  });

  it('returns encoded message', () => {
    const mojiMessage = createMojiMessage(request);

    expect(mojiMessage).toMatchSnapshot();
  });

  it('encodes message with emoji', () => {
    const mojiMessage = createMojiMessage(request);

    expect(mojiMessage).toContain(request.messageEmoji);
  });

  it('encodes message background with background emoji', () => {
    const mojiMessage = createMojiMessage(request);

    expect(mojiMessage).toContain(request.backgroundEmoji);
  });

  it('returns empty message for unknown characters', () => {
    request.message = '%@#$';

    const mojiMessage = createMojiMessage(request);

    expect(mojiMessage).toBeFalsy();
  });
});
