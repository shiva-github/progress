import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TasksService {
	tasksUrl: string;
	constructor(private http: HttpClient) {
		this.tasksUrl = environment.siteurl;
	}
	private getToken() {
		return localStorage.getItem('currentUser');
	}
	fetchTasks(page, data): any {
		const httpOptions = {
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken(), 
			})
		};
		return this.http.post(this.tasksUrl+'tasks?page='+page, data, httpOptions);
	}
	addNewTask(data): any {
		// headers: new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded;application/json;', 'Accept': 'application/json', 'accept-language': 'en-US,en;q=0.8' })
		const httpOptions = {
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken(), 
			})
		};
		return this.http.post(this.tasksUrl+'task/add', data, httpOptions).pipe(tap(data => {
			console.log("New Task Added... ${data.id}");
		})
		);
	}


	updateTask(data): any {
		const httpOptions = {
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json", 
				"Access-Control-Allow-Credentials": "true",
				"Authorization": 'Bearer ' + this.getToken()
			})
		};
		return this.http.post(this.tasksUrl+'task/update', data, httpOptions);
	}

}
