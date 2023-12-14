import Conversation from './Conversation';
import { ChatProps } from '../../types';

import { Prompt as CustomPrompt } from '../Inputs/Prompt';
import {
  RoundedBotReplyComponent,
  RoundedBotLoadingCard,
  RoundedHistoryLoadingComponent,
  RoundedUserReplyComponent,
} from './Rounded';

import { ChatWelcomeScreen as Welcome } from './Welcome';
import DownButton from '../Buttons/DownButton';

const Chat = ({
  // suggestions,
  UserReply = RoundedBotReplyComponent,
  BotReply = RoundedUserReplyComponent,
  HistoryLoading = RoundedHistoryLoadingComponent,
  BotLoading = RoundedBotLoadingCard,
  ChatWelcomeScreen = Welcome,
  Prompt = CustomPrompt,
  chatInstance,
}: ChatProps) => {
  const { history, answer } = chatInstance;

  return (
    <>
      <Conversation
        className="flex-1 overflow-y-auto text-sm leading-6 shadow-md text-custom-200 sm:text-base sm:leading-7 bg-custom-800"
        style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
        conversation={history.data || []}
        loading={history.loading}
        answer={answer}
        ref={chatInstance.chat.ref}
        chatInstance={chatInstance}
        UserReply={UserReply}
        BotReply={BotReply}
        HistoryLoading={HistoryLoading}
        BotLoading={BotLoading}
        ChatWelcomeScreen={ChatWelcomeScreen}
      />
      <div className="relative">
        <DownButton
          onClick={() => {
            chatInstance.utils.onScrollToBottom('smooth');
          }}
          disabled={chatInstance.chat.isAtBottom}
        />
        {Prompt({ chatInstance })}
      </div>
    </>
  );
};

export default Chat;
