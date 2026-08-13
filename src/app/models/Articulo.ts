 export interface Articulo {
  id: number;                       // INT, PK
  nombre_producto: string;                  // VARCHAR(100)
  id_familia: number;
  id_ubicacion: number;
  id_unidad: number;
  cantidad: number;
  costo: number;
  valor_inventario: number;
  minima_cantidad: number;
  updated_by: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  }
  