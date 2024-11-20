import { createAction, props } from '@ngrx/store';

import { Associate } from '../models/associate.model';

export const loadAssociate = createAction('[Associate Page] Load Associate')
export const loadAssociateSuccess = createAction('[Associate Page] Load Associate Success', props<{list: Associate[]}>())
export const loadAssociateFailure = createAction('[Associate Page] Load Associate Failure', props<{errorMessage: string}>())

export const addAssociate = createAction('[Associate Page] Add Associate', props<{inputData: Associate}>())
export const addAssociateSuccess = createAction('[Associate Page] Add Associate Success', props<{inputData: Associate}>())

export const getAssociate = createAction('[Associate Page] Get Associate', props<{id: string}>())
export const getAssociateSuccess = createAction('[Associate Page] Get Associate Success', props<{obj: Associate}>())

export const openPopup = createAction('[Associate Page] Open Popup')

export const updateAssociate = createAction('[Associate Page] Update Associate', props<{id: string, inputData: Associate}>())
export const updateAssociateSuccess = createAction('[Associate Page] Update Associate Success', props<{inputData: Associate}>())

export const deleteAssociate = createAction('[Associate Page] Delete Associate', props<{id: string}>())
export const deleteAssociateSuccess = createAction('[Associate Page] Delete Associate Success', props<{id: string}>())
