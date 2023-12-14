import { ScrollBehavior } from '../../types';

type Props = { disabled: boolean; onClick: (behavior: ScrollBehavior) => void };

const DownButton = ({ disabled, onClick }: Props) =>
  !disabled ? (
    <button
      type="button"
      aria-labelledby="Scroll to bottom"
      onClick={() => onClick('smooth')}
      className="cursor-pointer absolute z-10 rounded-full bg-clip-padding border border-white/10 bg-white/10 text-gray-200 right-1/2 transform translate-x-1/2 bottom-[calc(100%+10px)]"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="m-1 text-white"
      >
        <path
          d="M17 13L12 18L7 13M12 6L12 17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  ) : null;

export default DownButton;
