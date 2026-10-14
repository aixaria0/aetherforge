import { Formula } from "@/components/formula";
import { BoundaryNote, ModelBadge } from "@/components/model-boundary";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { GAMMA_MEISSNER, rhoCOverPlanck } from "@/lib/physics";
import { useLab } from "@/lib/store";

export function EntropyPanel() {
  const gamma = useLab((s) => s.gamma);
  const ratio = GAMMA_MEISSNER / gamma;
  const rhoC = rhoCOverPlanck(gamma);

  return (
    <Card>
      <div className="flex items-center justify-between gap-3"><CardTitle>Horizon-counting proxy</CardTitle><ModelBadge kind="APPROXIMATION" /></div>
      <CardHint>A sensitivity view using γ★ / γ, with γ★ fixed to the Meissner counting value.</CardHint>
      <div className="mt-5"><Formula tex={`S_{\\mathrm{proxy}}/S_{BH} = ${ratio.toFixed(3)}`} /></div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-elevated px-3 py-3"><div className="text-[10px] uppercase tracking-wider text-subtle">γ</div><div className="mt-1 font-mono tabular-nums">{gamma.toFixed(4)}</div></div>
        <div className="rounded-md bg-elevated px-3 py-3"><div className="text-[10px] uppercase tracking-wider text-subtle">ρ_c / ρ_Pl</div><div className="mt-1 font-mono tabular-nums">{rhoC.toFixed(3)}</div></div>
      </div>
      <BoundaryNote kind="APPROXIMATION">A sensitivity proxy, not an independent microstate-counting calculation.</BoundaryNote>
    </Card>
  );
}
