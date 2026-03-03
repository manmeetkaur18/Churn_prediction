import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: string;
  subtitle?: string;
  variant?: "default" | "success" | "warning" | "destructive";
}

const variantStyles = {
  default: "border-border",
  success: "border-success/30 glow-success",
  warning: "border-warning/30 glow-warning",
  destructive: "border-destructive/30 glow-destructive",
};

const valueStyles = {
  default: "text-foreground",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

const KPICard = ({ label, value, subtitle, variant = "default" }: Props) => (
  <div className={cn("card-elevated p-5 flex flex-col gap-1", variantStyles[variant])}>
    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
      {label}
    </span>
    <span className={cn("text-2xl font-bold font-mono tracking-tight", valueStyles[variant])}>
      {value}
    </span>
    {subtitle && (
      <span className="text-xs text-muted-foreground">{subtitle}</span>
    )}
  </div>
);

export default KPICard;
