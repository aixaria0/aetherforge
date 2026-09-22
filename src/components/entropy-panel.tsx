import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Formula } from "@/components/formula";
import { GAMMA_MEISSNER, rhoCOverPlanck } from "@/lib/physics";
import { useLab } from "@/lib/store";

export function EntropyPanel() {
  const gamma = useLab((s) => s.gamma);
  const ratio = GAMMA_MEISSNER / gamma;
  const rhoC = rhoCOverPlanck(gamma);

  return (
    <Card>
      <CardTitle>Horizon matching</CardTitle>
      <CardHint>
        Bekenstein–Hawking S = A/4ℓ_P² is recovered when γ sits at the counting
        value. Off that point, S_LQG / S_BH ≈ γ_★ / γ.
      </CardHint>
      <div className="mt-5">
        <Formula tex={`S_{\\mathrm{LQG}}/S_{\\mathrm{BH}} \\approx ${ratio.toFixed(3)}`} />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-md bg-elevated px-3 py-3">
          <div className="text-[10px] uppercase tracking-wider text-subtle">γ</div>
          <div className="mt-1 font-mono tabular-nums">{gamma.toFixed(4)}</div>
        </div>
        <div className="rounded-md bg-elevated px-3 py-3">
          <div className="text-[10px] uppercase tracking-wider text-subtle">ρ_c / ρ_Pl</div>
          <div className="mt-1 font-mono tabular-nums">{rhoC.toFixed(3)}</div>
        </div>
      </div>
    </Card>
  );
}
