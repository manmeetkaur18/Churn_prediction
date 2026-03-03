interface Props {
  probability: number; // 0-100
}

const RiskGauge = ({ probability }: Props) => {
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (probability / 100) * circumference;

  const color =
    probability < 30
      ? "hsl(160, 60%, 45%)"
      : probability < 60
        ? "hsl(38, 92%, 60%)"
        : "hsl(0, 72%, 55%)";

  const trackColor = "hsl(222, 25%, 16%)";

  return (
    <div className="card-elevated p-6 flex flex-col items-center justify-center">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Risk Gauge
      </span>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={trackColor}
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={
              {
                "--gauge-offset": offset,
                transition: "stroke-dashoffset 1.5s ease-out",
              } as React.CSSProperties
            }
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold font-mono text-foreground">
            {probability}%
          </span>
          <span className="text-xs text-muted-foreground">Churn Risk</span>
        </div>
      </div>
    </div>
  );
};

export default RiskGauge;
