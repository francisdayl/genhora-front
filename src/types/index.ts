export interface UserLoginData {
  email: string;
}

export interface UserData {
  email: string;
  exp: number;
  generations: number;
}

interface Filters {
  INICIO: string;
  FIN: string;
  MAXIMO_MATERIAS_DIA: number;
  ESPERA: string;
}

export interface GenHoraPayload {
  filtros: Filters;
  materias: Record<string, string[]>;
}

export interface Subject {
  code: string;
  name: string;
}

export interface SubjectWithParallels {
  code: string;
  name: string;
  parallels: string[];
}

export interface Preferences {
  startTime: string;
  endTime: string;
  maxSubjectsPerDay: number;
}

export type WorkflowStep =
  | 'choose-subjects'
  | 'choose-parallels'
  | 'preferences'
  | 'download';
