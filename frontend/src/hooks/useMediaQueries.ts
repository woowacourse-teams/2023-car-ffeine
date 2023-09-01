import { useEffect, useMemo, useState } from 'react';

import { MOBILE_BREAKPOINT } from '@constants';

type ScreenBreakpoint = 'mobile';

type ScreenKey = `is${Capitalize<ScreenBreakpoint>}`;
type Screen = Map<ScreenKey, MediaQueryList>;

/**
 * @example screen.get('isMobile') ? '100%' : '32rem';
 */
const useMediaQueries = () => {
  const mediaQueries = useMemo<Screen>(() => {
    return new Map([['isMobile', window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`)]]);
  }, []);

  const [screen, setScreen] = useState(
    new Map([...mediaQueries].map(([key, mediaQuery]) => [key, mediaQuery.matches]))
  );

  useEffect(() => {
    const cleanHandlers = [...mediaQueries].map(([key, mediaQuery]) => {
      const handleMediaQueryChange = ({ matches }: MediaQueryListEvent) => {
        setScreen((screen) => new Map(screen).set(key, matches));
      };

      mediaQuery.addEventListener('change', handleMediaQueryChange);

      return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
    });

    return () => cleanHandlers.forEach((cleanHandler) => cleanHandler());
  }, []);

  return screen;
};

export default useMediaQueries;
