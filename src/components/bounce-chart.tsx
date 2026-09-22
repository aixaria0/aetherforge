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
import { lqcBounce } from "@/lib/physics";

export function BounceChart({ rhoC }: { rhoC: number }) {
  const data = lqcBounce(rhoC);

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: 4, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid stroke="rgba(236,236,232,0.08)" />
          <XAxis dataKey="t" tick={{ fill: "#8b8e96", fontSize: 11 }} stroke="#ffffff18" />
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
          <Line type="monotone" dataKey="a" name="Scale factor a" stroke="#9db5bc" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="rho" name="Density ρ / ρ_Pl" stroke="#7a8f7e" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
