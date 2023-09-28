import { useEffect, useRef, useState, useMemo, CSSProperties } from "react";
import styles from "./Illustration.module.css";
import { cn } from "@/lib/utils";
import { useScroll } from "framer-motion";

import "external-svg-loader";

const ANIMATION_DURATION = 0.3;
const BASE_FREQUENCY = 0.028;
const OCTAVES = 4;
const SCALE = 4;

export const Illustration = ({
  children = <></>,
  animate = true,
  entryOffset = 0.5,
  leaveOffset = 0.8,
  width,
  height,
  svgImageUrl,
}: {
  children?: React.ReactNode;
  animate?: boolean;
  entryOffset?: number;
  leaveOffset?: number;
  width: number;
  height: number;
  svgImageUrl?: string;
}) => {
  const [path, setPath] = useState<string>();
  const [ready, setReady] = useState(false);
  const [pathLength, setPathLength] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const filters = useMemo(
    () =>
      Array(6)
        .fill(null)
        .map(
          (_, i) => `
    <filter id="displacementFilter${i}">
      <feTurbulence
        type="turbulence"
        baseFrequency="${BASE_FREQUENCY}"
        numOctaves="${OCTAVES}"
        result="turbulence"
        seed="${i}"
      />
      <feDisplacementMap
        in2="turbulence"
        in="SourceGraphic"
        scale="${SCALE}"
        xChannelSelector="R"
        yChannelSelector="G"
      />
    </filter>
  `,
        )
        .join("\n"),
    [],
  );

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${entryOffset} end`, `end ${leaveOffset}`],
  });

  useEffect(() => {
    const unmount = scrollYProgress.on("change", (value) =>
      setPathLength(value),
    );
    return () => {
      unmount();
    };
  }, [scrollYProgress]);

  useEffect(() => {
    if (ref?.current) {
      const init = async () => {
        if (svgImageUrl) {
          const svg = ref.current?.querySelector("svg");
          if (!svg) {
            return;
          }
          if (!ref.current?.querySelector("path")) {
            await new Promise((resolve) => {
              svg.addEventListener("iconload", resolve);
            });
          }
        }
        let path = ref.current?.querySelector("path");
        if (path) {
          path.setAttribute("pathLength", "1");
          setPath(path.outerHTML);
        }
      };
      init();
    }
  }, [ref, children, svgImageUrl]);

  useEffect(() => {
    setReady(true);
  }, []);

  if (animate && path) {
    return (
      <div ref={ref}>
        <svg
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          className={cn(styles.Illustration, "max-w-full")}
          style={
            {
              "--pathLength": pathLength,
              "--animate": animate ? 1 : 0,
              "--duration": `${ANIMATION_DURATION}s`,
            } as CSSProperties
          }
          dangerouslySetInnerHTML={{ __html: path + filters }}
        ></svg>
      </div>
    );
  }
  return (
    <div ref={ref}>
      {svgImageUrl ? (
        <>
          {ready && (
            <svg
              className="max-w-full"
              data-src={svgImageUrl}
              fill="currentColor"
            />
          )}
        </>
      ) : (
        children
      )}
    </div>
  );
};

Illustration.displayName = "Illustration";

export default Illustration;
