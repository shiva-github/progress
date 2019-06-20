import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
	
	tasksUrl: string;

	public isLogin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	constructor(private http: HttpClient) {
		this.tasksUrl = environment.siteurl;
		this.redirectToLogin();
	}

  
	loginCheck( object ): any {
		var final_url = this.tasksUrl + 'login';
		let httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;application/json;' })
		};
		return this.http.post<any>(final_url, object, httpOptions);
	}

	redirectToLogin(){
		if(this.getToken()){
			this.isLogin.next(true);
		}
	}
	
	private getToken() {
		return localStorage.getItem('currentUser');
	}
	userDetails() {
		var object = {};
		var final_url = this.tasksUrl + 'userdata';
		let httpOptions = {
			headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;application/json;', 'Authorization': 'Bearer ' + this.getToken() })
		};
		return this.http.post<any>(final_url, object, httpOptions);
	}
}
