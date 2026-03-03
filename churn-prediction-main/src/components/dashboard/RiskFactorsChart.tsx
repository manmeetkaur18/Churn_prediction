import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export interface RiskFactor {
  name: string;
  impact: number;
}

interface Props {
  factors: RiskFactor[];
}

const COLORS = [
  "hsl(0, 72%, 55%)",
  "hsl(15, 80%, 55%)",
  "hsl(30, 85%, 55%)",
  "hsl(38, 92%, 60%)",
  "hsl(50, 80%, 55%)",
  "hsl(160, 60%, 45%)",
];

const RiskFactorsChart = ({ factors }: Props) => (
  <div className="card-elevated p-5">
    <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
      Top Risk Contributing Factors
    </h3>
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={factors} layout="vertical" margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(222, 25%, 16%)" horizontal={false} />
        <XAxis type="number" domain={[0, 100]} tick={{ fill: "hsl(215, 15%, 52%)", fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis type="category" dataKey="name" tick={{ fill: "hsl(210, 20%, 80%)", fontSize: 12 }} axisLine={false} tickLine={false} width={130} />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(222, 41%, 11%)",
            border: "1px solid hsl(222, 25%, 16%)",
            borderRadius: "8px",
            fontSize: "12px",
            color: "hsl(210, 20%, 92%)",
          }}
          formatter={(value: number) => [`${value}%`, "Impact"]}
        />
        <Bar dataKey="impact" radius={[0, 4, 4, 0]} barSize={20}>
          {factors.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default RiskFactorsChart;
