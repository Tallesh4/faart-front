import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
    constructor(private http: HttpClient,private snackBar: MatSnackBar) { }
  
    success(msg: string) {
      this.snackBar.open(msg, '',{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'top',
        panelClass: ['snack-bar-sucess']
      },);
    }
  
    error(msg: string) {
      this.snackBar.open(msg, '',{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'top',
        panelClass: ['snack-bar-err']
      },);
    }

    info(msg: string) {
      this.snackBar.open(msg, '',{
        duration:3000,
        horizontalPosition:'right',
        verticalPosition:'top',
        panelClass: ['snack-bar-view']
      },);
    }
  }
  