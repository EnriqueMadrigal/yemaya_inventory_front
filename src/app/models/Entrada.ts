export interface Entrada {
  id: number;                       // INT, PK
  id_articulo: number;
  id_medida: number;
  cantidad: number;
  tipo: number;
  costo: number;
  updated_by: number;
  created_at?: Date | string;
  observaciones: string;
  nombre_producto: string;
  nombre_medida: string;
  first_name: string;
  last_name: string;
  }
  