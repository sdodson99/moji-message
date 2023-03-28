import { useState } from 'react';
import { CreateMojiMessageRequest } from '@/entities/moji-message';
import { CopyMojiMessageButton } from '@/features/copy-moji-message';
import { CreateMojiMessageForm } from '@/features/create-moji-message';

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
      {mojiMessage ? (
        <div className="relative mt-8 rounded border bg-gray-50">
          <div className="absolute top-5 right-5">
            <CopyMojiMessageButton
              mojiMessage={mojiMessage}
              lastCreateMojiMessageRequest={lastCreateMojiMessageRequest}
            />
          </div>
          <div data-testid="mojiMessageOutput" className="whitespace-pre p-5">
            {mojiMessage}
          </div>
        </div>
      ) : null}
    </>
  );
}
