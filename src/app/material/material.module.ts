import { MatPaginatorImpl } from './mat-paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatTableModule, MatPaginatorModule,MatToolbarModule, MatIconModule, 
    MatCardModule,MatFormFieldModule,MatInputModule, MatSnackBarModule,MatMenuModule, MatDividerModule,
    MatSidenavModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorIntl} from '@angular/material';

import {ReactiveFormsModule} from '@angular/forms'





@NgModule({
    
    imports: [ CommonModule ,
        BrowserAnimationsModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        MatMenuModule,
        MatDividerModule,
        MatSidenavModule,
        MatDialogModule,
        MatSortModule
        
    ],
    exports: [
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSnackBarModule,
        MatMenuModule,
        MatDividerModule,
        MatSidenavModule,
        MatDialogModule,
        MatSortModule
        
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorImpl }        
    ],
})
export class MeterialModule {}