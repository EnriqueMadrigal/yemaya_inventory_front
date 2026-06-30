export type AlertType = 'success' | 'info' | 'warning' | 'danger';


export interface AlertOptions {
  title?: string;
  message: string;
  type?: AlertType;
  okText?: string;
  cancelText?: string;   // only used for confirm
  autoCloseMs?: number;  // if set, closes automatically after this time
  backdrop?: boolean | 'static'; // Bootstrap backdrop option
  keyboard?: boolean;    // Bootstrap keyboard option
}
export interface AlertResult {
  confirmed: boolean; // true when OK/Confirm pressed, false on Close/Cancel/ESC/backdrop
}