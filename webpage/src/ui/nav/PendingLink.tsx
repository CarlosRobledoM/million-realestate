"use client";
import { useRouter } from "next/navigation";
import { useState, ReactNode, MouseEvent } from "react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  onPendingChange?: (v: boolean) => void;
};

export function PendingLink({
  href,
  children,
  className,
  onPendingChange,
}: Props) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setPending(true);
    onPendingChange?.(true);
    router.push(href);
  }

  return (
    <a
      href={href}
      onClick={onClick}
      className={className}
      aria-busy={pending}
      aria-disabled={pending}
    >
      {children}
    </a>
  );
}
