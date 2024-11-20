import {
	addAssociate,
	getAssociate,
	loadAssociate,
	updateAssociate,
} from 'src/app/store/associates/associate.actions';
import { getAssociateList } from 'src/app/store/associates/associate.selector';
import { Associate } from 'src/app/store/models/associate.model';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { getAssociate1 } from '../../store/associates/associate.selector';

@Component({
  selector: 'app-addassociate',
  templateUrl: './addassociate.component.html',
  styleUrls: ['./addassociate.component.css']
})

export class AddassociateComponent implements OnInit {

  title = 'Create Associate'
  dialogData: any
  idOfCurrentUser: string = ''

  constructor(private builder: FormBuilder, private ref: MatDialogRef<AddassociateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private store: Store) { }

  ngOnInit(): void {
    this.dialogData = this.data;
    this.title = this.dialogData.title;
    this.store.select(getAssociate1).subscribe(res => {
      this.idOfCurrentUser = res._id || ''
      console.log(this.idOfCurrentUser)
      this.associateForm.setValue({
        // id: res.id,
        name: res.name,
        email: res.email,
        phone: res.phone,
        address: res.address,
        type: res.type,
        associateGrp: res.associateGrp,
        status: res.status
      })
    })
  }

  associateForm = this.builder.group({
    // id: this.builder.control(0),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control(0, Validators.required),
    address: this.builder.control('', Validators.required),
    type: this.builder.control('CUSTOMER'),
    associateGrp: this.builder.control('LVL1'),
    status: this.builder.control(true)
  });

  SaveAssociate() {
    //console.log(this.associateForm.value);
    if(this.associateForm.valid){
      const obj: Associate = {
        name: this.associateForm.value.name as string,
        email: this.associateForm.value.email as string,
        phone: this.associateForm.value.phone as number,
        address: this.associateForm.value.address as string,
        type: this.associateForm.value.type as string,
        associateGrp: this.associateForm.value.associateGrp as string,
        status: this.associateForm.value.status as boolean
      }
      if (this.idOfCurrentUser) {
        this.store.dispatch(updateAssociate({ id: this.idOfCurrentUser, inputData: obj }));
      } else {
        this.store.dispatch(addAssociate({ inputData: obj }));
    }
    this.closePopup();
    this.store.dispatch(loadAssociate());
  }
}

  closePopup() {
    this.ref.close()
  }
}
