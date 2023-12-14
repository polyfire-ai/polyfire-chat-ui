import React from 'react';
import { Message } from 'polyfire-js/hooks/useChat';
import { ConversationProps } from '../../../types';

const Conversation = React.forwardRef(
  (
    {
      conversation,
      loading,
      answer,
      HistoryLoading,
      BotReply,
      UserReply,
      BotLoading,
      ChatWelcomeScreen,
      chatInstance,
      ...props
    }: ConversationProps,
    ref: React.ForwardedRef<HTMLDivElement | null>
  ) => (
    <div {...props} ref={ref}>
      {loading
        ? HistoryLoading({ chatInstance })
        : conversation && conversation.length > 0
          ? conversation.map((message: Message) =>
              message.is_user_message
                ? UserReply({ chatInstance, content: message.content })
                : BotReply({ chatInstance, content: message.content })
            )
          : !answer.loading && ChatWelcomeScreen({ chatInstance })}
      {answer.loading && BotLoading({ chatInstance })}
      {answer.data && BotReply({ chatInstance, content: answer.data?.content })}
    </div>
  )
);

export default Conversation;
