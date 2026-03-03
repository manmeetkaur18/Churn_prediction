import { useState, useCallback } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import CustomerInputPanel, {
  defaultData,
  type CustomerData,
} from "@/components/dashboard/CustomerInputPanel";
import ResultsDashboard, {
  type AnalysisResult,
} from "@/components/dashboard/ResultsDashboard";

function simulateAnalysis(data: CustomerData): AnalysisResult {
  let score = 20;

  if (data.contract === "Month-to-month") score += 25;
  if (data.internetService === "Fiber optic") score += 10;
  if (data.paymentMethod === "Electronic check") score += 10;
  if (data.paperlessBilling === "Yes") score += 5;
  if (data.tenure < 12) score += 15;
  else if (data.tenure < 24) score += 5;
  else score -= 10;
  if (data.onlineSecurity === "No") score += 5;
  if (data.techSupport === "No") score += 5;
  if (data.monthlyCharges > 70) score += 5;
  if (data.seniorCitizen === "Yes") score += 5;
  if (data.dependents === "No") score += 3;

  const churnProbability = Math.min(Math.max(Math.round(score), 5), 95);
  const revenueAtRisk = Math.round(data.monthlyCharges * 12 * (churnProbability / 100));
  const riskCategory: AnalysisResult["riskCategory"] =
    churnProbability < 30 ? "Low" : churnProbability < 60 ? "Medium" : "High";

  const factors = [
    { name: "Contract Type", impact: data.contract === "Month-to-month" ? 85 : 20 },
    { name: "Tenure", impact: data.tenure < 12 ? 72 : data.tenure < 24 ? 40 : 15 },
    { name: "Internet Service", impact: data.internetService === "Fiber optic" ? 65 : 20 },
    { name: "Payment Method", impact: data.paymentMethod === "Electronic check" ? 58 : 15 },
    { name: "Tech Support", impact: data.techSupport === "No" ? 48 : 10 },
    { name: "Monthly Charges", impact: Math.min(Math.round(data.monthlyCharges), 100) },
  ].sort((a, b) => b.impact - a.impact);

  return { churnProbability, revenueAtRisk, riskCategory, factors };
}

const Index = () => {
  const [customerData, setCustomerData] = useState<CustomerData>(defaultData);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setResult(simulateAnalysis(customerData));
      setLoading(false);
    }, 800);
  }, [customerData]);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-4">
            <CustomerInputPanel
              data={customerData}
              onChange={setCustomerData}
              onAnalyze={handleAnalyze}
              loading={loading}
            />
          </aside>
          <section className="lg:col-span-8">
            <ResultsDashboard result={result} />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Index;
