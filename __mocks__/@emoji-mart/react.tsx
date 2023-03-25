type EmojiSelectEvent = {
  native: string;
};

type PickerProps = {
  onEmojiSelect: (e: EmojiSelectEvent) => void;
};

export default function Picker({ onEmojiSelect }: PickerProps) {
  const emojis = ['💜', '✨'];

  return (
    <>
      {emojis.map((e) => (
        <button
          key={e}
          onClick={() =>
            onEmojiSelect({
              native: e,
            })
          }
          type="button"
        >
          {e}
        </button>
      ))}
    </>
  );
}
