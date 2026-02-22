import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  speed?: number;
  className?: string;
  cursorChar?: string;
}

export default function TypeWriter({
  text,
  speed = 70,
  className = '',
  cursorChar = '█',
}: Props) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setIsComplete(false);
    indexRef.current = 0;

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={className}>
      {displayedText}
      <span
        className={`inline-block ${isComplete ? 'animate-pulse' : ''}`}
        style={{
          animation: isComplete ? 'blink 1s step-end infinite' : 'none',
        }}
      >
        {cursorChar}
      </span>
    </span>
  );
}
