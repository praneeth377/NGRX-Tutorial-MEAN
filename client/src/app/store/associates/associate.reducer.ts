import { createReducer, on } from '@ngrx/store';

import {
	addAssociateSuccess,
	deleteAssociateSuccess,
	getAssociateSuccess,
	loadAssociateFailure,
	loadAssociateSuccess,
	openPopup,
	updateAssociateSuccess,
} from './associate.actions';
import { AssociateState } from './associate.state';

const _associateReducer = createReducer(AssociateState,
  on(loadAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: [...action.list],
      errorMessage: ''
    }
  }),
  on(loadAssociateFailure, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errorMessage
    }
  }),
  on(addAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: [...state.list, action.inputData],
      errorMessage: ''
    }
  }),
  on(updateAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: [...state.list, action.inputData],
      errorMessage: ''
    }
  }),
  on(getAssociateSuccess, (state, action) => {
    return {
      ...state,
      associateObj: action.obj,
      errorMessage: ''
    }
  }),
  on(deleteAssociateSuccess, (state, action) => {
    return {
      ...state,
      list: state.list.filter(i => i._id != action.id),
      errorMessage: ''
    }
  }),
  on(openPopup, (state, action) => {
    return {
      ...state,
      associateObj: {
        _id: '',
        name: '',
        email: '',
        phone: 0,
        type: 'CUSTOMER',
        address: '',
        associateGrp: 'LVL1',
        status: true
      }
    }
  })
)

export function AssociateReducer(state: any, action: any) {
  return _associateReducer(state, action)
}
