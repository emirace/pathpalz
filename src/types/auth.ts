export interface IRegisterFormData {
  service?: string;
  email?: string;
  tel_code: string;
  phone_number?: string;
  usertype?: string[];
  password?: string;
  password_confirmation?: string;
  partner_code?: string;
}

export interface ILoginFormData {
  email: string;
  password: string;
}
