export interface User {
  id: number;                       // INT, PK
  user_id: string;                  // VARCHAR(36), UUID
  user_name: string;                // VARCHAR(64)
  email: string;                    // VARCHAR(100)
  password: string;                 // VARCHAR(100) - usually not sent to client
  first_name: string;               // VARCHAR(100)
  last_name: string;                // VARCHAR(100)
  phone_number: string;             // VARCHAR(20)
  verification_code: string;        // VARCHAR(12)
  is_active: boolean;               // BIT
  is_blocked: boolean;              // BIT
  is_reported: boolean;             // BIT
  is_special: boolean;              // BIT
  login_type: number;               // SMALLINT
  user_type: number;                // SMALLINT
  status: number;                   // SMALLINT
  suscription_id: number;           // SMALLINT (note: "suscription" as in schema)
  birthday: string | null;          // DATE -> ISO string like 'YYYY-MM-DD' or null
  alias: string;                    // VARCHAR(64)
  last_login: string | null;        // DATETIME -> ISO string
  created_at: string;               // DATETIME -> ISO string
  updated_at: string | null;        // DATETIME -> ISO string or null
}
