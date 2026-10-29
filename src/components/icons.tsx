// Small line icons. Icons with "draw" draw themselves when they scroll into view (see lib/motion.ts).
import { Children, cloneElement, Fragment, isValidElement, type CSSProperties, type ReactElement, type ReactNode } from "react";

// for "draw" icons: give every shape pathLength=1 and its order (--d), so the stroke can draw in one shape after another
function drawable(children: ReactNode): ReactNode[] {
  const shapes: ReactNode[] = [];
  const walk = (nodes: ReactNode) =>
    Children.forEach(nodes, (child) => {
      if (!isValidElement(child)) return;
      if (child.type === Fragment) return walk((child as ReactElement<{ children?: ReactNode }>).props.children);
      const i = shapes.length;
      shapes.push(cloneElement(child as ReactElement<{ pathLength?: number; style?: CSSProperties }>, { key: i, pathLength: 1, style: { "--d": i } as CSSProperties }));
    });
  walk(children);
  return shapes;
}

export function Icon({ children, className = "size-6", draw = false, strokeWidth = 1.6, style }: { children: ReactNode; className?: string; draw?: boolean; strokeWidth?: number; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style} className={`${draw ? "draw" : ""} ${className}`}>
      {draw ? drawable(children) : children}
    </svg>
  );
}

export const ArrowRight = ({ className = "size-4" }: { className?: string }) => (
  <Icon className={`${className} transition-transform group-hover:translate-x-0.5`} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Icon>
);

/** "Explore the Platform →" style text link */
export const linkArrow = "cta-soft group -mx-3 -my-1.5 inline-flex items-center rounded-full px-3 py-1.5 gap-1.5 text-[0.9375rem] font-semibold text-accent no-underline hover:text-accent-hover";

/** list item with a check mark */
export function Tick({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <li className={`relative pl-7 leading-normal text-body ${className}`} style={style}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="absolute top-[0.2em] left-0 size-[1.125rem] text-accent">
        <path d="M5 12l5 5 9-10" />
      </svg>
      {children}
    </li>
  );
}
