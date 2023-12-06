import { useEffect, useState, useRef } from 'react';

const useScrollToBottom = <T extends HTMLElement>(dependency: any) => {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const ref = useRef<T>(null);

  const handleScroll = () => {
    if (ref.current) {
      const { scrollTop, scrollHeight, clientHeight } = ref.current;
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight);
    }
  };

  const scrollToBottom = () => {
    if (ref.current) {
      // eslint-disable-next-line no-param-reassign
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (ref.current && isAtBottom) {
      timeoutId = setTimeout(() => {
        scrollToBottom();
      }, 100);
    }

    return () => clearTimeout(timeoutId);
  }, [JSON.stringify(dependency)]);

  useEffect(() => {
    scrollToBottom();
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
  }, []);

  return { isAtBottom, scrollToBottom, ref };
};

export default useScrollToBottom;
