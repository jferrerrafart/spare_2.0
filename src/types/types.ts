export interface iSurvey {
  user_id: number; // ver aquí como definimos la compañía para que puueda poner su razon social
  title: string;
  question: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
}
export interface iResponse {
  user_id: number;
  survey_id: number;
  selected_option: string;
}
export interface iRegisterW {
  wallet: string;
  name: string; // necesario?
}
export interface iRegisterU {
  wallet: string;
  username: string; //necesario?
}
