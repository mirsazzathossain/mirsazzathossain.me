import clsx from "clsx";
import { forwardRef } from "react";

const OuterContainer = forwardRef(function OuterContainer(
  { className, children, ...props }: { className?: string; [key: string]: any },
  ref
): JSX.Element {
  return (
    <div ref={ref as any} className={clsx("sm:px-8", className)} {...props}>
      <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
    </div>
  );
});

const InnerContainer = forwardRef(function InnerContainer(
  { className, children, ...props }: { className?: string; [key: string]: any },
  ref
): JSX.Element {
  return (
    <div
      ref={ref as any}
      className={clsx("relative px-4 sm:px-8 lg:px-12", className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
});

export const Container = forwardRef(function Container(
  { children, ...props }: { children: React.ReactNode; [key: string]: any },
  ref
): JSX.Element {
  return (
    <OuterContainer ref={ref} {...props}>
      <InnerContainer>{children}</InnerContainer>
    </OuterContainer>
  );
});

(Container as any).Outer = OuterContainer;
(Container as any).Inner = InnerContainer;
