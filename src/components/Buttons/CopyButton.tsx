import React, { useState, useEffect } from 'react';
import { CheckIcon, CopyIcon } from '../Icons';

export type CopyButtonProps = {
  textToCopy: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const CopyButton = ({ textToCopy, ...props }: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [isCopied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    } catch (err) {
      throw new Error('Failed to copy to clipboard');
    }
  };
  return (
    <button type="button" aria-label="Copy" onClick={() => copy()} {...props}>
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
};

export default CopyButton;
