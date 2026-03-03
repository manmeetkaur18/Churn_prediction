import { SelectField, NumberField } from "./FormField";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

export interface CustomerData {
  gender: string;
  seniorCitizen: string;
  partner: string;
  dependents: string;
  tenure: number;
  contract: string;
  paymentMethod: string;
  paperlessBilling: string;
  phoneService: string;
  multipleLines: string;
  internetService: string;
  onlineSecurity: string;
  onlineBackup: string;
  deviceProtection: string;
  techSupport: string;
  streamingTV: string;
  streamingMovies: string;
  monthlyCharges: number;
  totalCharges: number;
}

const defaultData: CustomerData = {
  gender: "Male",
  seniorCitizen: "No",
  partner: "Yes",
  dependents: "No",
  tenure: 12,
  contract: "Month-to-month",
  paymentMethod: "Electronic check",
  paperlessBilling: "Yes",
  phoneService: "Yes",
  multipleLines: "No",
  internetService: "Fiber optic",
  onlineSecurity: "No",
  onlineBackup: "No",
  deviceProtection: "No",
  techSupport: "No",
  streamingTV: "No",
  streamingMovies: "No",
  monthlyCharges: 79.85,
  totalCharges: 958.2,
};

interface Props {
  data: CustomerData;
  onChange: (data: CustomerData) => void;
  onAnalyze: () => void;
  loading: boolean;
}

const YN = ["Yes", "No"];
const YNI = ["Yes", "No", "No internet service"];
const YNP = ["Yes", "No", "No phone service"];

const SectionTitle = ({ title }: { title: string }) => (
  <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-3 mt-1">
    {title}
  </h3>
);

const CustomerInputPanel = ({ data, onChange, onAnalyze, loading }: Props) => {
  const set = (key: keyof CustomerData) => (val: string | number) =>
    onChange({ ...data, [key]: val });

  return (
    <div className="card-elevated p-5 space-y-6">
      <h2 className="text-sm font-semibold text-foreground tracking-wide">Customer Profile</h2>

      {/* Demographics */}
      <div>
        <SectionTitle title="A · Demographics" />
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Gender" options={["Male", "Female"]} value={data.gender} onChange={set("gender")} />
          <SelectField label="Senior Citizen" options={YN} value={data.seniorCitizen} onChange={set("seniorCitizen")} />
          <SelectField label="Partner" options={YN} value={data.partner} onChange={set("partner")} />
          <SelectField label="Dependents" options={YN} value={data.dependents} onChange={set("dependents")} />
        </div>
      </div>

      {/* Account */}
      <div>
        <SectionTitle title="B · Account Information" />
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Tenure (months)" value={data.tenure} onChange={set("tenure") as (v: number) => void} />
          <SelectField label="Contract" options={["Month-to-month", "One year", "Two year"]} value={data.contract} onChange={set("contract")} />
          <SelectField label="Payment Method" options={["Electronic check", "Mailed check", "Bank transfer", "Credit card"]} value={data.paymentMethod} onChange={set("paymentMethod")} />
          <SelectField label="Paperless Billing" options={YN} value={data.paperlessBilling} onChange={set("paperlessBilling")} />
        </div>
      </div>

      {/* Services */}
      <div>
        <SectionTitle title="C · Services" />
        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Phone Service" options={YN} value={data.phoneService} onChange={set("phoneService")} />
          <SelectField label="Multiple Lines" options={YNP} value={data.multipleLines} onChange={set("multipleLines")} />
          <SelectField label="Internet Service" options={["DSL", "Fiber optic", "No"]} value={data.internetService} onChange={set("internetService")} />
          <SelectField label="Online Security" options={YNI} value={data.onlineSecurity} onChange={set("onlineSecurity")} />
          <SelectField label="Online Backup" options={YNI} value={data.onlineBackup} onChange={set("onlineBackup")} />
          <SelectField label="Device Protection" options={YNI} value={data.deviceProtection} onChange={set("deviceProtection")} />
          <SelectField label="Tech Support" options={YNI} value={data.techSupport} onChange={set("techSupport")} />
          <SelectField label="Streaming TV" options={YNI} value={data.streamingTV} onChange={set("streamingTV")} />
          <SelectField label="Streaming Movies" options={YNI} value={data.streamingMovies} onChange={set("streamingMovies")} />
        </div>
      </div>

      {/* Financial */}
      <div>
        <SectionTitle title="D · Financial" />
        <div className="grid grid-cols-2 gap-3">
          <NumberField label="Monthly Charges" value={data.monthlyCharges} onChange={set("monthlyCharges") as (v: number) => void} prefix="$" />
          <NumberField label="Total Charges" value={data.totalCharges} onChange={set("totalCharges") as (v: number) => void} prefix="$" />
        </div>
      </div>

      <Button
        onClick={onAnalyze}
        disabled={loading}
        className="w-full h-11 bg-primary text-primary-foreground font-semibold tracking-wide hover:bg-primary/90 glow-primary transition-all"
      >
        <Zap className="h-4 w-4 mr-2" />
        {loading ? "Analyzing…" : "Run Risk Analysis"}
      </Button>
    </div>
  );
};

export { defaultData };
export default CustomerInputPanel;
