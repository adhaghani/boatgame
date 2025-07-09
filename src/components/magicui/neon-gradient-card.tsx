"use client";

import {
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";
import { useGameState } from "@/context/gameStateContext";

interface NeonColorsProps {
  firstColor: string;
  secondColor: string;
}

interface NeonGradientCardProps {
  /**
   * @default <div />
   * @type ReactElement
   * @description
   * The component to be rendered as the card
   * */
  as?: ReactElement;
  /**
   * @default ""
   * @type string
   * @description
   * The className of the card
   */
  className?: string;

  /**
   * @default ""
   * @type ReactNode
   * @description
   * The children of the card
   * */
  children?: ReactNode;

  /**
   * @default 5
   * @type number
   * @description
   * The size of the border in pixels
   * */
  borderSize?: number;

  /**
   * @default 20
   * @type number
   * @description
   * The size of the radius in pixels
   * */
  borderRadius?: number;

  /**
   * @default "{ firstColor: '#ff00aa', secondColor: '#00FFF1' }"
   * @type string
   * @description
   * The colors of the neon gradient
   * */
  neonColors?: NeonColorsProps;

  [key: string]: any;
}

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 2,
  borderRadius = 20,
  neonColors = {
    firstColor: "#ff00aa",
    secondColor: "#00FFF1",
  },
  ...props
}) => {
  const { gameState } = useGameState();
  const visualMode = gameState?.visualMode || "visual";
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { offsetWidth, offsetHeight } = containerRef.current;
        setDimensions({ width: offsetWidth, height: offsetHeight });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [children]);

  return (
    <div
      ref={containerRef}
      style={
        visualMode === "performance"
          ? ({ borderRadius: `${borderRadius}px` } as CSSProperties)
          : ({
              // @ts-ignore
              "--border-size": `${borderSize}px`,
              // @ts-ignore
              "--border-radius": `${borderRadius}px`,
              // @ts-ignore
              "--neon-first-color": neonColors.firstColor,
              // @ts-ignore
              "--neon-second-color": neonColors.secondColor,
              // @ts-ignore
              "--card-width": `${dimensions.width}px`,
              // @ts-ignore
              "--card-height": `${dimensions.height}px`,
              // @ts-ignore
              "--card-content-radius": `${borderRadius - borderSize}px`,
              // @ts-ignore
              "--pseudo-element-background-image": `linear-gradient(0deg, ${neonColors.firstColor}, ${neonColors.secondColor})`,
              // @ts-ignore
              "--pseudo-element-width": `${
                dimensions.width + borderSize * 2
              }px`,
              // @ts-ignore
              "--pseudo-element-height": `${
                dimensions.height + borderSize * 2
              }px`,
              // @ts-ignore
              "--after-blur": `${dimensions.width / 3}px`,
            } as CSSProperties)
      }
      className={cn(
        visualMode === "performance"
          ? "relative z-10 size-full bg-gray-100 p-6 dark:bg-neutral-900"
          : "relative z-10 size-full rounded-[var(--border-radius)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          visualMode === "performance"
            ? "relative size-full min-h-[inherit] bg-gray-100 p-6 dark:bg-neutral-900 rounded"
            : "relative size-full min-h-[inherit] rounded-[var(--card-content-radius)] bg-gray-100 p-6 before:absolute before:-left-[var(--border-size)] before:-top-[var(--border-size)] before:-z-10 before:block before:h-[var(--pseudo-element-height)] before:w-[var(--pseudo-element-width)] before:rounded-[var(--border-radius)] before:content-[''] before:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] before:bg-[length:100%_200%] before:animate-background-position-spin after:absolute after:-left-[var(--border-size)] after:-top-[var(--border-size)] after:-z-10 after:block after:h-[var(--pseudo-element-height)] after:w-[var(--pseudo-element-width)] after:rounded-[var(--border-radius)] after:blur-[var(--after-blur)] after:content-[''] after:bg-[linear-gradient(0deg,var(--neon-first-color),var(--neon-second-color))] after:bg-[length:100%_200%] after:opacity-80 after:animate-background-position-spin dark:bg-neutral-900"
        )}
      >
        {children}
      </div>
    </div>
  );
};
