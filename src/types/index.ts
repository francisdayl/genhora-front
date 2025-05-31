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
