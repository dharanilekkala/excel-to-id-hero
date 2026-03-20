import { useState } from "react";
import { Pencil, Check, X, Users } from "lucide-react";
import type { MemberData } from "@/lib/types";

interface DataTableProps {
  data: MemberData[];
  onUpdate: (data: MemberData[]) => void;
}

const VISIBLE_FIELDS: (keyof MemberData)[] = [
  "Name", "ID_Number", "Department", "Role", "Phone", "Email",
];

export default function DataTable({ data, onUpdate }: DataTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRow, setEditRow] = useState<MemberData | null>(null);

  const startEdit = (member: MemberData) => {
    setEditingId(member.id);
    setEditRow({ ...member });
  };

  const saveEdit = () => {
    if (!editRow) return;
    onUpdate(data.map((m) => (m.id === editRow.id ? editRow : m)));
    setEditingId(null);
    setEditRow(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditRow(null);
  };

  if (data.length === 0) return null;

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 border-b px-5 py-3.5">
        <Users className="h-4 w-4 text-secondary" />
        <h3 className="text-sm font-semibold">{data.length} Members Loaded</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              {VISIBLE_FIELDS.map((f) => (
                <th key={f} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {f.replace("_", " ")}
                </th>
              ))}
              <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((member) => (
              <tr key={member.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                {VISIBLE_FIELDS.map((field) => (
                  <td key={field} className="px-4 py-2.5">
                    {editingId === member.id ? (
                      <input
                        value={(editRow as any)?.[field] || ""}
                        onChange={(e) =>
                          setEditRow((prev) => prev ? { ...prev, [field]: e.target.value } : null)
                        }
                        className="w-full rounded border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
                      />
                    ) : (
                      <span className="truncate block max-w-[180px]">{(member as any)[field] || "—"}</span>
                    )}
                  </td>
                ))}
                <td className="px-4 py-2.5 text-right">
                  {editingId === member.id ? (
                    <span className="inline-flex gap-1">
                      <button onClick={saveEdit} className="rounded p-1.5 text-secondary hover:bg-secondary/10 transition-colors active:scale-95">
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button onClick={cancelEdit} className="rounded p-1.5 text-muted-foreground hover:bg-muted transition-colors active:scale-95">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  ) : (
                    <button onClick={() => startEdit(member)} className="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors active:scale-95">
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
