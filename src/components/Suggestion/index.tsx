import React from 'react';
import { Suggestion } from '../../types';

type SuggestionsPanelProps = {
  onSuggestionClick: (suggestion: Suggestion) => void;
  suggestions: Suggestion[];
};

const SuggestionsPanel: React.FC<SuggestionsPanelProps> = ({
  suggestions,
  onSuggestionClick,
}) => (
  <div className="absolute m-2 flex w-11/12 bottom-[calc(100%+10px)] gap-x-2 overflow-x-auto whitespace-nowrap text-xs text-custom-50 sm:text-sm z-10 thin-scrollbar-x">
    {suggestions.map((suggestion) => (
      <button
        key={suggestion.title}
        className="rounded-lg px-3 py-1 bg-custom-900 bg-opacity-75 hover:bg-custom-600 hover:bg-opacity-75 hover:text-custom-50 transition-colors duration-150 ease-in-out shadow-sm"
        onClick={() => onSuggestionClick(suggestion)}
        type="button"
      >
        {suggestion.title}
      </button>
    ))}
  </div>
);

export default SuggestionsPanel;
