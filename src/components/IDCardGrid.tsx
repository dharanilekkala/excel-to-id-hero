import { useRef, useState } from "react";
import { Download, Loader2, Eye } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import IDCard from "./IDCard";
import type { MemberData, TemplateConfig } from "@/lib/types";

interface IDCardGridProps {
  data: MemberData[];
  config: TemplateConfig;
}

export default function IDCardGrid({ data, config }: IDCardGridProps) {
  const [generating, setGenerating] = useState(false);
  const [previewIdx, setPreviewIdx] = useState<number | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  const downloadPDF = async () => {
    setGenerating(true);
    try {
      const isLandscape = config.orientation === "landscape";
      const cardW = isLandscape ? 420 : 280;
      const cardH = isLandscape ? 260 : 400;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 30;
      const gap = 16;

      const cols = Math.floor((pageW - 2 * margin + gap) / (cardW * 0.68 + gap));
      const scale = (pageW - 2 * margin - (cols - 1) * gap) / (cols * cardW);
      const scaledW = cardW * scale;
      const scaledH = cardH * scale;

      let x = margin;
      let y = margin;

      for (let i = 0; i < data.length; i++) {
        const el = document.getElementById(`export-card-${i}`);
        if (!el) continue;

        const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: null });
        const imgData = canvas.toDataURL("image/png");

        if (y + scaledH > pageH - margin && i > 0) {
          pdf.addPage();
          x = margin;
          y = margin;
        }

        pdf.addImage(imgData, "PNG", x, y, scaledW, scaledH);
        x += scaledW + gap;

        if (x + scaledW > pageW - margin + 1) {
          x = margin;
          y += scaledH + gap;
        }
      }

      pdf.save(`id-cards-${Date.now()}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    }
    setGenerating(false);
  };

  if (data.length === 0) return null;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">ID Card Preview</h3>
        <button
          onClick={downloadPDF}
          disabled={generating}
          className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.97] disabled:opacity-60"
        >
          {generating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
          {generating ? "Generating…" : "Download All as PDF"}
        </button>
      </div>

      {/* Visible grid */}
      <div className="flex flex-wrap gap-4">
        {data.map((member, i) => (
          <div key={member.id} className="relative group">
            <IDCard member={member} config={config} />
            <button
              onClick={() => setPreviewIdx(i)}
              className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary/0 opacity-0 transition-all group-hover:bg-primary/30 group-hover:opacity-100"
            >
              <Eye className="h-6 w-6 text-primary-foreground drop-shadow" />
            </button>
          </div>
        ))}
      </div>

      {/* Hidden export cards */}
      <div className="fixed left-[-9999px] top-0" ref={exportRef}>
        {data.map((member, i) => (
          <div key={member.id} id={`export-card-${i}`}>
            <IDCard member={member} config={config} forExport />
          </div>
        ))}
      </div>

      {/* Lightbox preview */}
      {previewIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setPreviewIdx(null)}
        >
          <div onClick={(e) => e.stopPropagation()} className="animate-fade-up">
            <IDCard member={data[previewIdx]} config={config} />
            <div className="mt-3 flex justify-center gap-2">
              <button
                onClick={() => setPreviewIdx(Math.max(0, previewIdx - 1))}
                disabled={previewIdx === 0}
                className="rounded-lg bg-card px-3 py-1.5 text-xs font-medium shadow disabled:opacity-30 active:scale-95"
              >
                ← Prev
              </button>
              <span className="flex items-center text-xs text-primary-foreground/70 font-mono tabular-nums">
                {previewIdx + 1}/{data.length}
              </span>
              <button
                onClick={() => setPreviewIdx(Math.min(data.length - 1, previewIdx + 1))}
                disabled={previewIdx === data.length - 1}
                className="rounded-lg bg-card px-3 py-1.5 text-xs font-medium shadow disabled:opacity-30 active:scale-95"
              >
                Next →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
