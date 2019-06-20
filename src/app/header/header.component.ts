import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeaderService } from './header.service';
import { LoginService } from '../login/login.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	mobileToggle: boolean;
	loginAuth: boolean;
	incomingNotification: boolean;
	constructor(private router: Router, private _headerservice: HeaderService, private loginService: LoginService) { }

	ngOnInit() {
		this.loginAuth = true;
		this.mobileToggle = false;
		if(  typeof localStorage.getItem('currentUser') != 'string') {
			this.router.navigate(['login']);
		}
		this.incomingNotification = false;
	}
	toggleMenu() {
		this.mobileToggle = !this.mobileToggle;
	}
	logoutAccount() {
		this.router.navigate(['login']);
		this.loginService.isLogin.next(false);
		this._headerservice.logoutAccount().subscribe(data => {
			
			localStorage.removeItem('currentUser');
			localStorage.removeItem(btoa('userid'));
			// localStorage.clear();
			this.router.navigate(['login']);
		}, error => {
			console.log(error);
		});

	}
	playAudio(){
		let audio = new Audio();
		audio.src = "/assets/audio/bell2.mp3";
		audio.load();
		audio.play();
	}
}
