export interface User {
  id?: string;
  vorname: string;
  nachname: string;
  geburtsdatum?: number;
  strasse: string;
  plz: string;
  ort: string;
  telefon: string;
  email: string;
  notes?: UserNote[];
}

export interface UserNote {
  id?: string;
  text: string;
  createdAt: number;
  createdBy?: string;
}
