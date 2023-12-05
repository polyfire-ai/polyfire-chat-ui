import { useState, useEffect } from 'react';

const useCopyToClipboard = (text: string) => {
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
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
    } catch (err) {
      throw new Error('Failed to copy to clipboard');
    }
  };

  return { isCopied, copy };
};

export default useCopyToClipboard;
