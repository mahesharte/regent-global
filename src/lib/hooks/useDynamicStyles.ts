import { useRef, useEffect, type RefObject } from "react";
import clsx from "clsx";

export type DynamicStyles = {
  [className: string]: [property: string, value: string];
};
export type Props<T> = {
  className: string;
  ref: RefObject<T>;
};

/**
 * Allows the usage of dynamic styles by injecting CSS variables
 * By using CSS variables, we can apply them through TailwindCSS making them also responsive-compatible
 */
const useDynamicStyles = <T = HTMLElement>(styles: DynamicStyles): Props<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref?.current) {
      return;
    }
    const element = ref.current as unknown as HTMLElement;
    const properties: string[] = [];
    Object.values(styles).forEach(([property, value]) => {
      properties.push(property);
      element.style.setProperty(property, value);
    });
    return () => {
      // Cleanup CSS variables
      properties.forEach((property) => {
        element.style.removeProperty(property);
      });
    };
  }, [ref, styles]);

  return {
    className: clsx(Object.keys(styles)),
    ref,
  };
};

export default useDynamicStyles;
