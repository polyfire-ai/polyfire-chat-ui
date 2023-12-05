import { useCallback } from 'react';
import { useChatContext, ChatComponent } from '../../../contexts/ChatProvider';
import { AddIcon } from '../../Icons';

const NewChatButton = () => {
  const { utils, component } = useChatContext();

  const { onResetChat } = utils;

  const onClick = useCallback(() => {
    component.onChange('chat' as ChatComponent);
    onResetChat();
  }, []);

  return (
    <button
      type="button"
      className="flex w-full gap-x-4 rounded-lg border border-stone-300 p-4 text-left text-sm font-medium text-stone-700 transition-colors duration-200 hover:bg-stone-200 focus:outline-none dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800"
      onClick={onClick}
    >
      <AddIcon />
      New Chat
    </button>
  );
};

export default NewChatButton;
