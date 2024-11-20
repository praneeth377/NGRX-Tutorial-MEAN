import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AssociateModel } from '../models/associate.model';

const getAssociateState = createFeatureSelector<AssociateModel>('associate')

export const getAssociateList = createSelector(getAssociateState, (state) => {
  return state.list
})

export const getAssociate1 = createSelector(getAssociateState, (state) => {
  return state.associateObj
})
