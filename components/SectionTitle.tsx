import type { ReactNode } from "react";

export function SectionTitle({
  eyebrow,
  title,
  children
}: {
  eyebrow?: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-4xl">{title}</h2>
      {children && <p className="mt-4 leading-7 text-zinc-500">{children}</p>}
    </div>
  );
}
