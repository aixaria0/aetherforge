import { i as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, r as Slot, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as Atom } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as Line, c as ResponsiveContainer, i as XAxis, l as Tooltip, n as LineChart, o as CartesianGrid, r as YAxis, s as Bar, t as BarChart, u as Legend } from "../_libs/recharts+[...].mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
import { t as create } from "../_libs/zustand.mjs";
import { t as katex } from "../_libs/katex.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CEpAKMkq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Loop quantum gravity quantities used by AETHER FORGE.
* Formulas follow the EPRL / LQC literature summarized in this lab.
*/
/** Meissner / Domagala–Lewandowski isolated-horizon value. */
var GAMMA_MEISSNER = .237532957976268;
/** Working Holst / EPRL value used in many numerical spin-foam papers. */
var GAMMA_EPRL = .273904071092196;
/** Combinatorial factor from the 2√3 degeneracy counting. */
var TWO_SQRT_3 = 2 * Math.sqrt(3);
/**
* γ from the leading 2√3 counting:
* S = (A / 4ℓ_P²) × (ln(2√3) / (πγ))  — set equal to A/4ℓ_P²
* gives γ = ln(2√3) / π ≈ 0.395. Different state-counting schemes
* produce 0.2375 or 0.274. The lab defaults to Meissner.
*/
var GAMMA_FROM_TWO_SQRT_3 = Math.log(TWO_SQRT_3) / Math.PI;
/**
* LQC critical density in Planck units (APS bounce):
* ρ_c / ρ_Pl = √3 / (32 π² γ³)
* ≈ 0.41 at γ ≈ 0.2375
*/
function rhoCOverPlanck(gamma) {
	const g = Math.max(gamma, .05);
	return Math.sqrt(3) / (32 * Math.PI ** 2 * g ** 3);
}
/** Hessian matrix elements scale as γ j. */
function hessianElementScale(gamma, jMean = 50) {
	return gamma * jMean;
}
/**
* Gauge-fixed 4-simplex: 12 boost parameters, det(H) ∝ γ^{15} j^{15}
* (12 from naive λ^{12} plus +3 from closure / volume measure).
*/
function hessianDet(gamma, jMean = 50) {
	return 24e-9 * gamma ** 15 * jMean ** 15;
}
function hessianPrefactor(gamma, jMean = 50) {
	const det = Math.abs(hessianDet(gamma, jMean));
	return (2 * Math.PI) ** 6 / Math.sqrt(det);
}
/** Sorted toy spectrum for a 12×12 Hessian (3 near-zero gauge modes). */
function hessianEigenvalues(gamma, jMean = 50) {
	const scale = hessianElementScale(gamma, jMean) / hessianElementScale(GAMMA_MEISSNER, 50);
	return [
		1.2e-9,
		3.4e-9,
		8.1e-9,
		.12,
		.31,
		.78,
		1.55,
		2.9,
		4.7,
		7.2,
		11.4,
		16.8
	].map((v) => v * scale);
}
/**
* Dust LQC bounce: a(t) = a_min cosh^{1/3}(λ t), ρ = ρ_c sech²(λ t)
* Time is dimensionless.
*/
function lqcBounce(rhoC, n = 96) {
	const out = [];
	for (let i = 0; i < n; i++) {
		const t = i / (n - 1) * 6 - 3;
		const sech = 1 / Math.cosh(t);
		const rho = rhoC * sech * sech;
		const a = Math.cbrt(Math.cosh(t));
		out.push({
			t,
			a,
			rho
		});
	}
	return out;
}
/** 2D EPRL effective action slice S(βx, βy) ~ γ × quadratic + quartic anharmonic. */
function actionAt(bx, by, gamma, jMean = 50) {
	const r2 = bx * bx + by * by;
	const quartic = .18 * (bx ** 4 + by ** 4) - .07 * bx * bx * by * by;
	return gamma * jMean * (r2 + quartic);
}
function ActionLandscape({ gamma, jMean }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const w = canvas.width;
		const h = canvas.height;
		const img = ctx.createImageData(w, h);
		const range = .42;
		let min = Infinity;
		let max = -Infinity;
		const grid = new Float32Array(w * h);
		for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
			const s = actionAt(x / (w - 1) * 2 * range - range, y / (h - 1) * 2 * range - range, gamma, jMean);
			grid[y * w + x] = s;
			if (s < min) min = s;
			if (s > max) max = s;
		}
		const span = max - min || 1;
		for (let i = 0; i < grid.length; i++) {
			const t = (grid[i] - min) / span;
			const k = i * 4;
			img.data[k] = 12 + t * 140;
			img.data[k + 1] = 13 + t * 155;
			img.data[k + 2] = 16 + t * 170;
			img.data[k + 3] = 255;
		}
		ctx.putImageData(img, 0, 0);
		ctx.strokeStyle = "rgba(236,236,232,0.18)";
		ctx.lineWidth = 1;
		const steps = 6;
		ctx.beginPath();
		for (let s = 1; s < steps; s++) {
			const gx = s / steps * w;
			const gy = s / steps * h;
			ctx.moveTo(gx, 0);
			ctx.lineTo(gx, h);
			ctx.moveTo(0, gy);
			ctx.lineTo(w, gy);
		}
		ctx.stroke();
		ctx.fillStyle = "rgba(236,236,232,0.7)";
		ctx.font = "11px ui-monospace, monospace";
		ctx.fillText("βx", w - 28, h - 8);
		ctx.fillText("βy", 8, 16);
	}, [gamma, jMean]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		width: 520,
		height: 280,
		className: "h-auto w-full rounded-md border border-border",
		"aria-label": "EPRL action landscape slice"
	});
}
function BounceChart({ rhoC }) {
	const data = lqcBounce(rhoC);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					left: 4,
					right: 8,
					top: 8,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "rgba(236,236,232,0.08)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "t",
						tick: {
							fill: "#8b8e96",
							fontSize: 11
						},
						stroke: "#ffffff18"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "#8b8e96",
							fontSize: 11
						},
						stroke: "#ffffff18"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						background: "#14151a",
						border: "1px solid rgba(236,236,232,0.12)",
						borderRadius: 8,
						color: "#ecece8"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
						color: "#8b8e96",
						fontSize: 12
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "a",
						name: "Scale factor a",
						stroke: "#9db5bc",
						dot: false,
						strokeWidth: 2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "rho",
						name: "Density ρ / ρ_Pl",
						stroke: "#7a8f7e",
						dot: false,
						strokeWidth: 2
					})
				]
			})
		})
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function sci(n, digits = 2) {
	if (!Number.isFinite(n)) return "—";
	return n.toExponential(digits);
}
function Badge({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex items-center rounded-full border border-border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider text-muted", className),
		...props
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-opacity duration-150 ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50", {
	variants: {
		variant: {
			primary: "bg-fg text-accent-fg hover:opacity-90",
			secondary: "border border-border bg-elevated text-fg hover:bg-surface",
			ghost: "text-muted hover:text-fg hover:bg-elevated"
		},
		size: {
			sm: "h-9 rounded-sm px-3 text-sm",
			md: "h-11 rounded-md px-4 text-sm"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-surface p-5 md:p-6", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: cn("text-sm font-medium tracking-tight", className),
		...props
	});
}
function CardHint({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("mt-1 text-xs text-muted leading-relaxed", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("block text-xs font-medium uppercase tracking-wider text-muted", className),
		...props
	});
}
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-8 w-full touch-none items-center", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-elevated",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-accent" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full border border-border-strong bg-fg shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50" })]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border bg-elevated transition-colors data-[state=checked]:bg-accent", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-4 translate-x-1 rounded-full bg-fg transition-transform data-[state=checked]:translate-x-5 data-[state=checked]:bg-accent-fg" })
	});
}
var useLab = create((set) => ({
	gamma: GAMMA_MEISSNER,
	jMean: 50,
	freqHz: 80,
	amp: .8,
	gwEvent: "gw150914",
	overlayEvent: true,
	setGamma: (gamma) => set({ gamma }),
	setJMean: (jMean) => set({ jMean }),
	setFreqHz: (freqHz) => set({ freqHz }),
	setAmp: (amp) => set({ amp }),
	setGwEvent: (gwEvent) => set({ gwEvent }),
	setOverlayEvent: (overlayEvent) => set({ overlayEvent })
}));
var GW_EVENTS = [
	{
		id: "none",
		label: "None",
		note: "Controlled waveform only"
	},
	{
		id: "gw150914",
		label: "GW150914",
		note: "First BBH detection (approx. chirp)"
	},
	{
		id: "gw170817",
		label: "GW170817",
		note: "BNS, longer inspiral (approx.)"
	},
	{
		id: "gw190521",
		label: "GW190521",
		note: "Heavy BBH, lower frequency (approx.)"
	}
];
var N = 240;
function imr(t, tMerge, f0, amp, ringDecay, ringMul) {
	if (t < tMerge) {
		const tau = Math.max(tMerge - t, .012);
		const f = f0 / tau ** .375;
		const a = amp * tau ** -.25;
		const phase = 2 * Math.PI * f * t;
		return a * Math.sin(phase);
	}
	const dt = t - tMerge;
	return amp * ringMul * Math.exp(-dt * ringDecay) * Math.sin(2 * Math.PI * f0 * ringMul * t);
}
/** User-controlled quasi-monochromatic burst. */
function controlledWaveform(freqHz, amp) {
	const out = [];
	for (let i = 0; i < N; i++) {
		const t = i / 239 * 2 - 1;
		const h = amp * Math.exp(-Math.abs(t) * 1.15) * Math.sin(2 * Math.PI * (freqHz / 90) * t * 6);
		out.push({
			i,
			t,
			h
		});
	}
	return out;
}
/** Synthetic LIGO-like strain (not observatory strain files). */
function eventWaveform(id) {
	const out = [];
	for (let i = 0; i < N; i++) {
		const u = i / 239;
		let h = 0;
		if (id === "gw150914") h = imr(u, .72, 28, .72, 16, 2.1);
		else if (id === "gw170817") {
			const tau = Math.max(.92 - u, .02);
			const f = 18 / tau ** .32;
			h = .38 * tau ** -.18 * Math.sin(2 * Math.PI * f * u * 4);
		} else if (id === "gw190521") h = imr(u, .68, 14, .9, 11, 1.6);
		out.push({
			i,
			t: u * 2 - 1,
			h
		});
	}
	return out;
}
function ControlsPanel() {
	const { gamma, jMean, freqHz, amp, gwEvent, overlayEvent, setGamma, setJMean, setFreqHz, setAmp, setGwEvent, setOverlayEvent } = useLab();
	const rhoC = rhoCOverPlanck(gamma);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Quantum parameters" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Immirzi γ sets areas, the Hessian, and the LQC bounce density." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-baseline justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "gamma",
									children: "Immirzi γ"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-sm tabular-nums text-accent",
									children: gamma.toFixed(4)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
								id: "gamma",
								min: .1,
								max: .6,
								step: .001,
								value: [gamma],
								onValueChange: ([v]) => setGamma(v ?? gamma)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "secondary",
									onClick: () => setGamma(GAMMA_MEISSNER),
									children: "Meissner 0.2375"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									size: "sm",
									variant: "secondary",
									onClick: () => setGamma(GAMMA_EPRL),
									children: "EPRL 0.2739"
								})]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "jmean",
								children: "Mean spin j"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm tabular-nums text-accent",
								children: jMean.toFixed(0)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							id: "jmean",
							min: 10,
							max: 200,
							step: 1,
							value: [jMean],
							onValueChange: ([v]) => setJMean(v ?? jMean)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3 text-xs",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "ρ_c / ρ_Pl",
									value: rhoC.toFixed(3)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "det H",
									value: sci(hessianDet(gamma, jMean))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "√|det H|",
									value: sci(Math.sqrt(Math.abs(hessianDet(gamma, jMean))))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
									label: "A_v prefactor",
									value: sci(hessianPrefactor(gamma, jMean))
								})
							]
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Gravitational wave controls" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Synthetic strain, not observatory strain files. Overlay is a catalog-style chirp." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "freq",
								children: "Frequency"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-sm tabular-nums text-accent",
								children: [freqHz.toFixed(0), " Hz"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							id: "freq",
							min: 20,
							max: 300,
							step: 1,
							value: [freqHz],
							onValueChange: ([v]) => setFreqHz(v ?? freqHz)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-baseline justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "amp",
								children: "Amplitude"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-sm tabular-nums text-accent",
								children: amp.toFixed(2)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							id: "amp",
							min: .1,
							max: 2,
							step: .05,
							value: [amp],
							onValueChange: ([v]) => setAmp(v ?? amp)
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "overlay",
								className: "normal-case tracking-normal",
								children: "Overlay catalog event"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								id: "overlay",
								checked: overlayEvent,
								onCheckedChange: setOverlayEvent
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: GW_EVENTS.filter((e) => e.id !== "none").map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setGwEvent(e.id),
								className: gwEvent === e.id ? "rounded-full border border-fg bg-fg px-3 py-2 text-xs font-medium text-accent-fg" : "rounded-full border border-border px-3 py-2 text-xs font-medium text-muted hover:text-fg",
								children: e.label
							}, e.id))
						})
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Scaling" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "4-simplex" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 space-y-2 text-sm text-muted leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "S ~ γ j" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "H_ab ~ γ j" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "det(H) ~ γ¹⁵ j¹⁵" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "ρ_c ~ 1/γ³" })
				]
			})] })
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-elevated px-3 py-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[10px] uppercase tracking-wider text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-mono text-sm tabular-nums text-fg",
			children: value
		})]
	});
}
function Formula({ tex, display = true, className }) {
	const html = (0, import_react.useMemo)(() => katex.renderToString(tex, {
		displayMode: display,
		throwOnError: false
	}), [tex, display]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("katex-wrap", className),
		dangerouslySetInnerHTML: { __html: html }
	});
}
function EntropyPanel() {
	const gamma = useLab((s) => s.gamma);
	const ratio = GAMMA_MEISSNER / gamma;
	const rhoC = rhoCOverPlanck(gamma);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Horizon matching" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Bekenstein–Hawking S = A/4ℓ_P² is recovered when γ sits at the counting value. Off that point, S_LQG / S_BH ≈ γ_★ / γ." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-5",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { tex: `S_{\\mathrm{LQG}}/S_{\\mathrm{BH}} \\approx ${ratio.toFixed(3)}` })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid grid-cols-2 gap-3 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md bg-elevated px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-wider text-subtle",
					children: "γ"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-mono tabular-nums",
					children: gamma.toFixed(4)
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-md bg-elevated px-3 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-wider text-subtle",
					children: "ρ_c / ρ_Pl"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-mono tabular-nums",
					children: rhoC.toFixed(3)
				})]
			})]
		})
	] });
}
function GwChart({ freqHz, amp, eventId, overlay }) {
	const controlled = controlledWaveform(freqHz, amp);
	const event = eventWaveform(eventId);
	const data = controlled.map((p, i) => ({
		i: p.i,
		controlled: p.h,
		event: event[i]?.h ?? 0
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				margin: {
					left: 4,
					right: 8,
					top: 8,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, { stroke: "rgba(236,236,232,0.08)" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "i",
						tick: {
							fill: "#8b8e96",
							fontSize: 11
						},
						stroke: "#ffffff18"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick: {
							fill: "#8b8e96",
							fontSize: 11
						},
						stroke: "#ffffff18"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
						background: "#14151a",
						border: "1px solid rgba(236,236,232,0.12)",
						borderRadius: 8,
						color: "#ecece8"
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, { wrapperStyle: {
						color: "#8b8e96",
						fontSize: 12
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "controlled",
						name: "Controlled",
						stroke: "#9db5bc",
						dot: false,
						strokeWidth: 2
					}),
					overlay && eventId !== "none" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "event",
						name: "Catalog event (approx.)",
						stroke: "#c4a882",
						dot: false,
						strokeWidth: 1.6,
						strokeDasharray: "5 4"
					}) : null
				]
			})
		})
	});
}
function HessianChart({ gamma, jMean }) {
	const data = hessianEigenvalues(gamma, jMean).map((v, i) => ({
		name: `λ${i + 1}`,
		abs: Math.abs(v)
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-64 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				layout: "vertical",
				margin: {
					left: 8,
					right: 8,
					top: 8,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: "rgba(236,236,232,0.08)",
						horizontal: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						type: "number",
						tick: {
							fill: "#8b8e96",
							fontSize: 11
						},
						stroke: "#ffffff18"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						type: "category",
						dataKey: "name",
						tick: {
							fill: "#8b8e96",
							fontSize: 11
						},
						width: 36,
						stroke: "#ffffff18"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: {
							background: "#14151a",
							border: "1px solid rgba(236,236,232,0.12)",
							borderRadius: 8,
							color: "#ecece8"
						},
						formatter: (v) => [v.toExponential(2), "|λ|"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "abs",
						fill: "#9db5bc",
						radius: [
							0,
							3,
							3,
							0
						]
					})
				]
			})
		})
	});
}
function ParticleField() {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let raf = 0;
		let particles = [];
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.floor(window.innerWidth * dpr);
			canvas.height = Math.floor(window.innerHeight * dpr);
			canvas.style.width = `${window.innerWidth}px`;
			canvas.style.height = `${window.innerHeight}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			const n = Math.min(90, Math.floor(window.innerWidth * window.innerHeight / 18e3));
			particles = Array.from({ length: n }, () => ({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight,
				vx: (Math.random() - .5) * .35,
				vy: (Math.random() - .5) * .35
			}));
		};
		const tick = () => {
			ctx.fillStyle = "rgba(12,13,16,0.22)";
			ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
			ctx.fillStyle = "rgba(157,181,188,0.45)";
			for (const p of particles) {
				if (!reduce) {
					p.x += p.vx;
					p.y += p.vy;
					if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
					if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;
				}
				ctx.fillRect(p.x, p.y, 1.4, 1.4);
			}
			raf = requestAnimationFrame(tick);
		};
		resize();
		tick();
		window.addEventListener("resize", resize);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("resize", resize);
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		"aria-hidden": "true",
		className: "pointer-events-none fixed inset-0 -z-10"
	});
}
var INITIAL = [
	{
		x: 70,
		y: 56,
		j: "1"
	},
	{
		x: 250,
		y: 56,
		j: "1"
	},
	{
		x: 70,
		y: 220,
		j: "1"
	},
	{
		x: 250,
		y: 220,
		j: "½"
	}
];
function SpinNetwork() {
	const svgRef = (0, import_react.useRef)(null);
	const [nodes, setNodes] = (0, import_react.useState)(INITIAL);
	const [vertex, setVertex] = (0, import_react.useState)({
		x: 160,
		y: 138
	});
	const drag = (0, import_react.useRef)(null);
	const toLocal = (e) => {
		const svg = svgRef.current;
		if (!svg) return {
			x: 0,
			y: 0
		};
		const pt = svg.createSVGPoint();
		pt.x = e.clientX;
		pt.y = e.clientY;
		const ctm = svg.getScreenCTM();
		if (!ctm) return {
			x: 0,
			y: 0
		};
		const p = pt.matrixTransform(ctm.inverse());
		return {
			x: Math.max(18, Math.min(302, p.x)),
			y: Math.max(22, Math.min(258, p.y))
		};
	};
	const onMove = (0, import_react.useCallback)((e) => {
		if (drag.current === null) return;
		const p = toLocal(e);
		if (drag.current === "v") setVertex(p);
		else {
			const i = drag.current;
			setNodes((prev) => prev.map((n, k) => k === i ? {
				...n,
				...p
			} : n));
		}
	}, []);
	const stop = () => {
		drag.current = null;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref: svgRef,
		viewBox: "0 0 320 280",
		className: "mx-auto block h-auto w-full max-w-sm touch-none cursor-grab",
		onPointerMove: onMove,
		onPointerUp: stop,
		onPointerLeave: stop,
		"aria-label": "Interactive 4-valent spin network",
		children: [
			nodes.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: n.x,
				y1: n.y,
				x2: vertex.x,
				y2: vertex.y,
				stroke: "var(--color-accent)",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				opacity: "0.85"
			}, `e${i}`)),
			nodes.map((n, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: n.x,
				cy: n.y,
				r: "11",
				fill: "var(--color-accent)",
				className: "cursor-grab",
				onPointerDown: (e) => {
					e.currentTarget.setPointerCapture(e.pointerId);
					drag.current = i;
				}
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: n.x,
				y: n.y - 18,
				textAnchor: "middle",
				fill: "var(--color-fg)",
				fontSize: "13",
				fontWeight: "600",
				fontFamily: "var(--font-mono)",
				children: `j=${n.j}`
			})] }, `n${i}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: vertex.x,
				cy: vertex.y,
				r: "18",
				fill: "var(--color-elevated)",
				stroke: "var(--color-fg)",
				strokeWidth: "2",
				className: "cursor-grab",
				onPointerDown: (e) => {
					e.currentTarget.setPointerCapture(e.pointerId);
					drag.current = "v";
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: vertex.x,
				y: vertex.y + 4,
				textAnchor: "middle",
				fill: "var(--color-muted)",
				fontSize: "8",
				fontWeight: "600",
				fontFamily: "var(--font-sans)",
				children: "ι"
			})
		]
	});
}
function TheoryPanel() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "EPRL vertex amplitude" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Large-j stationary phase around a Regge saddle." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { tex: `A_v \\approx \\frac{(2\\pi)^{6}}{\\sqrt{|\\det H|}}\\,\\exp\\bigl(i S_{\\mathrm{Regge}}(\\beta)\\bigr)` })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Barrett–Crane (comparison)" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Strong simplicity constraints. Poor 4d semi-classical limit." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { tex: `A_v^{\\mathrm{BC}} = \\int dg \\prod_f (2j_f+1)\\,\\chi_{j_f}(g_f)` })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs leading-relaxed text-muted",
					children: "EPRL imposes simplicity weakly with SU(2) coherent states and recovers Regge calculus. Barrett–Crane over-constrains the intertwiner."
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Black-hole entropy" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHint, { children: [
					"Microstate counting on an isolated horizon. 2√3 ≈ ",
					TWO_SQRT_3.toFixed(4),
					". ln(2√3)/π ≈ ",
					GAMMA_FROM_TWO_SQRT_3.toFixed(4),
					". Lab default γ = ",
					GAMMA_MEISSNER.toFixed(4),
					"."
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { tex: `S = \\frac{A}{4\\ell_P^{2}} \\quad \\text{when } \\gamma = \\gamma_\\star` })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { tex: `\\frac{\\rho_c}{\\rho_{\\mathrm{Pl}}} = \\frac{\\sqrt{3}}{32\\pi^{2}\\gamma^{3}}` })
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Face area" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Formula, { tex: `A_f = 8\\pi\\gamma\\ell_P^{2}\\sqrt{j_f(j_f+1)}` })
			})] })
		]
	});
}
var Tabs = Root2;
var TabsList = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	className: cn("flex flex-wrap gap-1 rounded-md border border-border bg-elevated p-1", className),
	...props
});
var TabsTrigger = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	className: cn("min-h-10 flex-1 rounded-sm px-3 text-sm text-muted transition-colors data-[state=active]:bg-surface data-[state=active]:text-fg", className),
	...props
});
var TabsContent = Content;
function ForgeShell() {
	const { gamma, jMean, freqHz, amp, gwEvent, overlayEvent } = useLab();
	const rhoC = rhoCOverPlanck(gamma);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleField, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-20 border-b border-border bg-bg/85 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-md border border-border bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Atom, {
								className: "size-4 text-accent",
								"aria-hidden": true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-semibold tracking-tight",
							children: "Aether Forge"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[11px] uppercase tracking-wider text-muted",
							children: "Loop quantum gravity lab"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden font-mono text-xs tabular-nums text-muted sm:block",
						children: [
							"γ ",
							gamma.toFixed(4),
							" · ρ_c ",
							rhoC.toFixed(3),
							" ρ_Pl"
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-6 max-w-2xl text-sm leading-relaxed text-muted",
						children: "Interactive EPRL action landscape, Hessian spectrum, LQC bounce, isolated-horizon entropy, a 4-valent spin network, and synthetic LIGO-style strain. Values update from γ and j in real time."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden gap-6 lg:grid lg:grid-cols-12",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "lg:col-span-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlsPanel, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-col gap-4 lg:col-span-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCards, {
									gamma,
									jMean,
									rhoC,
									freqHz,
									amp,
									gwEvent,
									overlayEvent
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 lg:col-span-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TheoryPanel, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Spin network" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "4-valent vertex. Drag the intertwiner or the punctures. Labels stay above each node." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinNetwork, {})
										})
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntropyPanel, {})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
							defaultValue: "lab",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
									className: "mb-4 w-full",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "lab",
											children: "Lab"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "network",
											children: "Network"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
											value: "theory",
											children: "Theory"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
									value: "lab",
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ControlsPanel, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartCards, {
										gamma,
										jMean,
										rhoC,
										freqHz,
										amp,
										gwEvent,
										overlayEvent
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
									value: "network",
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Spin network" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Drag the central intertwiner or the four punctures." }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpinNetwork, {})
									] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EntropyPanel, {})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
									value: "theory",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TheoryPanel, {})
								})
							]
						})
					})
				]
			})
		]
	});
}
function ChartCards(props) {
	const { gamma, jMean, rhoC, freqHz, amp, gwEvent, overlayEvent } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "EPRL action landscape" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Slice S(βx, βy) near the saddle. Valley steepens linearly with γ." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionLandscape, {
					gamma,
					jMean
				})
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Hessian eigenvalue spectrum" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "12 gauge-fixed boost modes. Three near-zero directions. |λ| ∝ γ j." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HessianChart, {
				gamma,
				jMean
			})
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "LQC bounce" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Dust bounce with ρ_c = √3 / (32π²γ³) ρ_Pl. Density peaks at the bounce; a(t) has a minimum." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BounceChart, { rhoC })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Gravitational-wave strain" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHint, { children: "Controlled burst plus a catalog-style overlay (GW150914 / GW170817 / GW190521 approximations)." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GwChart, {
				freqHz,
				amp,
				eventId: gwEvent,
				overlay: overlayEvent
			})
		] })
	] });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgeShell, {});
}
//#endregion
export { Home as component };
