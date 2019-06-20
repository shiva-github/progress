import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { RouterModule, Routes } from '@angular/router';

import { QrcodeComponent } from './qrcode.component';


const appRoutes: Routes = [
	{ path: 'qrcode', component: QrcodeComponent }
];



@NgModule({
	imports: [
	CommonModule,
	RouterModule.forRoot(appRoutes),
	NgxQRCodeModule,
	FormsModule
	],
	declarations: [
	QrcodeComponent,
	],
	exports: []
})
export class QrcodeModule { }
