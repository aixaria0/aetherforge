import type { ReactNode } from "react";

export type ModelClass = "DERIVED" | "APPROXIMATION" | "SYNTHETIC" | "REFERENCE" | "INTERACTIVE";

const tone: Record<ModelClass, string> = {
  DERIVED: "border-emerald-300/25 bg-emerald-300/8 text-emerald-200",
  APPROXIMATION: "border-amber-300/25 bg-amber-300/8 text-amber-200",
  SYNTHETIC: "border-rose-300/25 bg-rose-300/8 text-rose-200",
  REFERENCE: "border-sky-300/25 bg-sky-300/8 text-sky-200",
  INTERACTIVE: "border-violet-300/25 bg-violet-300/8 text-violet-200",
};

export function ModelBadge({ kind }: { kind: ModelClass }) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-1 font-mono text-[9px] font-semibold tracking-[0.14em] ${tone[kind]}`}>
      {kind}
    </span>
  );
}

export function BoundaryNote({ kind, children }: { kind: ModelClass; children: ReactNode }) {
  return (
    <div className="mt-4 flex items-start gap-2 border-t border-border pt-3 text-[11px] leading-relaxed text-subtle">
      <ModelBadge kind={kind} />
      <p className="min-w-0 flex-1">{children}</p>
    </div>
  );
}
