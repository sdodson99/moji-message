import { CreateMojiMessageRequest } from '@/entities/moji-message';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

const COPY_SUCCESS_DISPLAY_TIMEOUT = 2000;

const MARKETING_SUFFIX = '🚀 Powered by Moji Message (https://emoji.seandodson.com)';

export type CopyMojiMessageButtonProps = {
  mojiMessage: string;
  lastCreateMojiMessageRequest?: CreateMojiMessageRequest;
};

export function CopyMojiMessageButton({ mojiMessage, lastCreateMojiMessageRequest }: CopyMojiMessageButtonProps) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [copySuccessTimeout, setCopySuccessTimeout] = useState<number>();

  const toggleCopySuccessButton = () => {
    setCopySuccess(true);

    window.clearTimeout(copySuccessTimeout);
    const nextCopySuccessTimeout = window.setTimeout(() => {
      setCopySuccess(false);
    }, COPY_SUCCESS_DISPLAY_TIMEOUT);

    setCopySuccessTimeout(nextCopySuccessTimeout);
  };

  const createMojiMessageWithMarketingSuffix = (mojiMessage: string) => {
    return `${mojiMessage}\n\n${MARKETING_SUFFIX}`;
  };

  const copyMojiMessageToClipboard = (mojiMessage: string) => copy(mojiMessage);

  const logCopyMojiMessageEvent = (lastCreateMojiMessageRequest?: CreateMojiMessageRequest) => {
    if (!lastCreateMojiMessageRequest) {
      return;
    }

    window.dataLayer?.push({
      event: 'copy_message',
      message_length: lastCreateMojiMessageRequest.message.length,
      emoji: lastCreateMojiMessageRequest.messageEmoji,
      background_emoji: lastCreateMojiMessageRequest.backgroundEmoji,
    });
  };

  const onCopyMojiMessage = () => {
    toggleCopySuccessButton();

    const mojiMessageWithMarketingSuffx = createMojiMessageWithMarketingSuffix(mojiMessage);

    copyMojiMessageToClipboard(mojiMessageWithMarketingSuffx);

    logCopyMojiMessageEvent(lastCreateMojiMessageRequest);
  };

  return (
    <button id="copyButton" type="button" className="btn btn-secondary" onClick={onCopyMojiMessage}>
      {!copySuccess ? (
        <div className="flex items-center">
          <div>Copy</div>
          <div className="ml-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
            </svg>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <div>Copied</div>
          <div className="ml-3 text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z" />
            </svg>
          </div>
        </div>
      )}
    </button>
  );
}
