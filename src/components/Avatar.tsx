import { cn } from "@/lib/cn";

type Props = {
  large?: boolean;
  className?: string;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export default function Avatar({
  large = false,
  className,
  ...props
}: Props): JSX.Element {
  return (
    <a
      href="/"
      aria-label="Home"
      className={cn(className, "pointer-events-auto block rounded-full")}
      {...props}
    >
      <img
        src="/images/user.png"
        alt=""
        width={large ? 64 : 36}
        height={large ? 64 : 36}
        className={cn(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800 w-full h-full",
        )}
        fetchPriority={large ? "high" : "auto"}
      />
    </a>
  );
}
