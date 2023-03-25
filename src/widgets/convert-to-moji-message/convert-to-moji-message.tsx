import { useState } from 'react';
import styles from './convert-to-moji-message.module.css';
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
      <section>
        <CreateMojiMessageForm onMojiMessageCreate={onMojiMessageCreate} />
      </section>
      {mojiMessage ? (
        <section className="relative mt-12">
          <div className="absolute top-5 right-5">
            <CopyMojiMessageButton
              mojiMessage={mojiMessage}
              lastCreateMojiMessageRequest={lastCreateMojiMessageRequest}
            />
          </div>
          <div className={styles.mojiMessageOutputContainer}>
            <div data-testid="mojiMessageOutput" className="whitespace-pre p-5">
              {mojiMessage}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
