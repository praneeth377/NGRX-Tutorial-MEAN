import { Associate, AssociateModel } from '../models/associate.model';

export const AssociateState: AssociateModel = {
  list: [],
  associateObj: {
    _id: '',
    name: '',
    email: '',
    phone: 0,
    type: 'CUSTOMER',
    address: '',
    associateGrp: 'LVL1',
    status: true
  },
  errorMessage: ''
}
