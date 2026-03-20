import { User, Phone, Mail, Building2, Briefcase } from "lucide-react";
import type { MemberData, TemplateConfig } from "@/lib/types";

interface IDCardProps {
  member: MemberData;
  config: TemplateConfig;
  forExport?: boolean;
}

export default function IDCard({ member, config, forExport = false }: IDCardProps) {
  const isLandscape = config.orientation === "landscape";
  const baseW = isLandscape ? 420 : 280;
  const baseH = isLandscape ? 260 : 400;

  const cardStyle: React.CSSProperties = {
    width: baseW,
    height: baseH,
    fontFamily: "Inter, system-ui, sans-serif",
  };

  const renderCorporate = () => (
    <div
      style={cardStyle}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary/90 text-primary-foreground shadow-lg"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.15em] opacity-80">
          {config.orgName || "Organization"}
        </span>
        <span className="rounded bg-accent/90 px-2 py-0.5 text-[9px] font-bold text-accent-foreground">
          {member.Department || "STAFF"}
        </span>
      </div>

      <div className={`flex gap-4 px-4 ${isLandscape ? "flex-row items-center" : "flex-col items-center pt-2"}`}>
        {/* Photo */}
        <div className={`flex-shrink-0 overflow-hidden rounded-lg border-2 border-primary-foreground/20 bg-primary-foreground/10 ${isLandscape ? "h-[120px] w-[100px]" : "h-[110px] w-[100px]"}`}>
          {member.Photo_URL ? (
            <img src={member.Photo_URL} alt={member.Name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-10 w-10 opacity-40" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className={`flex flex-col gap-1.5 ${isLandscape ? "" : "items-center text-center"}`}>
          <h4 className="text-base font-bold leading-tight">{member.Name || "Full Name"}</h4>
          <p className="text-[11px] font-medium opacity-80">{member.Role || "Position"}</p>
          <p className="rounded bg-primary-foreground/10 px-2 py-0.5 text-[10px] font-mono tabular-nums tracking-wide">
            {member.ID_Number}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-x-4 gap-y-1 border-t border-primary-foreground/10 bg-primary-foreground/5 px-4 py-2">
        {member.Phone && (
          <span className="flex items-center gap-1 text-[9px] opacity-70">
            <Phone className="h-2.5 w-2.5" /> {member.Phone}
          </span>
        )}
        {member.Email && (
          <span className="flex items-center gap-1 text-[9px] opacity-70 truncate max-w-[160px]">
            <Mail className="h-2.5 w-2.5" /> {member.Email}
          </span>
        )}
      </div>
    </div>
  );

  const renderModern = () => (
    <div style={cardStyle} className="relative overflow-hidden rounded-xl bg-card shadow-lg border">
      {/* Top accent strip */}
      <div className="h-1.5 bg-gradient-to-r from-secondary to-secondary/60" />

      <div className={`flex gap-4 p-4 ${isLandscape ? "flex-row items-start" : "flex-col items-center pt-4"}`}>
        <div className={`flex-shrink-0 overflow-hidden rounded-full border-[3px] border-secondary/20 bg-muted ${isLandscape ? "h-[90px] w-[90px]" : "h-[100px] w-[100px]"}`}>
          {member.Photo_URL ? (
            <img src={member.Photo_URL} alt={member.Name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
          )}
        </div>

        <div className={`flex flex-col gap-1 ${isLandscape ? "" : "items-center text-center"}`}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-secondary">
            {config.orgName || "Organization"}
          </p>
          <h4 className="text-[15px] font-bold leading-tight text-foreground">{member.Name || "Full Name"}</h4>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Briefcase className="h-3 w-3" /> {member.Role || "Position"}
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Building2 className="h-3 w-3" /> {member.Department || "Department"}
          </div>
          <span className="mt-1 inline-block rounded-md bg-secondary/10 px-2 py-0.5 text-[10px] font-semibold text-secondary tabular-nums">
            {member.ID_Number}
          </span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex gap-4 border-t bg-muted/30 px-4 py-2 text-[9px] text-muted-foreground">
        {member.Phone && <span className="flex items-center gap-1"><Phone className="h-2.5 w-2.5" />{member.Phone}</span>}
        {member.Email && <span className="flex items-center gap-1 truncate"><Mail className="h-2.5 w-2.5" />{member.Email}</span>}
      </div>
    </div>
  );

  const renderMinimal = () => (
    <div style={cardStyle} className="relative overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className={`flex h-full ${isLandscape ? "flex-row" : "flex-col"}`}>
        <div className={`flex-shrink-0 bg-muted ${isLandscape ? "w-[140px]" : "h-[140px]"}`}>
          {member.Photo_URL ? (
            <img src={member.Photo_URL} alt={member.Name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className="h-12 w-12 text-muted-foreground/40" />
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 p-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-secondary">
            {config.orgName || "Organization"}
          </p>
          <h4 className="text-sm font-bold text-foreground">{member.Name || "Full Name"}</h4>
          <p className="text-[11px] text-muted-foreground">{member.Role} · {member.Department}</p>
          <span className="text-[10px] font-mono tabular-nums text-muted-foreground">{member.ID_Number}</span>
          <div className="mt-auto flex flex-wrap gap-3 text-[9px] text-muted-foreground">
            {member.Phone && <span>{member.Phone}</span>}
            {member.Email && <span className="truncate max-w-[130px]">{member.Email}</span>}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={forExport ? "" : "transition-transform hover:scale-[1.02] duration-200"}>
      {config.style === "corporate" && renderCorporate()}
      {config.style === "modern" && renderModern()}
      {config.style === "minimal" && renderMinimal()}
    </div>
  );
}
