import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { AssociateService } from 'src/app/services/associate.service';

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { showAlert } from '../common/app.action';
import {
	addAssociate,
	addAssociateSuccess,
	deleteAssociate,
	deleteAssociateSuccess,
	getAssociate,
	getAssociateSuccess,
	loadAssociate,
	loadAssociateFailure,
	loadAssociateSuccess,
	updateAssociate,
	updateAssociateSuccess,
} from './associate.actions';

@Injectable()
export class AssociateEffects {
  constructor(private actions: Actions, private service: AssociateService) {}

  _loadAssociate = createEffect(() =>
    this.actions.pipe(
      ofType(loadAssociate),
      exhaustMap(() =>
        this.service.getData().pipe(
          map((res) => { return loadAssociateSuccess({ list: res.data }) }),
          catchError((error) =>
            of(loadAssociateFailure({ errorMessage: error.message }))
          )
        )
      )
    )
  );

  _addAssociate = createEffect(() =>
    this.actions.pipe(
      ofType(addAssociate),
      switchMap((action) =>
        this.service.postData(action.inputData).pipe(
          switchMap((res) =>
            of(
              addAssociateSuccess({ inputData: action.inputData }),
              showAlert({ message: 'Associate created successfully', resultType: 'success' })
            )
          ),
          catchError((err) =>
            of(
              showAlert({ message: 'Failed to create associate', resultType: 'fail' })
            )
          )
        )
      )
    )
  )

  _getAssociate = createEffect(() =>
    this.actions.pipe(
      ofType(getAssociate),
      exhaustMap((action) =>
        this.service.getDatabyId(action.id).pipe(
          map((res) => {
            return getAssociateSuccess({obj: res.data})
          }),
          catchError((err) => of(showAlert({message: 'Failed to fetch data:' + err.message, resultType: 'fail'})))
        )
      )
    )
  )

  _updateAssociate = createEffect(() =>
    this.actions.pipe(
      ofType(updateAssociate),
      switchMap((action) =>
        this.service.updateData(action.id, action.inputData).pipe(
          switchMap((res) =>
            of(
              updateAssociateSuccess({ inputData: action.inputData }),
              showAlert({ message: 'Updated successfully', resultType: 'success' })
            )
          ),
          catchError((err) =>
            of(
              showAlert({ message: 'Failed to update associate', resultType: 'fail' })
            )
          )
        )
      )
    )
  )

  _deleteAssociate = createEffect(() =>
    this.actions.pipe(
      ofType(deleteAssociate),
      switchMap((action) =>
        this.service.deleteData(action.id).pipe(
          switchMap((res) =>
            of(
              deleteAssociateSuccess({ id: action.id }),
              showAlert({ message: 'Deleted successfully', resultType: 'success' })
            )
          ),
          catchError((err) =>
            of(
              showAlert({ message: 'Failed to delete associate', resultType: 'fail' })
            )
          )
        )
      )
    )
  )
}
