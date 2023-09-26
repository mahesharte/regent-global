import { useEffect, useRef, useState, useMemo } from "react";
import styles from "./Illustration.module.css";
import { cn } from "@/lib/utils";
import { useScroll } from "framer-motion";

const ANIMATION_DURATION = 0.3;
const BASE_FREQUENCY = 0.028;
const OCTAVES = 4;
const SCALE = 4;

const Illustration = ({
  children,
  animate = true,
  entryOffset = 0.5,
  leaveOffset = 0.8,
  width,
  height,
}: {
  children: React.ReactNode;
  animate?: boolean;
  entryOffset?: number;
  leaveOffset?: number;
  width: number;
  height: number;
}) => {
  const [path, setPath] = useState<string>();
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
  }, []);

  useEffect(() => {
    if (ref?.current) {
      let path = ref.current.querySelector<HTMLElement>("path");
      if (path) {
        path.setAttribute("pathLength", "1");
        setPath(path.outerHTML);
      }
    }
  }, [ref, children]);

  if (path)
    return (
      <div ref={ref}>
        <svg
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
          className={cn(styles.Illustration)}
          style={
            {
              "--pathLength": pathLength,
              "--animate": animate ? 1 : 0,
              "--duration": `${ANIMATION_DURATION}s`,
            } as any
          }
          dangerouslySetInnerHTML={{ __html: path + filters }}
        ></svg>
      </div>
    );

  return <div ref={ref}>{children}</div>;
};

Illustration.displayName = "Illustration";

export { Illustration };
