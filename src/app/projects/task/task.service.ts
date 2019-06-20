import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
	providedIn: 'root'
})
export class TaskService {
	tasksUrl: string;
	constructor(private http: HttpClient) {
		this.tasksUrl = environment.siteurl;
	}
	private getToken() {
		return localStorage.getItem('currentUser');
	}
	fetchReqTask(statusTask, pid): any {
		const httpOptions = {
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken() 
			})
		};
		
		return this.http.post(this.tasksUrl+'task/show', {'status': statusTask, 'project': pid}, httpOptions);
	}
	fetchReqComments(page, task): any {
		const httpOptions = {
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken() 
			}),
		};
		
		return this.http.post(this.tasksUrl+'task/comment/show?page='+page, {'task': task}, httpOptions);
	}
	addCommentData(data) {
		const httpOptions = {
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken() })
		};
		
		return this.http.post(this.tasksUrl+'task/comment/add', data, httpOptions);
	}

	deleteCommentData(data) {
		const httpOptions = {
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken() 
			})
		};
		return this.http.post(this.tasksUrl+'task/comment/delete', data, httpOptions);
	}

	editCommentData(data) {
		const httpOptions = {
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken() 
			})
		};
		return this.http.post(this.tasksUrl+'task/comment/update', data, httpOptions);
	}
}
