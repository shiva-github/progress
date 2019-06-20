import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';


import { ProjectsComponent } from './projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task.component';

const appRoutes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'projects/tasks/:id', component: TasksComponent },
  { path: 'projects/tasks/:id/task/:tid', component: TaskComponent },
  
  // { path: '',
  //   redirectTo: '/projects',
  //   pathMatch: 'full'
  // },
  { path: 'projects/tasks',
    redirectTo: '/projects',
    pathMatch: 'full'
  },
  { path: 'projects/tasks/:id/task',
    redirectTo: '/projects/tasks/:id',
    pathMatch: 'full'
  },
];


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AccordionModule.forRoot()
  ],
  declarations: [ProjectsComponent, TasksComponent, TaskComponent]
})
export class ProjectsModule { }
