import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { LoginService } from './login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	loginHead: boolean;
	login: any = {
		username: '',
		password: '',
		screenWidth: 0,
		bro_info: ''
	};
	register: any = {
		uname: '',
		emailid : '',
		pass: '',
		name: ''
	};
	isOpen: any;
	disableValue: boolean;
	private innerWidth: any;
	constructor(private router: Router, private _loginService: LoginService) { }

	ngOnInit() {
		this.login.screenWidth = window.innerWidth;
		this.login.bro_info = window.navigator.userAgent;
		this.loginHead = false;
		if(  typeof localStorage.getItem('currentUser') != 'string') {
			this.router.navigate(['login']);
		}else {
			this.router.navigate(['home']);
		}
		this.disableValue = false;
	}

	loginSubmit(event) {
		if( event.keyCode == 13) {
			if( this.login.username != '' && this.login.password != '' ) {
				this.submitForm();
			} else {
				this.isOpen = true;
			}
			
		} 
	}

	submitForm(): void {
		this.disableValue = true;
		this._loginService.loginCheck(this.login).subscribe( response => {
			if( response.error ) {
				this.router.navigate(['login']);
				this.isOpen = true;
			}
			if( response.success ) {
				this._loginService.isLogin.next(true);
				localStorage.setItem('currentUser', response.success.token);
				this._loginService.userDetails().subscribe(res => {
					
					if( res.success ) {
						localStorage.setItem(btoa('userid'), btoa(res.success.id));
						localStorage.setItem(btoa('userdetails'), btoa(JSON.stringify(res.success)));
					} else {
						this.router.navigate(['login']);
					}

				});
				this.router.navigate(['projects']);
			}
			this.disableValue = false;
		}, error => {
			this.router.navigate(['login']);
			this.disableValue = false;
		});
	}
	hideshowForm() {
		if(this.loginHead) {
			this.loginHead = false;
		} else {
			this.loginHead = true;
		}
	}
	RegisterForm() {
		console.log(this.register); 
		this.register.uname = '';
		this.register.emailid = '';
		this.register.pass = '';
		this.loginHead = false;

		this._loginService.userDetails().subscribe(res => {
			console.log(res);
		});
	}
}