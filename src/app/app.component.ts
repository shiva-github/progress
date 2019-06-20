import { Component, TemplateRef, OnInit  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Observable, BehaviorSubject , of, Subject} from 'rxjs';
import { LoginService } from './login/login.service';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'app';
	isLogin: boolean;
  
	constructor(private _loginService: LoginService) {
  
	}
	ngOnInit() {
  	this._loginService.isLogin.subscribe(v => {
  		this.isLogin = v;
  	});
	}
  
}
