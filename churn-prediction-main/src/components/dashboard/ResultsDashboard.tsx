import KPICard from "./KPICard";
import RiskGauge from "./RiskGauge";
import RiskFactorsChart, { type RiskFactor } from "./RiskFactorsChart";

export interface AnalysisResult {
  churnProbability: number;
  revenueAtRisk: number;
  riskCategory: "Low" | "Medium" | "High";
  factors: RiskFactor[];
}

interface Props {
  result: AnalysisResult | null;
}

const ResultsDashboard = ({ result }: Props) => {
  if (!result) {
    return (
      <div className="card-elevated p-12 flex items-center justify-center">
        <p className="text-muted-foreground text-sm">
          Configure customer profile and run analysis to see results.
        </p>
      </div>
    );
  }

  const riskVariant =
    result.riskCategory === "Low"
      ? "success"
      : result.riskCategory === "Medium"
        ? "warning"
        : "destructive";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          label="Churn Probability"
          value={`${result.churnProbability}%`}
          subtitle="Predicted likelihood"
          variant={riskVariant}
        />
        <KPICard
          label="Revenue at Risk"
          value={`$${result.revenueAtRisk.toLocaleString()}`}
          subtitle="Annualized estimate"
          variant={riskVariant}
        />
        <KPICard
          label="Risk Category"
          value={result.riskCategory}
          subtitle="Based on threshold analysis"
          variant={riskVariant}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RiskGauge probability={result.churnProbability} />
        <div className="lg:col-span-2">
          <RiskFactorsChart factors={result.factors} />
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
