import type { ReactNode } from "react";

export function PolicyPage({ title, children }: { title?: ReactNode; children: ReactNode }) {
  return (
    <main className="container-page py-12 sm:py-16">
      <article className="surface mx-auto max-w-3xl p-8 md:p-10">
        {title && <h1 className="text-3xl font-black">{title}</h1>}
        {children}
      </article>
    </main>
  );
}
