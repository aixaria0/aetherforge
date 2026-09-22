import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHint, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  GAMMA_EPRL,
  GAMMA_MEISSNER,
  hessianDet,
  hessianPrefactor,
  rhoCOverPlanck,
} from "@/lib/physics";
import { useLab } from "@/lib/store";
import { sci } from "@/lib/utils";
import { GW_EVENTS } from "@/lib/waveforms";

export function ControlsPanel() {
  const {
    gamma,
    jMean,
    freqHz,
    amp,
    gwEvent,
    overlayEvent,
    setGamma,
    setJMean,
    setFreqHz,
    setAmp,
    setGwEvent,
    setOverlayEvent,
  } = useLab();
  const rhoC = rhoCOverPlanck(gamma);

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardTitle>Quantum parameters</CardTitle>
        <CardHint>Immirzi γ sets areas, the Hessian, and the LQC bounce density.</CardHint>

        <div className="mt-5 space-y-5">
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <Label htmlFor="gamma">Immirzi γ</Label>
              <span className="font-mono text-sm tabular-nums text-accent">{gamma.toFixed(4)}</span>
            </div>
            <Slider
              id="gamma"
              min={0.1}
              max={0.6}
              step={0.001}
              value={[gamma]}
              onValueChange={([v]) => setGamma(v ?? gamma)}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <Button type="button" size="sm" variant="secondary" onClick={() => setGamma(GAMMA_MEISSNER)}>
                Meissner 0.2375
              </Button>
              <Button type="button" size="sm" variant="secondary" onClick={() => setGamma(GAMMA_EPRL)}>
                EPRL 0.2739
              </Button>
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <Label htmlFor="jmean">Mean spin j</Label>
              <span className="font-mono text-sm tabular-nums text-accent">{jMean.toFixed(0)}</span>
            </div>
            <Slider
              id="jmean"
              min={10}
              max={200}
              step={1}
              value={[jMean]}
              onValueChange={([v]) => setJMean(v ?? jMean)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <Stat label="ρ_c / ρ_Pl" value={rhoC.toFixed(3)} />
            <Stat label="det H" value={sci(hessianDet(gamma, jMean))} />
            <Stat label="√|det H|" value={sci(Math.sqrt(Math.abs(hessianDet(gamma, jMean))))} />
            <Stat label="A_v prefactor" value={sci(hessianPrefactor(gamma, jMean))} />
          </div>
        </div>
      </Card>

      <Card>
        <CardTitle>Gravitational wave controls</CardTitle>
        <CardHint>Synthetic strain, not observatory strain files. Overlay is a catalog-style chirp.</CardHint>
        <div className="mt-5 space-y-5">
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <Label htmlFor="freq">Frequency</Label>
              <span className="font-mono text-sm tabular-nums text-accent">{freqHz.toFixed(0)} Hz</span>
            </div>
            <Slider
              id="freq"
              min={20}
              max={300}
              step={1}
              value={[freqHz]}
              onValueChange={([v]) => setFreqHz(v ?? freqHz)}
            />
          </div>
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <Label htmlFor="amp">Amplitude</Label>
              <span className="font-mono text-sm tabular-nums text-accent">{amp.toFixed(2)}</span>
            </div>
            <Slider
              id="amp"
              min={0.1}
              max={2}
              step={0.05}
              value={[amp]}
              onValueChange={([v]) => setAmp(v ?? amp)}
            />
          </div>
          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="overlay" className="normal-case tracking-normal">
              Overlay catalog event
            </Label>
            <Switch id="overlay" checked={overlayEvent} onCheckedChange={setOverlayEvent} />
          </div>
          <div className="flex flex-wrap gap-2">
            {GW_EVENTS.filter((e) => e.id !== "none").map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => setGwEvent(e.id)}
                className={
                  gwEvent === e.id
                    ? "rounded-full border border-fg bg-fg px-3 py-2 text-xs font-medium text-accent-fg"
                    : "rounded-full border border-border px-3 py-2 text-xs font-medium text-muted hover:text-fg"
                }
              >
                {e.label}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <CardTitle>Scaling</CardTitle>
          <Badge>4-simplex</Badge>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-muted leading-relaxed">
          <li>S ~ γ j</li>
          <li>H_ab ~ γ j</li>
          <li>det(H) ~ γ¹⁵ j¹⁵</li>
          <li>ρ_c ~ 1/γ³</li>
        </ul>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-elevated px-3 py-2.5">
      <div className="text-[10px] uppercase tracking-wider text-subtle">{label}</div>
      <div className="mt-1 font-mono text-sm tabular-nums text-fg">{value}</div>
    </div>
  );
}
