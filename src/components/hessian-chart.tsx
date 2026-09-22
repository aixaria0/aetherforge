import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { hessianEigenvalues } from "@/lib/physics";

export function HessianChart({ gamma, jMean }: { gamma: number; jMean: number }) {
  const data = hessianEigenvalues(gamma, jMean).map((v, i) => ({
    name: `λ${i + 1}`,
    abs: Math.abs(v),
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid stroke="rgba(236,236,232,0.08)" horizontal={false} />
          <XAxis type="number" tick={{ fill: "#8b8e96", fontSize: 11 }} stroke="#ffffff18" />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: "#8b8e96", fontSize: 11 }}
            width={36}
            stroke="#ffffff18"
          />
          <Tooltip
            contentStyle={{
              background: "#14151a",
              border: "1px solid rgba(236,236,232,0.12)",
              borderRadius: 8,
              color: "#ecece8",
            }}
            formatter={(v: number) => [v.toExponential(2), "|λ|"]}
          />
          <Bar dataKey="abs" fill="#9db5bc" radius={[0, 3, 3, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
