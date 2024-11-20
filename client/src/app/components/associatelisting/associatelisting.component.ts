import { filter } from 'rxjs/operators';
import {
	deleteAssociate,
	getAssociate,
	loadAssociate,
	openPopup,
} from 'src/app/store/associates/associate.actions';
import { getAssociateList } from 'src/app/store/associates/associate.selector';
import { Associate } from 'src/app/store/models/associate.model';

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { AddassociateComponent } from '../addassociate/addassociate.component';

@Component({
  selector: 'app-associatelisting',
  templateUrl: './associatelisting.component.html',
  styleUrls: ['./associatelisting.component.css']
})
export class AssociatelistingComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'name', 'email', 'phone', 'address', 'type', 'associateGrp', 'status', 'action'];
  associateList: Associate[] = []
  dataSource: any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadAssociate());
    this.store.select(getAssociateList).pipe(filter(item => item.length > 0)).subscribe(item => {
      this.associateList = item;
      console.log('yoyo', this.associateList);
      this.dataSource = new MatTableDataSource(this.associateList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openPopup(code: number, title: string) {
    this.store.dispatch(openPopup())
    this.dialog.open(AddassociateComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        code: code,
        title: title
      }
    });
  }

  AddFunction() {
    this.openPopup(0, 'Create Associate');
  }

  OnEdit(_id: string) {
    this.store.dispatch(getAssociate({id: _id}));
    this.openPopup(1, 'Update Associate');
  }

  OnDelete(_id: string) {
    if (confirm('Are you sure you want to delete this associate?')) {
      this.store.dispatch(deleteAssociate({id: _id}));
    }
  }

}
