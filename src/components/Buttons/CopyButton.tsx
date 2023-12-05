import { CheckIcon, CopyIcon } from '../Icons';
import useCopyToClipboard from '../../hooks/useCopyToClipboard';

const CopyButton = ({ textToCopy }: { textToCopy: string }) => {
  const { isCopied, copy } = useCopyToClipboard(textToCopy);

  return (
    <button
      className="hover:text-red-600"
      type="button"
      aria-label="Copy"
      onClick={() => copy()}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </button>
  );
};

export default CopyButton;
