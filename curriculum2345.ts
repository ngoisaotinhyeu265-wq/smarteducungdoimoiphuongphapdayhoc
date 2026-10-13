/**
 * Types & Interfaces for Phụ Lục 2 Kế Hoạch Dạy Học Môn Tiếng Anh theo Công Văn 2345/BGDĐT-GDTH
 */

export type ActivityScope = 'all' | 'act123' | 'act456';

export interface TopicIntegrationResult {
  aiCode: string;
  aiDesc: string;
  nlsDesc: string;
  atgtDesc: string;
  knsDesc: string;
  ethicsDesc: string;
  devicesDesc: string;
}

export interface PeriodIntegrationOverride {
  isIntegrated?: boolean;
  activityScope?: ActivityScope;
  enableAI?: boolean;
  enableNLS?: boolean;
  enableATGT?: boolean;
  enableKNS?: boolean;
  enableEthics?: boolean;
  enableInclusive?: boolean;
  customIntegrations?: Array<{
    id: string;
    code: string;
    domain: string;
    domainLabelVn: string;
    domainLabelEn: string;
    contentVn: string;
    contentEn: string;
    enabled?: boolean;
  }>;
}

export interface UnitIntegrationOverride {
  isIntegrated?: boolean;
  activityScope?: ActivityScope;
}

export interface CurriculumPlanRow {
  globalIndex: number;
  week: number;
  weekLabel: string;
  month: string;
  semester: 1 | 2;
  theme: string;
  unitCode: string;
  lessonTitle: string;
  periodLabel: string;
  periodNumber: number;
  periodInWeek: number;
  detailedContent: string;
  suggestedGame: string;
  pageRange: string;
  isIntegrated: boolean;
  activityScope: ActivityScope;
  activityScopeLabel: string;
  isAIEnabled: boolean;
  isNLSEnabled: boolean;
  isATGTEnabled: boolean;
  isKNSEnabled: boolean;
  isEthicsEnabled: boolean;
  isDevicesEnabled: boolean;
  adjustment: {
    ai: string;
    atgt: string;
    kns: string;
    ethics: string;
    atgt_kns: string;
    nls: string;
    devices: string;
    inclusive?: string;
    customDomain?: string;
    customCode?: string;
  };
  customIntegrations?: Array<{
    id: string;
    code: string;
    domain: string;
    domainLabelVn: string;
    domainLabelEn: string;
    contentVn: string;
    contentEn: string;
    enabled?: boolean;
  }>;
  note: string;
  periodIndexInWeek: number;
}

export interface AdminDocumentInfo {
  schoolName: string;
  departmentName: string;
  teacherName: string;
  academicYear: string;
  principalName: string;
  cityDate: string;
}
