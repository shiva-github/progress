import { Component, OnInit } from '@angular/core';
import { ProjectsService } from './projects.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
	
	project_data: any;
	projectDescription: any;
	projectName: any;
	pageProject: number;
	last_page_project: number;
	current_page_project: number;

	constructor(private _projectService: ProjectsService, private router: Router) {
		
	}
	
	ngOnInit() {
		if(  typeof localStorage.getItem('currentUser') != 'string') {
			this.router.navigate(['login']);
			return;
		}
		this.current_page_project = 1;
		this.projectName = '';
		this._projectService.fetchProjects(this.current_page_project)
		.subscribe( response => {
			for(let d of response['data']) {
				d.link = 'tasks/'+d.link;
			}
			this.current_page_project = response['current_page'];
			this.last_page_project = response['last_page'];
			this.project_data = response['data'];
		});
	}
	addProject() {
		var useridVal = atob(localStorage.getItem(btoa('userid')));
		let project = {name: '', description: '', userid: useridVal};
		project.name = this.projectName;
		project.description = this.projectDescription;
		
		this._projectService.addNewProject(project).subscribe( response => {
			this.projectName = '';
			this.projectDescription = '';
			this.pageChange(0);
		});
	}
	pageChange(count) {

		if (count == 1) {
			if(this.current_page_project < this.last_page_project ) {
				this._projectService.fetchProjects(this.current_page_project + 1)
				.subscribe( response => {
					for(let d of response['data']) {
						d.link = 'tasks/'+d.link;
					}
					this.current_page_project = response['current_page'];
					this.last_page_project = response['last_page'];
					this.project_data = response['data'];
				});
			}
		}
		if (count == -1) {
			if (this.current_page_project > 1) {
				this._projectService.fetchProjects(this.current_page_project - 1)
				.subscribe( response => {
					for(let d of response['data']) {
						d.link = 'tasks/'+d.link;
					}
					this.current_page_project = response['current_page'];
					this.last_page_project = response['last_page'];
					this.project_data = response['data'];
				});
			}
		}
		if (count == 0) {
			this._projectService.fetchProjects(this.current_page_project)
			.subscribe( response => {
				for(let d of response['data']) {
					d.link = 'tasks/'+d.link;
				}
				this.current_page_project = response['current_page'];
				this.last_page_project = response['last_page'];
				this.project_data = response['data'];
			});
		}

	}
}
