import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoginModule } from './login/login.module';
import { QrcodeModule } from './qrcode/qrcode.module';
import { ProjectsModule } from './projects/projects.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';
import { ChatWindowComponent } from './header/chat-window/chat-window.component';


  
const appRoutes: Routes = [
  { path: 'login', component: LoginModule  },
  { path: 'qrcode', component: QrcodeModule },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsModule },
  { path: 'profile', component: ProfileComponent },
  { path: 'chat', component: ChatWindowComponent },
  
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  // { path: '**', component: LoginModule },
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];







@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    ChatWindowComponent,
  ],
  // exports: [ HeaderComponent, FooterComponent],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes//, { enableTracing: true }
    ),
    ProjectsModule,
    LoginModule,
    QrcodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }