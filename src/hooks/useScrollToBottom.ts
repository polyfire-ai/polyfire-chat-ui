import { useEffect, useState, useRef } from 'react';
import type { ScrollBehavior } from '../types';

const useScrollToBottom = <T extends HTMLElement>(dependency: any) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const ref = useRef<T | null>(null);

  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight;
      setIsAtBottom(atBottom);
    }
  };

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    if (ref.current) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    if (ref.current && isAtBottom) {
      scrollToBottom('instant');
    } else {
      handleScroll();
    }
  }, [JSON.stringify(dependency)]);

  useEffect(() => {
    const element = ref.current;

    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, [ref.current]);

  return { isAtBottom, scrollToBottom, ref };
};

export default useScrollToBottom;
