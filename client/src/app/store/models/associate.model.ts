export interface Associate {
  _id?: string;
  name: string;
  email: string;
  phone: number;
  type: string;
  address: string;
  associateGrp: string;
  status: boolean;
}

export interface AssociateModel {
  list: Associate[];
  associateObj: Associate;
  errorMessage: string;

}

export interface AssociateResponse1 {
  result: boolean;
  data: Associate[];
}

export interface AssociateResponse2 {
  result: boolean;
  meesage: string;
}
