import { createAction, props } from '@ngrx/store';

export const showAlert = createAction('[App] Show Alert', props<{message: string, resultType: string}>())
export const emptyAction = createAction('[App] Empty Action')
