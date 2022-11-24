import clsx from "clsx";
import Image from "next/legacy/image";
import Link from "next/link";

function Avatar({
  image,
  link,
  classNames,
}: {
  image: {
    src: string;
    alt: string;
    height: number;
    width: number;
    sizes: string;
    priority?: boolean;
  };
  link: {
    href: string;
    title?: string;
  };
  classNames?: {
    link?: string;
    image?: string;
  };
}): JSX.Element {
  return (
    <Link
      className={clsx(classNames?.link, "pointer-events-auto")}
      href={link.href}
    >
      <Image
        src={image.src}
        alt={image.alt}
        height={image.height}
        width={image.width}
        sizes={image.sizes}
        className={clsx(
          "rounded-full bg-zinc-100 object-cover dark:bg-zinc-800",
          classNames?.image
        )}
        decoding="async"
        priority={image.priority}
      />
    </Link>
  );
}

export default function HeaderAvatar({
  image,
  link,
  classNames,
}: {
  image: {
    src: string;
    alt: string;
    height: number;
    width: number;
    sizes: string;
    priority: boolean;
  };
  link: {
    href: string;
    title?: string;
  };
  classNames?: {
    container?: string;
    image?: string;
    link?: string;
  };
}): JSX.Element {
  return (
    <div
      className={clsx(
        classNames?.container,
        "h-10 w-10 rounded-full bg-white/90 p-0.5 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:ring-white/10"
      )}
    >
      <Avatar image={image} link={link} classNames={classNames} />
    </div>
  );
}
