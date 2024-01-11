import { useChatContext } from '../../../contexts/ChatProvider';

type Card = {
  content: string;
  id: string | number;
  title: string;
};

type PromptCardsProps = {
  cards: Card[];
};

export const PromptCards = ({ cards }: PromptCardsProps) => {
  const chatInstance = useChatContext();

  return (
    <ul className="grid grid-cols-1 gap-6 text-slate-900 dark:text-slate-200 sm:grid-cols-2 lg:grid-cols-2">
      {cards.map((card) => (
        <li
          key={card.id}
          className="col-span-1 rounded-lg bg-slate-50 shadow dark:bg-slate-900"
        >
          <button
            onClick={() => chatInstance?.utils.sendMessage(card.content)}
            type="button"
          >
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="group flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-slate-900 transition-colors group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-600">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-1 truncate text-sm text-slate-500">
                  {card.content}
                </p>
              </div>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
};
