import { useState } from "react";
import { CreditCard, ArrowRight, Sparkles } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import DataTable from "@/components/DataTable";
import TemplateSelector from "@/components/TemplateSelector";
import IDCardGrid from "@/components/IDCardGrid";
import type { MemberData, TemplateConfig } from "@/lib/types";

const SAMPLE_DATA: MemberData[] = [
  {
    id: "demo-1",
    Name: "A. Hayaan",
    ID_Number: "0652",
    Photo_URL: "",
    Department: "PP-I",
    Role: "Student",
    Phone: "9912400147",
    Email: "",
    Father_Name: "G. Srinivas",
    Class_Section: "PP-I",
    Roll_Number: "0652",
    Village: "Nedunoor (V)",
  },
  {
    id: "demo-2",
    Name: "A. Shreyansh",
    ID_Number: "0653",
    Photo_URL: "",
    Department: "PP-I",
    Role: "Student",
    Phone: "9951952451",
    Email: "",
    Father_Name: "A. Mahesh",
    Class_Section: "PP-I",
    Roll_Number: "0653",
    Village: "Debbadaguda",
  },
  {
    id: "demo-3",
    Name: "B. Saiteja",
    ID_Number: "0655",
    Photo_URL: "",
    Department: "PP-I",
    Role: "Student",
    Phone: "8065960789",
    Email: "",
    Father_Name: "B. Raju",
    Class_Section: "PP-I",
    Roll_Number: "0655",
    Village: "Nedunoor",
  },
  {
    id: "demo-4",
    Name: "K. Sanketh",
    ID_Number: "0654",
    Photo_URL: "",
    Department: "PP-I",
    Role: "Student",
    Phone: "8340896075",
    Email: "",
    Father_Name: "K. Yanigiri",
    Class_Section: "PP-I",
    Roll_Number: "0654",
    Village: "Kandukoor (V)",
  },
];

export default function Index() {
  const [members, setMembers] = useState<MemberData[]>([]);
  const [config, setConfig] = useState<TemplateConfig>({
    style: "school",
    orientation: "portrait",
    orgName: "Creek School",
  });
  const [step, setStep] = useState<"upload" | "generate">("upload");

  const hasData = members.length > 0;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container flex items-center gap-3 py-3">
          <div className="flex items-center justify-center rounded-lg bg-secondary p-1.5">
            <CreditCard className="h-4 w-4 text-secondary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-none">ID Card Generator</h1>
            <p className="text-[11px] text-muted-foreground">Upload Excel · Generate Bulk ID Cards</p>
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Hero */}
        {!hasData && (
          <section className="animate-fade-up text-center space-y-3 py-6">
            <h2 className="text-2xl font-extrabold tracking-tight" style={{ lineHeight: 1.1 }}>
              Generate Professional ID Cards<br />
              <span className="text-secondary">from a Spreadsheet</span>
            </h2>
            <p className="mx-auto max-w-md text-sm text-muted-foreground">
              Upload your Excel or CSV file with member details, pick a template, and download print-ready ID cards in seconds.
            </p>
          </section>
        )}

        {/* Step 1: Upload */}
        <section className="animate-fade-up" style={{ animationDelay: "100ms" }}>
          <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] text-secondary-foreground font-bold">1</span>
            Upload Data
          </div>
          <FileUpload onDataParsed={(d) => { setMembers(d); if (d.length) setStep("upload"); }} />

          {!hasData && (
            <button
              onClick={() => { setMembers(SAMPLE_DATA); }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-secondary font-medium hover:underline active:scale-95"
            >
              <Sparkles className="h-3 w-3" /> Try with sample data
            </button>
          )}
        </section>

        {/* Data Table */}
        {hasData && (
          <section className="animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] text-secondary-foreground font-bold">2</span>
              Review & Edit Data
            </div>
            <DataTable data={members} onUpdate={setMembers} />
          </section>
        )}

        {/* Template selector + generate */}
        {hasData && (
          <section className="animate-fade-up" style={{ animationDelay: "200ms" }}>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] text-secondary-foreground font-bold">3</span>
              Choose Template
            </div>
            <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
              <TemplateSelector config={config} onChange={setConfig} />
              <div>
                {step === "upload" && (
                  <button
                    onClick={() => setStep("generate")}
                    className="mb-5 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow transition-all hover:shadow-md active:scale-[0.97]"
                  >
                    Generate ID Cards <ArrowRight className="h-4 w-4" />
                  </button>
                )}
                {step === "generate" && <IDCardGrid data={members} config={config} />}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
