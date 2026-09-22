import katex from "katex";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function Formula({
  tex,
  display = true,
  className,
}: {
  tex: string;
  display?: boolean;
  className?: string;
}) {
  const html = useMemo(
    () => katex.renderToString(tex, { displayMode: display, throwOnError: false }),
    [tex, display],
  );
  return (
    <div
      className={cn("katex-wrap", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
