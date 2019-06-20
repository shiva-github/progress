import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject  } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable({
	providedIn: 'root'
})
export class HeaderService {
	tasksUrl: string = '';
	
	constructor(private http: HttpClient) {
		this.tasksUrl = environment.siteurl;
	}
	private getToken() {
		return localStorage.getItem('currentUser');
	}
	logoutAccount(): any {
		var object = {};
		let httpOptions = {
			headers: new HttpHeaders({
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken() })
		};
		return this.http.post(this.tasksUrl+'logout', object, httpOptions);
	}
	
}
