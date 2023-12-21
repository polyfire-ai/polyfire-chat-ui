import React, { HTMLAttributes } from 'react';
import { Message } from 'polyfire-js/hooks/useChat';
import { useChatContext } from '../../../contexts/ChatProvider';

export type HistoryProps = HTMLAttributes<HTMLDivElement> & {
  HistoryEmptyComponent: React.ComponentType;
  HistoryItemComponent: React.ComponentType<Message>;
  HistoryLoadingComponent: React.ComponentType;
};

export const History: React.FC<HistoryProps> = ({
  HistoryItemComponent,
  HistoryLoadingComponent,
  HistoryEmptyComponent,
  ...props
}) => {
  const { answer, history, chat } = useChatContext();

  return (
    <div
      ref={chat.ref}
      className="flex-1 overflow-y-auto text-sm leading-6 shadow-md text-custom-50 sm:text-base sm:leading-7 bg-custom-800"
      style={{ paddingTop: '1rem', paddingBottom: '1rem' }}
      {...props}
    >
      {history.loading ? (
        <HistoryLoadingComponent />
      ) : history?.data && history.data.length > 0 ? (
        history.data.map((item) => (
          <HistoryItemComponent key={item.id} {...item} />
        ))
      ) : (
        !answer.loading && <HistoryEmptyComponent />
      )}
    </div>
  );
};
