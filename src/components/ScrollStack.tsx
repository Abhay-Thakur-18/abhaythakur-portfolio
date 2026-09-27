import React, { useLayoutEffect, useRef, useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import './ScrollStack.css';

export interface ScrollStackItemProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export const ScrollStackItem: React.FC<ScrollStackItemProps> = ({
  children,
  itemClassName = '',
}) => (
  <div className={`scroll-stack-card ${itemClassName}`.trim()}>{children}</div>
);

export interface ScrollStackProps {
  children: React.ReactNode;
  className?: string;
  itemDistance?: number;
  stackPosition?: string;
  useWindowScroll?: boolean;
  onStackComplete?: () => void;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
  children,
  className = '',
  itemDistance = 80,
  stackPosition = '10%',
  useWindowScroll = true,
  onStackComplete: _onStackComplete,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const initialTopsRef = useRef<number[]>([]);
  const lastTransformsRef = useRef(new Map());
  const isUpdatingRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const parsePercentage = useCallback((value: string | number, containerHeight: number) => {
    if (typeof value === 'string' && value.includes('%')) {
      return (parseFloat(value) / 100) * containerHeight;
    }
    return typeof value === 'number' ? value : parseFloat(value);
  }, []);

  const getScrollData = useCallback(() => {
    if (useWindowScroll) {
      return {
        scrollTop: window.scrollY,
        containerHeight: window.innerHeight,
      };
    } else {
      const scroller = scrollerRef.current;
      return {
        scrollTop: scroller ? scroller.scrollTop : 0,
        containerHeight: scroller ? scroller.clientHeight : 0,
      };
    }
  }, [useWindowScroll]);

  const updateCardTransforms = useCallback(() => {
    if (!cardsRef.current.length || isUpdatingRef.current) return;

    // On mobile, keep natural flow with zero content overlap
    if (isMobile) {
      cardsRef.current.forEach((card) => {
        if (!card) return;
        card.style.transform = 'none';
        card.style.opacity = '1';
        card.style.filter = '';
      });
      return;
    }

    isUpdatingRef.current = true;

    const { scrollTop, containerHeight } = getScrollData();
    const stackPositionPx = parsePercentage(stackPosition, containerHeight);
    const totalCards = cardsRef.current.length;

    const endElement = innerRef.current
      ? (innerRef.current.querySelector('.scroll-stack-end') as HTMLElement)
      : null;

    const endElementTop = endElement
      ? endElement.getBoundingClientRect().top + window.scrollY
      : 0;

    cardsRef.current.forEach((card, i) => {
      if (!card) return;

      const cardTop = initialTopsRef.current[i] || 0;
      const nextCardTop = i < totalCards - 1 ? initialTopsRef.current[i + 1] : endElementTop;

      const pinStart = cardTop - stackPositionPx;
      const pinEnd = nextCardTop - stackPositionPx;
      const transitionZone = Math.min(180, (nextCardTop - cardTop) * 0.45);

      let translateY = 0;
      let scale = 1;
      let opacity = 1;

      if (scrollTop < pinStart) {
        // Card is approaching from below
        const approachProgress = Math.max(0, Math.min(1, (scrollTop - (pinStart - 160)) / 160));
        translateY = 0;
        scale = 0.98 + 0.02 * approachProgress;
        opacity = 0.85 + 0.15 * approachProgress;
      } else if (scrollTop >= pinStart && scrollTop < pinEnd - transitionZone) {
        // Card is in active pinned spotlight
        translateY = scrollTop - cardTop + stackPositionPx;
        scale = 1;
        opacity = 1;
      } else if (scrollTop >= pinEnd - transitionZone && scrollTop < pinEnd) {
        // Card is smoothly transitioning out as next card arrives
        const exitProgress = (scrollTop - (pinEnd - transitionZone)) / transitionZone;
        translateY = scrollTop - cardTop + stackPositionPx - exitProgress * 45;
        scale = 1 - exitProgress * 0.03;
        opacity = 1 - exitProgress * 0.95;
      } else {
        // Card has exited
        translateY = pinEnd - cardTop + stackPositionPx - 45;
        scale = 0.97;
        opacity = 0;
      }

      // If it's the last card, let it remain pinned until the end of the section
      if (i === totalCards - 1) {
        const lastPinEnd = endElementTop - containerHeight * 0.6;
        if (scrollTop >= pinStart && scrollTop <= lastPinEnd) {
          translateY = scrollTop - cardTop + stackPositionPx;
          scale = 1;
          opacity = 1;
        } else if (scrollTop > lastPinEnd) {
          translateY = lastPinEnd - cardTop + stackPositionPx;
          scale = 1;
          opacity = 1;
        }
      }

      const newTransform = {
        translateY: Math.round(translateY * 10) / 10,
        scale: Math.round(scale * 1000) / 1000,
        opacity: Math.round(opacity * 100) / 100,
      };

      const lastTransform = lastTransformsRef.current.get(i);
      const hasChanged =
        !lastTransform ||
        Math.abs(lastTransform.translateY - newTransform.translateY) > 0.1 ||
        Math.abs(lastTransform.scale - newTransform.scale) > 0.001 ||
        Math.abs(lastTransform.opacity - newTransform.opacity) > 0.01;

      if (hasChanged) {
        card.style.transform = `translate3d(0, ${newTransform.translateY}px, 0) scale(${newTransform.scale})`;
        card.style.opacity = `${newTransform.opacity}`;
        card.style.pointerEvents = newTransform.opacity < 0.2 ? 'none' : 'auto';
        lastTransformsRef.current.set(i, newTransform);
      }
    });

    isUpdatingRef.current = false;
  }, [
    isMobile,
    stackPosition,
    parsePercentage,
    getScrollData,
  ]);

  const handleScroll = useCallback(() => {
    updateCardTransforms();
  }, [updateCardTransforms]);

  const setupLenis = useCallback(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenis.on('scroll', handleScroll);

    const raf = (time: number) => {
      lenis.raf(time);
      animationFrameRef.current = requestAnimationFrame(raf);
    };
    animationFrameRef.current = requestAnimationFrame(raf);

    lenisRef.current = lenis;
    return lenis;
  }, [handleScroll]);

  useLayoutEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;

    const cards = Array.from(
      inner.querySelectorAll(':scope > .scroll-stack-card')
    ) as HTMLElement[];

    cardsRef.current = cards;

    initialTopsRef.current = cards.map((card) => {
      const rect = card.getBoundingClientRect();
      return rect.top + window.scrollY;
    });

    cards.forEach((card, i) => {
      card.style.zIndex = `${i + 1}`;
      if (i < cards.length - 1) {
        card.style.marginBottom = `${itemDistance}px`;
      }
      card.style.willChange = 'transform, opacity';
      card.style.transformOrigin = 'top center';
      card.style.backfaceVisibility = 'hidden';
    });

    setupLenis();
    updateCardTransforms();

    const handleResize = () => {
      if (!innerRef.current) return;
      initialTopsRef.current = cards.map((card) => {
        const rect = card.getBoundingClientRect();
        return rect.top + window.scrollY;
      });
      updateCardTransforms();
    };

    window.addEventListener('resize', handleResize);

    const lastTransforms = lastTransformsRef.current;

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      window.removeEventListener('resize', handleResize);
      cardsRef.current = [];
      initialTopsRef.current = [];
      lastTransforms.clear();
      isUpdatingRef.current = false;
    };
  }, [itemDistance, isMobile, setupLenis, updateCardTransforms]);

  return (
    <div className={`scroll-stack-scroller ${className}`.trim()} ref={scrollerRef}>
      <div className="scroll-stack-inner" ref={innerRef}>
        {children}
        <div className="scroll-stack-end" />
      </div>
    </div>
  );
};

export default ScrollStack;
