import { Component, OnInit, OnDestroy, AfterViewInit, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material/snack-bar';

@Component({
  selector: 'app-generic_snackbar',
  templateUrl: './generic_snackbar.component.html',
  styleUrls: ['./generic_snackbar.component.scss']
})
export class GenericSnackbarComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }
  
  ngOnDestroy():void{
  }


}