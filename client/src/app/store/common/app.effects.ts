import { exhaustMap, map } from 'rxjs';

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { emptyAction, showAlert } from './app.action';

@Injectable()
export class AppEffects {
  constructor(private actions: Actions, private _snackBar: MatSnackBar) {}

  _showAlert = createEffect(() =>
    this.actions.pipe(
      ofType(showAlert),
      exhaustMap((action) =>
        this.showSnackBarAlert(action.message, action.resultType)
          .afterDismissed()
          .pipe(
            map(() => emptyAction())
          )
      )
    )
  );

  showSnackBarAlert(message: string, resultType: string = 'fail') {
    let _class = resultType == 'pass' ? 'green-snackbar' : 'red-snackbar';
    return this._snackBar.open(message, 'OK', {
      verticalPosition: 'top',
      horizontalPosition: 'end',
      duration: 5000,
      panelClass: [_class],
    });
  }
}
