import { ActionLandscape } from "@/components/action-landscape";
import { BounceChart } from "@/components/bounce-chart";
import { ControlsPanel } from "@/components/controls-panel";
import { EntropyPanel } from "@/components/entropy-panel";
import { GwChart } from "@/components/gw-chart";
import { HessianChart } from "@/components/hessian-chart";
import { BoundaryNote, ModelBadge } from "@/components/model-boundary";
import { ParticleField } from "@/components/particle-field";
import { SpinNetwork } from "@/components/spin-network";
import { TheoryPanel } from "@/components/theory-panel";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rhoCOverPlanck } from "@/lib/physics";
import { useLab } from "@/lib/store";
import type { GwEventId } from "@/lib/waveforms";
import { Atom, FlaskConical, ShieldCheck } from "lucide-react";

const CONTRACT = [
  ["DERIVED", "Direct evaluation of the stated algebraic expression in this codebase."],
  ["APPROXIMATION", "Reduced surrogate or analytic ansatz; not a full numerical LQG solver."],
  ["SYNTHETIC", "Generated illustrative data; not experimental or observatory measurements."],
  ["REFERENCE", "Equation or literature context shown without claiming independent verification."],
] as const;

export function ForgeShell() {
  const { gamma, jMean, freqHz, amp, gwEvent, overlayEvent } = useLab();
  const rhoC = rhoCOverPlanck(gamma);

  return (
    <div className="relative min-h-dvh overflow-x-hidden">
      <ParticleField />
      <header className="sticky top-0 z-20 border-b border-border bg-bg/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md border border-border bg-elevated">
              <Atom className="size-4 text-accent" aria-hidden />
            </span>
            <div>
              <div className="text-sm font-semibold tracking-tight">AetherForge</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                evidence-bounded LQG laboratory
              </div>
            </div>
          </div>
          <div className="hidden items-center gap-3 sm:flex">
            <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              <ShieldCheck className="size-3.5 text-emerald-200" /> boundaries explicit
            </span>
            <span className="font-mono text-xs tabular-nums text-muted">
              γ {gamma.toFixed(4)} · ρ_c {rhoC.toFixed(3)} ρ_Pl
            </span>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-16 pt-8 md:px-6 md:pt-12">
        <section className="mb-8 grid gap-8 border-b border-border pb-10 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.17em] text-accent">
              <FlaskConical className="size-3.5" /> interactive research model
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[0.98] tracking-[-0.045em] sm:text-5xl md:text-6xl">
              Loop quantum gravity,<br />with the boundary left visible.
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-7 text-muted md:text-base">
              Explore Immirzi-parameter sensitivity, a reduced EPRL-inspired action surface,
              synthetic Hessian scaling, an effective LQC bounce profile, isolated-horizon
              counting, spin-network geometry, and synthetic gravitational-wave traces.
              Every surface states what it is—and what it is not.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <StatBox label="γ / IMMIRZI" value={gamma.toFixed(4)} />
            <StatBox label="MEAN SPIN j" value={jMean.toFixed(0)} />
            <StatBox label="ρc / ρPl" value={rhoC.toFixed(3)} />
            <StatBox label="MODE" value="LOCAL" />
          </div>
        </section>

        <section className="mb-8 rounded-xl border border-border bg-surface/85 p-5 md:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-accent">MODEL CONTRACT</p>
              <h2 className="mt-1 text-lg font-medium tracking-tight">No visualization silently becomes a physics claim.</h2>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-[0.13em] text-subtle">AETHERFORGE / MODEL V1</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {CONTRACT.map(([kind, text]) => (
              <div key={kind} className="rounded-lg border border-border bg-elevated/70 p-4">
                <ModelBadge kind={kind} />
                <p className="mt-3 text-xs leading-5 text-muted">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-border pt-4 text-xs leading-6 text-subtle">
            Not claimed: full EPRL vertex evaluation, computed gauge-fixed Hessian from boundary data,
            numerical APS evolution, detector-calibrated gravitational-wave strain, formal proof, or empirical validation.
          </p>
        </section>

        <div className="hidden gap-6 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-3"><ControlsPanel /></div>
          <div className="flex flex-col gap-4 lg:col-span-6">
            <ChartCards gamma={gamma} jMean={jMean} rhoC={rhoC} freqHz={freqHz} amp={amp} gwEvent={gwEvent} overlayEvent={overlayEvent} />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-3">
            <TheoryPanel />
            <Card>
              <div className="flex items-center justify-between gap-3"><CardTitle>Spin network</CardTitle><ModelBadge kind="INTERACTIVE" /></div>
              <CardHint>4-valent diagram. Drag the intertwiner or punctures; topology is illustrative.</CardHint>
              <div className="mt-4"><SpinNetwork /></div>
              <BoundaryNote kind="INTERACTIVE">Diagram geometry is user-controlled and is not a solved quantum state or numerical spin-network evolution.</BoundaryNote>
            </Card>
            <EntropyPanel />
          </div>
        </div>

        <div className="lg:hidden">
          <Tabs defaultValue="lab">
            <TabsList className="mb-4 w-full">
              <TabsTrigger value="lab">Lab</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
              <TabsTrigger value="theory">Theory</TabsTrigger>
            </TabsList>
            <TabsContent value="lab" className="space-y-4">
              <ControlsPanel />
              <ChartCards gamma={gamma} jMean={jMean} rhoC={rhoC} freqHz={freqHz} amp={amp} gwEvent={gwEvent} overlayEvent={overlayEvent} />
            </TabsContent>
            <TabsContent value="network" className="space-y-4">
              <Card>
                <div className="flex items-center justify-between gap-3"><CardTitle>Spin network</CardTitle><ModelBadge kind="INTERACTIVE" /></div>
                <CardHint>Drag the central intertwiner or the four punctures.</CardHint>
                <SpinNetwork />
                <BoundaryNote kind="INTERACTIVE">Illustrative diagram only; no quantum-state solver runs behind the drag interaction.</BoundaryNote>
              </Card>
              <EntropyPanel />
            </TabsContent>
            <TabsContent value="theory"><TheoryPanel /></TabsContent>
          </Tabs>
        </div>

        <section className="mt-10 grid gap-4 border-t border-border pt-8 md:grid-cols-3">
          <Reference title="Spin foams / EPRL" body="Engle–Pereira–Rovelli–Livine: weak simplicity constraints and large-spin asymptotics motivate the displayed reference surface." />
          <Reference title="Loop quantum cosmology" body="Ashtekar–Pawłowski–Singh effective dynamics motivates the critical-density reference and bounce interpretation." />
          <Reference title="Isolated horizons" body="Meissner / Domagała–Lewandowski counting motivates the displayed Immirzi-value comparison; counting prescriptions differ." />
        </section>
      </main>
    </div>
  );
}

function ChartCards(props: { gamma: number; jMean: number; rhoC: number; freqHz: number; amp: number; gwEvent: GwEventId; overlayEvent: boolean }) {
  const { gamma, jMean, rhoC, freqHz, amp, gwEvent, overlayEvent } = props;
  return (
    <>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3"><CardTitle>EPRL-inspired action landscape</CardTitle><ModelBadge kind="APPROXIMATION" /></div>
        <CardHint>Phenomenological 2D saddle surrogate S(βx, βy); responds to γ and j.</CardHint>
        <div className="mt-4"><ActionLandscape gamma={gamma} jMean={jMean} /></div>
        <BoundaryNote kind="APPROXIMATION">This is not an EPRL vertex-amplitude integral or a boundary-data solve; it is a reduced visualization of chosen scaling behavior.</BoundaryNote>
      </Card>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3"><CardTitle>Hessian spectrum proxy</CardTitle><ModelBadge kind="SYNTHETIC" /></div>
        <CardHint>12 illustrative modes with three near-zero directions; the spectrum is scaled by γj.</CardHint>
        <HessianChart gamma={gamma} jMean={jMean} />
        <BoundaryNote kind="SYNTHETIC">Eigenvalues are a fixed synthetic shape under scaling—not eigenvalues of a Hessian computed from an EPRL saddle.</BoundaryNote>
      </Card>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3"><CardTitle>Effective LQC bounce profile</CardTitle><ModelBadge kind="APPROXIMATION" /></div>
        <CardHint>Analytic cosh/sech² profile parameterized by the displayed critical-density expression.</CardHint>
        <BounceChart rhoC={rhoC} />
        <BoundaryNote kind="APPROXIMATION">This is an analytic teaching profile inspired by effective LQC behavior, not a numerical APS evolution.</BoundaryNote>
      </Card>
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3"><CardTitle>Gravitational-wave strain</CardTitle><ModelBadge kind="SYNTHETIC" /></div>
        <CardHint>User-controlled burst plus catalog-style synthetic overlays.</CardHint>
        <GwChart freqHz={freqHz} amp={amp} eventId={gwEvent} overlay={overlayEvent} />
        <BoundaryNote kind="SYNTHETIC">No LIGO/Virgo/KAGRA strain file is loaded. Event names label approximate generated waveforms only.</BoundaryNote>
      </Card>
    </>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return <div className="rounded-lg border border-border bg-surface/80 p-4"><span className="font-mono text-[9px] tracking-[0.13em] text-subtle">{label}</span><b className="mt-2 block font-mono text-xl font-medium tabular-nums text-fg">{value}</b></div>;
}

function Reference({ title, body }: { title: string; body: string }) {
  return <article className="rounded-lg border border-border bg-surface/55 p-4"><span className="font-mono text-[9px] uppercase tracking-[0.14em] text-subtle">REFERENCE</span><h3 className="mt-2 text-sm font-medium">{title}</h3><p className="mt-2 text-xs leading-5 text-muted">{body}</p></article>;
}
