export interface MemberData {
  id: string;
  Name: string;
  ID_Number: string;
  Photo_URL: string;
  Department: string;
  Role: string;
  Phone: string;
  Email: string;
  Address?: string;
  Blood_Group?: string;
  Joining_Date?: string;
}

export type TemplateStyle = "corporate" | "modern" | "minimal";
export type TemplateOrientation = "portrait" | "landscape";

export interface TemplateConfig {
  style: TemplateStyle;
  orientation: TemplateOrientation;
  orgName: string;
  orgLogo?: string;
}
