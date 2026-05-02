import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Reveal({ children, className, delay = 0, y = 40, as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const anim = gsap.fromTo(
      el,
      { y, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        delay,
        scrollTrigger: { trigger: el, start: "top 85%" },
      },
    );
    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, [delay, y]);

  const Tag = as as keyof React.JSX.IntrinsicElements;
  // @ts-expect-error dynamic tag
  return <Tag ref={ref} className={className}>{children}</Tag>;
}