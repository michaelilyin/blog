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

export interface Experience {
  spec: TechSpec;
  days: number;
}

export interface TopExperienceResponse {
  topExperience: Experience[];
}
