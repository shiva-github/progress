import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollWrapper') scrollWrapper: ElementRef;
  @ViewChild('scrollDiv') scrollDiv: ElementRef;
  users: any;
  text: string;
  prevSelectedUser:any;
  messages: any;
  currentUser: any;
  searchChatUser: string;
  selectedUserData: any;
  flat:number = 1;
  socket:any;
  socketUrl: string;
  constructor(private router: Router) {

  } 

  ngOnInit() {
    
  	if( typeof localStorage.getItem('currentUser') != 'string') {
  		this.router.navigate(['login']);
  		return;
  	}
    
    this.socketUrl = "http://"+window.location.hostname+":"+environment.socketport;
    this.searchChatUser = '';

    this.prevSelectedUser = -1; //set -1 if users count == 0;
    let details = atob(localStorage.getItem(btoa('userdetails')));

    this.currentUser = JSON.parse(details);
    this.currentUser.status = 'online';
    
    this.currentUser.img = '/assets/images/userico2.png';
    this.selectedUserData = {id: 0, username: '', name: 'No selected User', status: 'offline', 'img': '/assets/images/userico2.png' };

    this.prevSelectedUser = -1; //set -1 if users count == 0;
    this.users = [
    // {id: 1, name: 'Shiva Shirbhate', status: 'offline', active: 0, 'img': '/assets/images/userico2.png'},
    // {id: 2, name: 'Vasu Shirbhate', status: 'offline', active: 0, 'img': '/assets/images/userico2.png'}
    ];
    this.messages = [
    // {userid: 1, img: '/assets/images/userico2.png', msg: 'This is the text message. Working properly 1', time: '22 Jan 2019 11:10AM', left: 0, right: 1},
    // {userid: 2, img: '/assets/images/userico2.png', msg: 'This is the text message. Working properly 2', time: '22 Jan 2019 11:10AM', left: 1, right: 0}
    ];
  }
  ngAfterViewInit() {
    this.connect();
  }
  selectedUser(i, userid) {
    var self = this;
    self.messages = [];
    this.selectedUserData = this.users[i];
    if( this.prevSelectedUser != -1 ) {
      this.users[this.prevSelectedUser].active = 0;
      this.users[i].active = 1;
      this.prevSelectedUser = i;
    }else {
      this.users[i].active = 1;
      this.prevSelectedUser = i;
    }
  }

  sendMsg(event) { 
    if( event.keyCode == 13 && this.text != '') {
      this.send();
    }
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "/assets/audio/bell2.mp3";
    audio.load();
    audio.play();
  }
  searchUserForMsg(event) {    
    if( event.keyCode == 13) {
      // this.connect();
    }    
    
  }
  socketConnRequest() {
    var url = this.socketUrl;
    let self = this;
    try {
      this.socket = io(url);
      self.socket.on('connect_error', function (data) {
        console.log('connection_error');
        // console.log(data);
        self.socket.distroy();

      });
    } catch(e) {
      console.log("not connected.");
    }
  }
  // connect with socket 
  connect() {
    var self = this;
    this.socketConnRequest();
    this.socket.emit('user', this.currentUser);
    this.socket.on('onlineUsers', function(data){
      var listToDelete = [self.currentUser.id];
      for (var i = 0; i < data.count.length; i++) {
        var obj = data.count[i];

        if (listToDelete.indexOf(obj.id) !== -1) {
          data.count.splice(i, 1);
          i--;
        }
      }
      self.users = data.count;
    });


    this.socket.on('receivedMessage', function(data) {

      if(self.currentUser.id == data.fromid) {
        data.left = 0;
        data.right = 1;
      }else {
        self.playAudio();
        data.left = 1;
        data.right = 0;
      }
      if(self.selectedUserData.id != 0) {
        self.messages.push(data);
        self.scrollToBottom();
      }
      // document.getElementById('wrap').scrollTo(0,document.getElementById('msgdiv').scrollHeight);
    });
  }
  send() {
    if(this.text == ''){
      return;
    }
    let usermsg = {
      fromid: parseInt(this.currentUser.id),
      toid: this.selectedUserData.id, 
      img: '/assets/images/userico2.png',
      msg: this.text, 
      time: '22 Jan 2019 11:10AM', 
      left: 0,
      right: 1
    };
    this.socket.emit('usermessage', usermsg);
    this.text = '';
  }

  // scroll to bottom chat settings
  scrollToBottom() {
    try{
      this.scrollWrapper.nativeElement.scrollTo(0, this.scrollWrapper.nativeElement.scrollHeight);
    } catch(e) { }
  }

}
