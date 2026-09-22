import { ActionLandscape } from "@/components/action-landscape";
import { BounceChart } from "@/components/bounce-chart";
import { ControlsPanel } from "@/components/controls-panel";
import { EntropyPanel } from "@/components/entropy-panel";
import { GwChart } from "@/components/gw-chart";
import { HessianChart } from "@/components/hessian-chart";
import { ParticleField } from "@/components/particle-field";
import { SpinNetwork } from "@/components/spin-network";
import { TheoryPanel } from "@/components/theory-panel";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { rhoCOverPlanck } from "@/lib/physics";
import { useLab } from "@/lib/store";
import type { GwEventId } from "@/lib/waveforms";
import { Atom } from "lucide-react";

export function ForgeShell() {
  const { gamma, jMean, freqHz, amp, gwEvent, overlayEvent } = useLab();
  const rhoC = rhoCOverPlanck(gamma);

  return (
    <div className="relative min-h-dvh">
      <ParticleField />
      <header className="sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md border border-border bg-elevated">
              <Atom className="size-4 text-accent" aria-hidden />
            </span>
            <div>
              <div className="text-sm font-semibold tracking-tight">Aether Forge</div>
              <div className="text-[11px] uppercase tracking-wider text-muted">
                Loop quantum gravity lab
              </div>
            </div>
          </div>
          <div className="hidden font-mono text-xs tabular-nums text-muted sm:block">
            γ {gamma.toFixed(4)} · ρ_c {rhoC.toFixed(3)} ρ_Pl
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-muted">
          Interactive EPRL action landscape, Hessian spectrum, LQC bounce, isolated-horizon
          entropy, a 4-valent spin network, and synthetic LIGO-style strain. Values update
          from γ and j in real time.
        </p>

        <div className="hidden gap-6 lg:grid lg:grid-cols-12">
          <div className="lg:col-span-3">
            <ControlsPanel />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-6">
            <ChartCards
              gamma={gamma}
              jMean={jMean}
              rhoC={rhoC}
              freqHz={freqHz}
              amp={amp}
              gwEvent={gwEvent}
              overlayEvent={overlayEvent}
            />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-3">
            <TheoryPanel />
            <Card>
              <CardTitle>Spin network</CardTitle>
              <CardHint>
                4-valent vertex. Drag the intertwiner or the punctures. Labels stay above each node.
              </CardHint>
              <div className="mt-4">
                <SpinNetwork />
              </div>
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
              <ChartCards
                gamma={gamma}
                jMean={jMean}
                rhoC={rhoC}
                freqHz={freqHz}
                amp={amp}
                gwEvent={gwEvent}
                overlayEvent={overlayEvent}
              />
            </TabsContent>
            <TabsContent value="network" className="space-y-4">
              <Card>
                <CardTitle>Spin network</CardTitle>
                <CardHint>Drag the central intertwiner or the four punctures.</CardHint>
                <SpinNetwork />
              </Card>
              <EntropyPanel />
            </TabsContent>
            <TabsContent value="theory">
              <TheoryPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}

function ChartCards(props: {
  gamma: number;
  jMean: number;
  rhoC: number;
  freqHz: number;
  amp: number;
  gwEvent: GwEventId;
  overlayEvent: boolean;
}) {
  const { gamma, jMean, rhoC, freqHz, amp, gwEvent, overlayEvent } = props;
  return (
    <>
      <Card>
        <CardTitle>EPRL action landscape</CardTitle>
        <CardHint>Slice S(βx, βy) near the saddle. Valley steepens linearly with γ.</CardHint>
        <div className="mt-4">
          <ActionLandscape gamma={gamma} jMean={jMean} />
        </div>
      </Card>
      <Card>
        <CardTitle>Hessian eigenvalue spectrum</CardTitle>
        <CardHint>12 gauge-fixed boost modes. Three near-zero directions. |λ| ∝ γ j.</CardHint>
        <HessianChart gamma={gamma} jMean={jMean} />
      </Card>
      <Card>
        <CardTitle>LQC bounce</CardTitle>
        <CardHint>
          Dust bounce with ρ_c = √3 / (32π²γ³) ρ_Pl. Density peaks at the bounce; a(t) has a minimum.
        </CardHint>
        <BounceChart rhoC={rhoC} />
      </Card>
      <Card>
        <CardTitle>Gravitational-wave strain</CardTitle>
        <CardHint>
          Controlled burst plus a catalog-style overlay (GW150914 / GW170817 / GW190521 approximations).
        </CardHint>
        <GwChart freqHz={freqHz} amp={amp} eventId={gwEvent} overlay={overlayEvent} />
      </Card>
    </>
  );
}
