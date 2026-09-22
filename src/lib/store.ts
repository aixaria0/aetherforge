import { create } from "zustand";
import { GAMMA_MEISSNER } from "./physics";
import type { GwEventId } from "./waveforms";

export type LabState = {
  gamma: number;
  jMean: number;
  freqHz: number;
  amp: number;
  gwEvent: GwEventId;
  overlayEvent: boolean;
  setGamma: (v: number) => void;
  setJMean: (v: number) => void;
  setFreqHz: (v: number) => void;
  setAmp: (v: number) => void;
  setGwEvent: (v: GwEventId) => void;
  setOverlayEvent: (v: boolean) => void;
};

export const useLab = create<LabState>((set) => ({
  gamma: GAMMA_MEISSNER,
  jMean: 50,
  freqHz: 80,
  amp: 0.8,
  gwEvent: "gw150914",
  overlayEvent: true,
  setGamma: (gamma) => set({ gamma }),
  setJMean: (jMean) => set({ jMean }),
  setFreqHz: (freqHz) => set({ freqHz }),
  setAmp: (amp) => set({ amp }),
  setGwEvent: (gwEvent) => set({ gwEvent }),
  setOverlayEvent: (overlayEvent) => set({ overlayEvent }),
}));
