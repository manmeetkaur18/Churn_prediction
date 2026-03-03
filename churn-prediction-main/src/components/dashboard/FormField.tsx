import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFieldProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

export const SelectField = ({ label, options, value, onChange }: SelectFieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
      {label}
    </Label>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="bg-secondary border-border text-foreground h-9 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border z-50">
        {options.map((o) => (
          <SelectItem key={o} value={o}>
            {o}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
}

export const NumberField = ({ label, value, onChange, prefix }: NumberFieldProps) => (
  <div className="space-y-1.5">
    <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
      {label}
    </Label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
          {prefix}
        </span>
      )}
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`bg-secondary border-border text-foreground h-9 text-sm ${prefix ? "pl-7" : ""}`}
      />
    </div>
  </div>
);
