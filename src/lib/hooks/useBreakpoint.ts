import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import React from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { isBrowser } from "../utils";

const config = resolveConfig(tailwindConfig);

const screens = config.theme?.screens;

export function useBreakpoint(breakpoint: string) {
  const size = (screens as any)[breakpoint];

  const [match, setMatch] = React.useState(
    isBrowser ? window.matchMedia(`(min-width: ${size})`).matches : false,
  );

  useIsomorphicLayoutEffect(() => {
    const matcher = window.matchMedia(`(min-width: ${size})`);

    function onMatch(evt: MediaQueryListEvent) {
      setMatch(evt.matches);
    }

    matcher.addEventListener("change", onMatch);
    setMatch(window.matchMedia(`(min-width: ${size})`).matches);

    return () => {
      matcher.removeEventListener("change", onMatch);
    };
  }, [size]);

  return match;
}
