import { useState } from 'react';
import { CreateMojiMessageRequest } from '@/entities/moji-message';
import { CopyMojiMessageButton } from '@/features/copy-moji-message';
import { CreateMojiMessageForm } from '@/features/create-moji-message';
import classNames from 'classnames';

export function ConvertToMojiMessage() {
  const [mojiMessage, setMojiMessage] = useState<string>();
  const [lastCreateMojiMessageRequest, setLastCreateMojiMessageRequest] =
    useState<CreateMojiMessageRequest>();

  const onMojiMessageCreate = (
    mojiMessage: string,
    createMojiMessageRequest: CreateMojiMessageRequest
  ) => {
    setMojiMessage(mojiMessage);
    setLastCreateMojiMessageRequest(createMojiMessageRequest);
  };

  return (
    <>
      <CreateMojiMessageForm onMojiMessageCreate={onMojiMessageCreate} />
      <div className="relative mt-16 rounded border bg-gray-50">
        {mojiMessage ? (
          <div className="absolute top-5 right-5">
            <CopyMojiMessageButton
              mojiMessage={mojiMessage}
              lastCreateMojiMessageRequest={lastCreateMojiMessageRequest}
            />
          </div>
        ) : null}
        <div
          data-testid="mojiMessageOutput"
          className={classNames('h-96 overflow-y-scroll p-5', {
            ['whitespace-pre']: mojiMessage,
          })}
        >
          {mojiMessage ??
            'Your Moji Message will go here. Go ahead and create one!'}
        </div>
      </div>
    </>
  );
}
