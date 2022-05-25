//File generated by vaweei CLI
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Prueba } from 'src/app/models/prueba.model';
//import { PruebaService } from 'src/app/services/catalogs/prueba.service';

import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-prueba-list-view',
  templateUrl: './prueba-list-view.component.html',
  styleUrls: ['./prueba-list-view.component.scss']
})
export class PruebaListViewComponent implements OnInit {

  displayedColumns = ['select' , 'code' , 'name' , 'description' , 'age'  ];
  dataSource = new MatTableDataSource<Prueba>([]);
  selection = new SelectionModel<Prueba>(true, []);

  constructor(
    //private pruebaService : PruebaService,
    private router : Router
    ) {}

  ngOnInit(): void {
    //this.getAll();
  }

  getAll(){
  //  this.pruebaService.getPruebaList().subscribe({
  //    next: (v) => { this.dataSource.data = v },
  //    error: (e) => console.error(e),
  //    complete: () => console.info('complete')
  //  });
  }

  deletePrueba(){
    //this.pruebaService.deletePrueba(this.selection.selected.map(function(prueba_data){return prueba_data.id})).subscribe({
    //  next: (v) => { console.log(v) },
    //  error: (e) => console.error(e),
    //  complete: () => this.getAllPrueba()
    //});
  }

  //viewPrueba(prueba_data:Prueba){
  //  this.router.navigate(['catalogs','prueba','form',prueba_data.id]);
  //}

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
  
      this.selection.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: Prueba): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
    }

}
    