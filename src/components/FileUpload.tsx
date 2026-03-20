import { useCallback, useState } from "react";
import { Upload, FileSpreadsheet, X } from "lucide-react";
import * as XLSX from "xlsx";
import type { MemberData } from "@/lib/types";

interface FileUploadProps {
  onDataParsed: (data: MemberData[]) => void;
}

export default function FileUpload({ onDataParsed }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (!["xlsx", "xls", "csv"].includes(ext || "")) {
        setError("Please upload an .xlsx, .xls, or .csv file");
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: "array" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const json = XLSX.utils.sheet_to_json<Record<string, string>>(sheet);

          const members: MemberData[] = json.map((row, i) => ({
            id: crypto.randomUUID(),
            Name: row.Name || row.name || "",
            ID_Number: row.ID_Number || row.id_number || row.ID || `ID-${i + 1}`,
            Photo_URL: row.Photo_URL || row.photo_url || row.Photo || "",
            Department: row.Department || row.department || "",
            Role: row.Role || row.role || row.Position || "",
            Phone: row.Phone || row.phone || "",
            Email: row.Email || row.email || "",
            Address: row.Address || row.address,
            Blood_Group: row.Blood_Group || row.blood_group,
            Joining_Date: row.Joining_Date || row.joining_date,
          }));

          if (members.length === 0) {
            setError("No data rows found in the file");
            return;
          }
          onDataParsed(members);
        } catch {
          setError("Failed to parse the file. Please check the format.");
        }
      };
      reader.readAsArrayBuffer(file);
    },
    [onDataParsed]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const clear = () => {
    setFileName(null);
    setError(null);
    onDataParsed([]);
  };

  return (
    <div className="w-full">
      {fileName ? (
        <div className="flex items-center gap-3 rounded-lg border border-secondary/30 bg-secondary/5 px-4 py-3">
          <FileSpreadsheet className="h-5 w-5 text-secondary" />
          <span className="flex-1 truncate text-sm font-medium">{fileName}</span>
          <button onClick={clear} className="rounded p-1 hover:bg-muted transition-colors active:scale-95">
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed p-10 transition-all duration-200 ${
            isDragging
              ? "border-secondary bg-secondary/5 scale-[1.01]"
              : "border-border hover:border-secondary/50 hover:bg-muted/50"
          }`}
        >
          <div className="rounded-full bg-secondary/10 p-3">
            <Upload className="h-6 w-6 text-secondary" />
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold">Drop your spreadsheet here</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Supports .xlsx, .xls, and .csv files
            </p>
          </div>
          <input type="file" accept=".xlsx,.xls,.csv" onChange={handleChange} className="hidden" />
        </label>
      )}
      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}
    </div>
  );
}
