export interface Project {
  id: string;
  title: string;
  description: string;
  begin: Date;
  end: Date;
  nda: boolean;
}

export interface Tech {
  id: string;
  title: string;
  description: string | undefined | null;
  specs: TechSpec[];
}

export interface TechSpec {
  id: string;
  title: string;
  description: string | undefined | null;
  tech: Tech;
}

export interface UsageNote {
  id: string;
  description: string;
  note: string;
  format: string;
  spec: TechSpec;
  date: Date;
}

export interface SpecUsage {
  spec: TechSpec;
  project: Project;
  begin: Date;
  end: Date;
  notes: UsageNote[];
}

export interface Experience {
  spec: TechSpec;
  days: number;
}

export interface TopExperienceResponse {
  topExperience: Experience[];
}

export interface LastUsageResponse {
  lastUsages: SpecUsage[];
}

export interface RecentUsageNotesResponse {
  recentUsageNotes: UsageNote[];
}
