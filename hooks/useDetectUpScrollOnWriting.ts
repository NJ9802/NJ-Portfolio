import { useCallback, useRef } from "react";

export const useDetectUpScrollOnWriting = (onScrollUp: () => void) => {
  const scrollDivRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const container: HTMLDivElement = scrollDivRef.current as HTMLDivElement;
    const currentScrollTop = container?.scrollTop;

    const prevScrollTop = parseFloat(
      container?.getAttribute("data-prev-scroll-top") || "0"
    );

    if (currentScrollTop < prevScrollTop) {
      onScrollUp();
    }

    container?.setAttribute(
      "data-prev-scroll-top",
      currentScrollTop.toString()
    );
  }, [onScrollUp]);

  return { scrollDivRef, handleScroll };
};
