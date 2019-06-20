import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ProjectsService {
	
	tasksUrl: string;
	constructor(private http: HttpClient) {
		this.tasksUrl = environment.siteurl;
	}
	private getToken() {
		return localStorage.getItem('currentUser');
	}
	fetchProjects(page): any {
		const httpOptions = {
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken() })
		};
		return this.http.get(this.tasksUrl+'projects?page='+page, httpOptions);
	}
	addNewProject(data): any {
		const httpOptions = {
			// headers: new HttpHeaders({ 'content-type': 'application/x-www-form-urlencoded;application/json;', 'Accept': 'application/json', 'accept-language': 'en-US,en;q=0.8' })
			headers: new HttpHeaders({ 
				"Content-Type": "application/x-www-form-urlencoded;application/json;", 
				"Access-Control-Allow-Credentials" : "true",
				"Authorization": 'Bearer ' + this.getToken()
			})
		};
		return this.http.post(this.tasksUrl+'project/add', data, httpOptions).pipe (
			tap(data => {
				console.log("Added project = ${data.id}");
			}),
			catchError( ():any => {
				console.log("ERROR!!");
				return null;
			})
			);
	}
}
