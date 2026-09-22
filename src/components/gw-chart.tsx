import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { controlledWaveform, eventWaveform, type GwEventId } from "@/lib/waveforms";

export function GwChart({
  freqHz,
  amp,
  eventId,
  overlay,
}: {
  freqHz: number;
  amp: number;
  eventId: GwEventId;
  overlay: boolean;
}) {
  const controlled = controlledWaveform(freqHz, amp);
  const event = eventWaveform(eventId);
  const data = controlled.map((p, i) => ({
    i: p.i,
    controlled: p.h,
    event: event[i]?.h ?? 0,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid stroke="rgba(236,236,232,0.08)" />
          <XAxis dataKey="i" tick={{ fill: "#8b8e96", fontSize: 11 }} stroke="#ffffff18" />
          <YAxis tick={{ fill: "#8b8e96", fontSize: 11 }} stroke="#ffffff18" />
          <Tooltip
            contentStyle={{
              background: "#14151a",
              border: "1px solid rgba(236,236,232,0.12)",
              borderRadius: 8,
              color: "#ecece8",
            }}
          />
          <Legend wrapperStyle={{ color: "#8b8e96", fontSize: 12 }} />
          <Line
            type="monotone"
            dataKey="controlled"
            name="Controlled"
            stroke="#9db5bc"
            dot={false}
            strokeWidth={2}
          />
          {overlay && eventId !== "none" ? (
            <Line
              type="monotone"
              dataKey="event"
              name="Catalog event (approx.)"
              stroke="#c4a882"
              dot={false}
              strokeWidth={1.6}
              strokeDasharray="5 4"
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
