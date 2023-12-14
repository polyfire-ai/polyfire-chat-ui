import { IoSettingsOutline } from 'react-icons/io5/index.js';

const SettingsButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    type="button"
    className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200 focus:outline-none text-custom-100 hover:bg-custom-800"
  >
    <IoSettingsOutline className="h-6 w-6" />
    Settings
  </button>
);

export default SettingsButton;
