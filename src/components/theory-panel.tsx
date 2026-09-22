import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Formula } from "@/components/formula";
import { GAMMA_FROM_TWO_SQRT_3, GAMMA_MEISSNER, TWO_SQRT_3 } from "@/lib/physics";

export function TheoryPanel() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardTitle>EPRL vertex amplitude</CardTitle>
        <CardHint>Large-j stationary phase around a Regge saddle.</CardHint>
        <div className="mt-4">
          <Formula tex={`A_v \\approx \\frac{(2\\pi)^{6}}{\\sqrt{|\\det H|}}\\,\\exp\\bigl(i S_{\\mathrm{Regge}}(\\beta)\\bigr)`} />
        </div>
      </Card>

      <Card>
        <CardTitle>Barrett–Crane (comparison)</CardTitle>
        <CardHint>Strong simplicity constraints. Poor 4d semi-classical limit.</CardHint>
        <div className="mt-4">
          <Formula tex={`A_v^{\\mathrm{BC}} = \\int dg \\prod_f (2j_f+1)\\,\\chi_{j_f}(g_f)`} />
        </div>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          EPRL imposes simplicity weakly with SU(2) coherent states and recovers
          Regge calculus. Barrett–Crane over-constrains the intertwiner.
        </p>
      </Card>

      <Card>
        <CardTitle>Black-hole entropy</CardTitle>
        <CardHint>
          Microstate counting on an isolated horizon. 2√3 ≈ {TWO_SQRT_3.toFixed(4)}.
          ln(2√3)/π ≈ {GAMMA_FROM_TWO_SQRT_3.toFixed(4)}. Lab default γ = {GAMMA_MEISSNER.toFixed(4)}.
        </CardHint>
        <div className="mt-4">
          <Formula tex={`S = \\frac{A}{4\\ell_P^{2}} \\quad \\text{when } \\gamma = \\gamma_\\star`} />
        </div>
        <div className="mt-2">
          <Formula tex={`\\frac{\\rho_c}{\\rho_{\\mathrm{Pl}}} = \\frac{\\sqrt{3}}{32\\pi^{2}\\gamma^{3}}`} />
        </div>
      </Card>

      <Card>
        <CardTitle>Face area</CardTitle>
        <div className="mt-4">
          <Formula tex={`A_f = 8\\pi\\gamma\\ell_P^{2}\\sqrt{j_f(j_f+1)}`} />
        </div>
      </Card>
    </div>
  );
}
