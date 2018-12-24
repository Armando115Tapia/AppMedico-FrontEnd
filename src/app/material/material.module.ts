import { MatPaginatorImpl } from './mat-paginator';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatTableModule, MatPaginatorModule,MatToolbarModule, MatIconModule, 
    MatCardModule,MatFormFieldModule,MatInputModule, MatSnackBarModule,MatMenuModule, MatDividerModule,
    MatSidenavModule,
    MatDialogModule,
    MatSortModule,
    MatPaginatorIntl,
    MatSelectModule,
    MatDatepickerModule,
    MAT_DATE_LOCALE,
    MatNativeDateModule,
    MatExpansionModule,
    MatListModule} from '@angular/material';

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
        MatSortModule,
        MatSelectModule,
        MatDatepickerModule,
        MatExpansionModule,
        MatListModule
        
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
        MatSortModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule, 
        MatExpansionModule,
        MatListModule
    
        
    ],
    providers: [
        { provide: MatPaginatorIntl, useClass: MatPaginatorImpl },
        //Para que el diccionario sea en español    
        {provide:MAT_DATE_LOCALE, useValue:'es-ES'}        
    ],
})
export class MeterialModule {}