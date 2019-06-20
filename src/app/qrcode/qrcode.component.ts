import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'app-qrcode',
	templateUrl: './qrcode.component.html',
	styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {
	show_url: any;
	conversionData: any;
	constructor() { }

	ngOnInit() {
		this.conversionData = 'http://';
		this.show_url = false;
	}
	detectUrl() {
		this.show_url = this.ValidURL(this.conversionData);
		console.log(this.ValidURL(this.conversionData));
	}
	ValidURL(str) {
	  	var pattern = new RegExp('^(https?:\/\/)?'+ // protocol
	    	'((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|'+ // domain name
	    	'((\d{1,3}\.){3}\d{1,3}))'+ // OR ip (v4) address
	    	'(\:\d+)?(\/[-a-z\d%_.~+]*)*'+ // port and path
	    	'(\?[;&a-z\d%_.~+=-]*)?'+ // query string
	    	'(\#[-a-z\d_]*)?$','i'); // fragment locater
	  	if(!pattern.test(str)) {
	  		alert("Please enter a valid URL.");
	  		return false;
	  	} else {
		  	return true;
	  	}
	}
}
