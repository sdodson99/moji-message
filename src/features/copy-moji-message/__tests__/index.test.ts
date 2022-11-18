import {
  CopyMojiMessageController,
  CopyMojiMessageView,
  CopyMojiMessageViewElements,
  CopyMojiMessageModel,
} from '..';
import { CreateMojiMessageStore } from '../../../domain';
import copy from 'copy-to-clipboard';

jest.mock('copy-to-clipboard');
const mockCopy = copy as jest.Mock;

describe('copy moji message feature', () => {
  let createMojiMessageStore: CreateMojiMessageStore;
  let elements: CopyMojiMessageViewElements;
  let mockDataLayerPush: jest.Mock;

  let mojiMessageOutputText: string;

  beforeEach(() => {
    createMojiMessageStore = new CreateMojiMessageStore();

    createMojiMessageStore.currentMojiMessageRequest = {
      message: 'Hello world',
      messageEmoji: '🌻',
      backgroundEmoji: '⬜️',
    };

    elements = {
      copyMojiMessageButton: document.createElement('button'),
      copyReadyDisplay: document.createElement('div'),
      copySuccessDisplay: document.createElement('div'),
      mojiMessageOutput: document.createElement('div'),
    };

    mojiMessageOutputText = 'Hello world';
    elements.mojiMessageOutput.textContent = mojiMessageOutputText;

    mockDataLayerPush = jest.fn();
    window.dataLayer = {
      push: mockDataLayerPush,
    };

    new CopyMojiMessageController(
      new CopyMojiMessageView(elements),
      new CopyMojiMessageModel(createMojiMessageStore)
    );
  });

  afterEach(() => {
    mockCopy.mockReset();
  });

  it('should copy moji message output with marketing text to the clipboard', () => {
    elements.copyMojiMessageButton.click();

    expect(mockCopy).toBeCalledWith(
      `${mojiMessageOutputText}\n\n🚀 Powered by Moji Message (https://emoji.seandodson.com)`
    );
  });

  it('should not copy moji message output when a moji message has not been converted yet', () => {
    elements.mojiMessageOutput.textContent = null;

    elements.copyMojiMessageButton.click();

    expect(mockCopy).not.toBeCalled();
  });

  it('should show temporarily display copy success message after copy', async () => {
    elements.copyMojiMessageButton.click();

    expect(elements.copySuccessDisplay.classList).toContain('flex');
    expect(elements.copyReadyDisplay.classList).toContain('hidden');

    await new Promise((resolve) => setTimeout(resolve, 3000));

    expect(elements.copySuccessDisplay.classList).toContain('hidden');
    expect(elements.copyReadyDisplay.classList).toContain('flex');
  });

  describe('analytics', () => {
    it('should log copy_message event for moji message inputs', () => {
      elements.copyMojiMessageButton.click();

      expect(mockDataLayerPush).toBeCalledWith({
        event: 'copy_message',
        message_length: 11,
        emoji: '🌻',
        background_emoji: '⬜️',
      });
    });

    it('should not log copy_message event when moji message inputs not defined', () => {
      createMojiMessageStore.currentMojiMessageRequest = undefined;

      elements.copyMojiMessageButton.click();

      expect(mockDataLayerPush).not.toBeCalled();
    });
  });
});
