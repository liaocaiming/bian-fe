import React, { useCallback } from 'react';
import { useLongPress } from '../hooks/useLongPress';
import './LongPressCopy.css';

interface LongPressCopyProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export const LongPressCopy: React.FC<LongPressCopyProps> = ({
  text,
  children,
  className = '',
}) => {
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('复制成功！');
      })
      .catch((err) => {
        console.error('复制失败:', err);
        alert('复制失败，请重试');
      });
  }, [text]);

  const { handlers, showCopyButton, setShowCopyButton } = useLongPress({
    onLongPress: () => { },
    longPressTime: 500,
  });

  return (
    <div className={`long-press-container ${className}`} style={{ position: 'relative' }}>
      <div {...handlers}>
        {children}
      </div>
      {showCopyButton && (
        <div className="copy-button-container">
          <button
            className="copy-button"
            onClick={() => {
              handleCopy();
              setShowCopyButton(false);
            }}
          >
            复制
          </button>
        </div>
      )}
    </div>
  );
}; 