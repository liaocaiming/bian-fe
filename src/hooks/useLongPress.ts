import { useCallback, useRef, useState } from 'react';

interface UseLongPressProps {
  onLongPress: () => void;
  onClick?: () => void;
  longPressTime?: number;
}

export const useLongPress = ({
  onLongPress,
  onClick,
  longPressTime = 500,
}: UseLongPressProps) => {
  const [showCopyButton, setShowCopyButton] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const isLongPress = useRef(false);

  const start = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      isLongPress.current = false;
      timerRef.current = setTimeout(() => {
        isLongPress.current = true;
        onLongPress();
        setShowCopyButton(true);
      }, longPressTime);
    },
    [onLongPress, longPressTime]
  );

  const clear = useCallback(
    (e: React.TouchEvent | React.MouseEvent, shouldTriggerClick = true) => {
      e.preventDefault();
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      if (shouldTriggerClick && !isLongPress.current && onClick) {
        onClick();
      }
    },
    [onClick]
  );

  return {
    handlers: {
      onMouseDown: start,
      onTouchStart: start,
      onMouseUp: clear,
      onMouseLeave: (e: React.MouseEvent) => clear(e, false),
      onTouchEnd: clear,
    },
    showCopyButton,
    setShowCopyButton,
  };
};
