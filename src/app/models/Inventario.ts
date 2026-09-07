export interface Inventario {
  id: number;                       // INT, PK
  id_familia: number;
  id_ubicacion: number;
  id_unidad: number;
  id_marca: number;
  cantidad: number;
  costo: number;
  minima_cantidad: number;
  updated_at: Date | string;
  nombre_producto: string;                  // VARCHAR(100)
  nombre_familia: string;                  // VARCHAR(100)
  nombre_ubicacion: string;                  // VARCHAR(100)  
  nombre_medida: string;                  // VARCHAR(100)
  nombre_marca: string;                  // VARCHAR(100)  

  }
  