import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatTableModule, MatPaginatorModule,MatToolbarModule, MatIconModule, 
    MatCardModule,MatFormFieldModule,MatInputModule, MatSnackBarModule,MatMenuModule, MatDividerModule,
    MatSidenavModule} from '@angular/material';

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
        MatSidenavModule
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
        MatSidenavModule
    ],
    providers: [],
})
export class MeterialModule {}