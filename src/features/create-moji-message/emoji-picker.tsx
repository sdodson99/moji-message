import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import Popup from 'reactjs-popup';
import Picker from '@emoji-mart/react';
import classNames from 'classnames';

type EmojiMartSelectEvent = {
  native: string;
};

type EmojiPickerProps = {
  id?: string;
  className?: string;
  selectedEmoji?: string;
  onSelectedEmojiChange?: (e: EmojiSelectEvent) => void;
};

export type EmojiSelectEvent = {
  emoji: string;
};

export const EmojiPicker = forwardRef<HTMLButtonElement, EmojiPickerProps>(
  function EmojiPicker(
    { id, className, selectedEmoji, onSelectedEmojiChange },
    ref
  ) {
    const openEmojiPickerButtonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () => openEmojiPickerButtonRef.current!, []);

    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const getEmojiPickerAnchor = () => {
      const openEmojiPickerButton = openEmojiPickerButtonRef.current;

      const openEmojiPickerButtonLabel = openEmojiPickerButton?.labels?.[0];

      // Attempt to scroll to a label so that the user can see what the emoji picker represents.
      if (openEmojiPickerButtonLabel) {
        return openEmojiPickerButtonLabel;
      }

      return openEmojiPickerButton;
    };

    const scrollToEmojiPickerAnchor = () => {
      // SCROLL PICKER INTO VIEW TO LESSEN IMPACT OF WEIRD SCROLL WHEN PICKER GETS CLOSED ON MOBILE.
      getEmojiPickerAnchor()?.scrollIntoView?.({
        behavior: 'smooth',
      });
    };

    const onOpenEmojiPickerClick = () => {
      scrollToEmojiPickerAnchor();
      setIsEmojiPickerOpen(true);
    };

    const onEmojiSelect = ({ native }: EmojiMartSelectEvent) => {
      onSelectedEmojiChange?.({
        emoji: native,
      });
      setIsEmojiPickerOpen(false);
    };

    const onEmojiPickerClose = () => {
      setIsEmojiPickerOpen(false);

      scrollToEmojiPickerAnchor();

      openEmojiPickerButtonRef.current?.focus();
    };

    return (
      <>
        <button
          id={id}
          ref={openEmojiPickerButtonRef}
          aria-label="Open emoji picker."
          className={classNames(
            'mt-1 flex h-10 w-10 items-center justify-center rounded border',
            className
          )}
          type="button"
          onClick={onOpenEmojiPickerClick}
        >
          {selectedEmoji ? (
            selectedEmoji
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>
          )}
        </button>
        <Popup
          // Need to define a trigger to position popup accordingly - even though we're using a "controlled" popup.
          trigger={<span />}
          open={isEmojiPickerOpen}
          onClose={onEmojiPickerClose}
        >
          <Picker onEmojiSelect={onEmojiSelect} autoFocus dynamicWidth />
        </Popup>
      </>
    );
  }
);
