import { usePolyfire } from 'polyfire-js/hooks/index.js';
import { MdLogout } from 'react-icons/md/index.js';

const LogoutButton = () => {
  const { auth } = usePolyfire();
  const { logout } = auth;

  return (
    <button
      type="button"
      className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors duration-200 focus:outline-none text-stone-200 hover:bg-stone-800"
      onClick={logout}
    >
      <MdLogout className="h-6 w-6" />
      Sign Out
    </button>
  );
};

export default LogoutButton;
