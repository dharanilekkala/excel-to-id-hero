import { CreditCard, LayoutTemplate, Minus } from "lucide-react";
import type { TemplateStyle, TemplateOrientation, TemplateConfig } from "@/lib/types";

interface TemplateSelectorProps {
  config: TemplateConfig;
  onChange: (config: TemplateConfig) => void;
}

const STYLES: { value: TemplateStyle; label: string; icon: React.ReactNode }[] = [
  { value: "corporate", label: "Corporate", icon: <CreditCard className="h-4 w-4" /> },
  { value: "modern", label: "Modern", icon: <LayoutTemplate className="h-4 w-4" /> },
  { value: "minimal", label: "Minimal", icon: <Minus className="h-4 w-4" /> },
];

export default function TemplateSelector({ config, onChange }: TemplateSelectorProps) {
  const set = (partial: Partial<TemplateConfig>) => onChange({ ...config, ...partial });

  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm space-y-4">
      <h3 className="text-sm font-semibold">Template Settings</h3>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Organization Name</label>
        <input
          value={config.orgName}
          onChange={(e) => set({ orgName: e.target.value })}
          placeholder="Acme Corporation"
          className="w-full rounded-lg border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Style</label>
        <div className="flex gap-2">
          {STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => set({ style: s.value })}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all active:scale-[0.97] ${
                config.style === s.value
                  ? "border-secondary bg-secondary/10 text-secondary"
                  : "border-border hover:border-secondary/40"
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Orientation</label>
        <div className="flex gap-2">
          {(["portrait", "landscape"] as TemplateOrientation[]).map((o) => (
            <button
              key={o}
              onClick={() => set({ orientation: o })}
              className={`rounded-lg border px-3 py-2 text-xs font-medium capitalize transition-all active:scale-[0.97] ${
                config.orientation === o
                  ? "border-secondary bg-secondary/10 text-secondary"
                  : "border-border hover:border-secondary/40"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
