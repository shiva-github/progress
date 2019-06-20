import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { TasksService } from './tasks.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-tasks',
	templateUrl: './tasks.component.html',
	styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
	routeParam: number;
	tasks: any;
	current_page_task: any;
	last_page_task: any;
	taskName: any;
	taskDescription: any;
	taskAssignTo: any;
	project_name: string;
	constructor(private _tasksService: TasksService, private route: ActivatedRoute, private router: Router) {
		this.project_name = '';
	}

	ngOnInit() {
		if(  typeof localStorage.getItem('currentUser') != 'string') {
			this.router.navigate(['login']);
			return;
		}
		this.taskName = '';
		this.taskDescription = '';
		
		this.route.params.subscribe(params => {
			this.routeParam = +params['id'];
			// this.routeParam = this.route.params._value['id'];
			this.current_page_task = this.showPageObjectGet('currentTask_page'+this.routeParam);
			this._tasksService.fetchTasks(this.current_page_task, {'projectid': this.routeParam }).subscribe( response => {
				var i=0;
				for(let d of response['data']) {
					d.pending = d.link;
					d.sr = i++;
					d.link = 'task/'+d.link;
				}
				this.current_page_task = response['current_page'];
				this.last_page_task = response['last_page'];
				this.tasks = response['data'];
				this.showPageObjectSet('currentTask_page'+this.routeParam, this.current_page_task);
				this.project_name = response['breadcrumb']['project_name'];
			});
		});
	}
	sendUpdate(status) {
		
		let data = {tag: 'finished', id: status};
		this._tasksService.updateTask(data).subscribe(response => {

			for(let i=0;i<this.tasks.length;i++) {
				if( this.tasks[i].pending == status) {
					this.tasks[i].tag = 'finished';
				}
			}
		});
	}
	deleteTask(taskid, index) {
		this.tasks.splice(index, 1);
		// pageChange(0);
	}

	addTask() {
		var useridVal = atob(localStorage.getItem(btoa('userid')));
		let data = {name: this.taskName, tag: 'pending', description: this.taskDescription, projectid: this.routeParam, userid: parseInt(useridVal)};
		this._tasksService.addNewTask(data).subscribe(response => {
			this.pageChange(0);
			this.taskName = '';
			this.taskDescription = '';
		});
	}

	pageChange(count) {

		if (count == 1) {
			if(this.current_page_task < this.last_page_task ) {
				this._tasksService.fetchTasks(this.current_page_task + 1, {'projectid': this.routeParam })
				.subscribe( response => {
					var i=0;
					for(let d of response['data']) {
						d.pending = d.link;
						d.sr = i++;
						d.link = 'task/'+d.link;
					}
					this.current_page_task = response['current_page'];
					this.last_page_task = response['last_page'];
					this.tasks = response['data'];
					this.showPageObjectSet('currentTask_page'+this.routeParam, this.current_page_task);
				});
			}
		}
		if (count == -1) {
			if (this.current_page_task > 1) {
				this._tasksService.fetchTasks(this.current_page_task - 1, {'projectid': this.routeParam })
				.subscribe( response => {
					var i=0;
					for(let d of response['data']) {
						d.pending = d.link;
						d.sr = i++;
						d.link = 'task/'+d.link;
					}
					this.current_page_task = response['current_page'];
					this.last_page_task = response['last_page'];
					this.tasks = response['data'];
					this.showPageObjectSet('currentTask_page'+this.routeParam, this.current_page_task);
				});
			}
		}
		if (count == 0) {    		
			this._tasksService.fetchTasks(this.current_page_task, {'projectid': this.routeParam })
			.subscribe( response => {
				var i=0;
				for(let d of response['data']) {
					d.pending = d.link;
					d.sr = i++;
					d.link = 'task/'+d.link;
				}
				this.current_page_task = response['current_page'];
				this.last_page_task = response['last_page'];
				this.tasks = response['data'];
				this.showPageObjectSet('currentTask_page'+this.routeParam, this.current_page_task);
			});
		}

	}

	showPageObjectGet(type) {
		var key = window.btoa(type);		
		if (typeof localStorage.getItem(key) == 'string') {
			return parseInt(window.atob(localStorage.getItem(key)));
		} else {
			return 1;
		}
	}
	showPageObjectSet(type, number) {
		var key = window.btoa(type);
		var value = window.btoa(number);
		localStorage.setItem(key, value);
	}

}
