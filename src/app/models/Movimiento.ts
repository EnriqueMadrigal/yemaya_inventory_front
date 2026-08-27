export interface Movimiento {
  id: number;                       // INT, PK
  id_articulo: number;
  id_medida: number;
  cantidad: number;
  tipo: number;
  costo: number;
  updated_by: number;
  created_at?: Date | string;
  observaciones: string;
  }
  