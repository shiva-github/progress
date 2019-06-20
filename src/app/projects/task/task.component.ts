import { Component, OnInit } from '@angular/core';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from './task.service';

@Component({
	selector: 'app-task',
	templateUrl: './task.component.html',
	styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
	taskId: number;
	commentsListing: any;
	current_page_comment: number;
	last_page_comment: number;
	title: string;
	content: string;
	worktag: string;
	commentDescription: string;
	updateComment: any;
	project_name: string;
	username: string;
	constructor(private route: ActivatedRoute, private _taskService: TaskService, private router: Router) { 
		this.current_page_comment = 1;
		this.last_page_comment = 1;
		this.commentDescription = '';
		this.updateComment = {
			item: false,
			id: 0,
			update: {description: ''}
		}
		this.project_name = '';
	}

	ngOnInit() {
		if(  typeof localStorage.getItem('currentUser') != 'string') {
			this.router.navigate(['login']);
			return;
		}
		this.route.params.subscribe(params => {
			// (+) converts string 'id' to a number
			this.taskId = +params['tid'];
			let pid = +params['id'];
			
			this.current_page_comment = this.showPageObjectGet('current_page_comment'+this.taskId);

			this._taskService.fetchReqTask(this.taskId, pid).subscribe(response => {
				this.project_name = response['breadcrumb']['project_name'];
				this.title = response[0]['title'];
				this.username = response[0]['name'];
				this.content = response[0]['content'];
				this.worktag = response[0]['tag'];
			});
			this._taskService.fetchReqComments(this.current_page_comment, this.taskId).subscribe(response => {
				for(let datax of response.data) {
					// datax.date = new Date(datax.date).getDate().toString() +' - '+ new Date(datax.date).getMonth().toString() +' - '+ new Date(datax.date).getFullYear().toString();
					datax.date = this.dateConvert(datax.date);
				}
				this.commentsListing = response.data;
				this.current_page_comment = response.current_page;
				this.last_page_comment = response.last_page;
				this.showPageObjectSet('current_page_comment'+this.taskId, this.current_page_comment);
			});
			this.showPageObjectSet('current_page_comment'+this.taskId, this.current_page_comment);
		});
	}

	pageChange(data) {
		if(data == 1) {
			if( this.current_page_comment < this.last_page_comment ) {
				this._taskService.fetchReqComments(this.current_page_comment + 1, this.taskId).subscribe(response => {
					for(let datax of response.data) {
						// datax.date = new Date(datax.date).getDate().toString() +' - '+ new Date(datax.date).getMonth().toString() +' - '+ new Date(datax.date).getFullYear().toString();
						datax.date = this.dateConvert(datax.date);
					}
					this.commentsListing = response.data;
					this.current_page_comment = response.current_page;
					this.last_page_comment = response.last_page;
					this.showPageObjectSet('current_page_comment'+this.taskId, this.current_page_comment);
				});
			}
		}
		if(data == -1) {
			if( this.current_page_comment > 1 ) {
				this._taskService.fetchReqComments(this.current_page_comment - 1, this.taskId).subscribe(response => {
					for(let datax of response.data) {
						// datax.date = new Date(datax.date).getDate().toString() +' - '+ new Date(datax.date).getMonth().toString() +' - '+ new Date(datax.date).getFullYear().toString();
						datax.date = this.dateConvert(datax.date);
					}
					this.commentsListing = response.data;
					this.current_page_comment = response.current_page;
					this.last_page_comment = response.last_page;
					this.showPageObjectSet('current_page_comment'+this.taskId, this.current_page_comment);
				});
			}
		}
		if(data == 0) {
			this._taskService.fetchReqComments(this.current_page_comment, this.taskId).subscribe(response => {
				for(let datax of response.data) {
					// datax.date = new Date(datax.date).getDate().toString() +' - '+ new Date(datax.date).getMonth().toString() +' - '+ new Date(datax.date).getFullYear().toString();
					datax.date = this.dateConvert(datax.date);
				}
				this.commentsListing = response.data;
				this.current_page_comment = response.current_page;
				this.last_page_comment = response.last_page;
				this.showPageObjectSet('current_page_comment'+this.taskId, this.current_page_comment);

			});
		}
	}
	delete(deleteNum) {		
		this._taskService.deleteCommentData({deleteid: deleteNum}).subscribe(response => {
			console.log('deleted record');
		});
	}
	edit(EditObj) {
		if(this.updateComment.item) {
			this.updateComment.item = false;
			this.commentDescription = '';
			this.updateComment.id = 0;
		}else {
			this.updateComment.item = true;
			this.commentDescription = EditObj.content;
			this.updateComment.id = EditObj.link;
		}
		
	}

	submitComment() {
		this.updateComment.update.description = this.commentDescription;
		this._taskService.editCommentData(this.updateComment).subscribe(response => {
			for(let i=0;i<this.commentsListing.length;i++){
				if(this.commentsListing[i].link == this.updateComment.id){
					this.commentsListing[i].content = this.updateComment.update.description;
					this.updateComment.item = false;
					this.updateComment.id=0;
					this.commentDescription = '';
				}
			}
		});
	}
	addComment() {
		var data = Object();
		data.userid = atob(localStorage.getItem(btoa('userid')));
		data.taskid = this.taskId;
		data.description = this.commentDescription;
		
		this._taskService.addCommentData(data).subscribe(response => {
			this.commentDescription = '';
			this.pageChange(0);
		});
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


	dateConvert( dateObject ) {
		let dt = new Date(dateObject).toString().split(' ');
		let date = dt[1] + ', ' + dt[2] + ' ' + dt[3];
		return date;
	}
}
