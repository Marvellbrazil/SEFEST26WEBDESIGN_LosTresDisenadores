import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

export const useFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const footerRef = useRef<HTMLElement | null>(null);

  const handleIntersect = useCallback(([entry]: IntersectionObserverEntry[]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const currentRef = footerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.1 });
    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [handleIntersect]);

  const handleSubscribe = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  }, [email]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return useMemo(() => ({
    footerRef,
    isVisible,
    setIsVisible,
    email,
    setEmail,
    isSubscribed,
    handleSubscribe,
    scrollToTop
  }), [isVisible, email, isSubscribed, handleSubscribe, scrollToTop]);
};
