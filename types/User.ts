export type TUser = {
  id?: string;
  email: string;
  password: string;
  name?: string;
  role?: string;
  avatar?: string;
};

export interface TUserDetailDTO {
  user: TUser;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}
