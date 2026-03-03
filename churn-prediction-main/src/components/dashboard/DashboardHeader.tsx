import { Activity } from "lucide-react";

const DashboardHeader = () => (
  <header className="border-b border-border px-6 py-5">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
        <Activity className="h-5 w-5 text-primary" />
      </div>
      <div>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Customer Churn Risk Intelligence
        </h1>
        <p className="text-sm text-muted-foreground">
          Predictive Revenue Risk Analysis Dashboard
        </p>
      </div>
    </div>
  </header>
);

export default DashboardHeader;
