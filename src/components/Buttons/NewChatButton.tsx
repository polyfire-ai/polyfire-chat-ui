import { AddIcon } from '../Icons';

const NewChatButton = ({ onClick }: { onClick: () => void }) => (
  <button
    type="button"
    className="flex w-full gap-x-4 rounded-lg border p-4 text-left text-sm font-medium transition-colors duration-200 focus:outline-none border-custom-700 text-custom-100 hover:bg-custom-800"
    onClick={onClick}
  >
    <AddIcon />
    New Chat
  </button>
);

export default NewChatButton;
