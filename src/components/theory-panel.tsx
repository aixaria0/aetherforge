import { Formula } from "@/components/formula";
import { BoundaryNote, ModelBadge } from "@/components/model-boundary";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { GAMMA_FROM_TWO_SQRT_3, GAMMA_MEISSNER, TWO_SQRT_3 } from "@/lib/physics";

export function TheoryPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <div className="flex items-center justify-between gap-3"><CardTitle>EPRL asymptotic form</CardTitle><ModelBadge kind="REFERENCE" /></div>
        <CardHint>Reference stationary-phase structure around a Regge saddle.</CardHint>
        <div className="mt-4"><Formula tex={`A_v \\sim \\frac{(2\\pi)^{6}}{\\sqrt{|\\det H|}}\\,\\exp\\bigl(i S_{\\mathrm{Regge}}\\bigr)`} /></div>
        <BoundaryNote kind="REFERENCE">Displayed for context. AetherForge does not evaluate the full vertex amplitude or derive H from boundary data.</BoundaryNote>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3"><CardTitle>Barrett–Crane comparison</CardTitle><ModelBadge kind="REFERENCE" /></div>
        <CardHint>Historical comparison point for simplicity constraints.</CardHint>
        <div className="mt-4"><Formula tex={`A_v^{\\mathrm{BC}} = \\int dg \\prod_f (2j_f+1)\\,\\chi_{j_f}(g_f)`} /></div>
        <p className="mt-3 text-xs leading-relaxed text-muted">EPRL weakens the implementation of simplicity constraints relative to Barrett–Crane and was developed to improve the desired 4D semiclassical behavior.</p>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3"><CardTitle>Horizon counting</CardTitle><ModelBadge kind="REFERENCE" /></div>
        <CardHint>Counting prescriptions are not unique. 2√3 ≈ {TWO_SQRT_3.toFixed(4)}; ln(2√3)/π ≈ {GAMMA_FROM_TWO_SQRT_3.toFixed(4)}; default γ = {GAMMA_MEISSNER.toFixed(4)}.</CardHint>
        <div className="mt-4"><Formula tex={`S_{BH} = \\frac{A}{4\\ell_P^{2}}`} /></div>
        <div className="mt-2"><Formula tex={`\\frac{\\rho_c}{\\rho_{\\mathrm{Pl}}} = \\frac{\\sqrt{3}}{32\\pi^{2}\\gamma^{3}}`} /></div>
        <BoundaryNote kind="REFERENCE">The Immirzi value depends on the state-counting prescription; no unique value is asserted by this UI.</BoundaryNote>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-3"><CardTitle>Face area</CardTitle><ModelBadge kind="DERIVED" /></div>
        <div className="mt-4"><Formula tex={`A_f = 8\\pi\\gamma\\ell_P^{2}\\sqrt{j_f(j_f+1)}`} /></div>
        <BoundaryNote kind="DERIVED">When a face area is shown, it is a direct numerical evaluation of this stated expression in Planck-area units.</BoundaryNote>
      </Card>
    </div>
  );
}
