import { IoSettingsOutline } from 'react-icons/io5/index.js';
import { useChatContext } from '../../../contexts/ChatProvider';

const SettingsButton = () => {
  const { component } = useChatContext();
  return (
    <button
      onClick={() => component.onChange('setting')}
      type="button"
      className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200 focus:outline-none text-stone-200 hover:bg-stone-800"
    >
      <IoSettingsOutline className="h-6 w-6" />
      Settings
    </button>
  );
};

export default SettingsButton;
