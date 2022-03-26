import { Component, AfterViewInit, ViewChild} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DomSanitizer } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

	@ViewChild('header') header !: HeaderComponent;

	title = 'Cryptodoggo';
	cookie_name = '';	
	cssUrl: string;
	darkModeEnabled: boolean;

	constructor(private cookieService:CookieService, public sanitizer: DomSanitizer) {
		this.loadScripts();
		this.cssUrl = ""
		this.darkModeEnabled = false;
	}
	
	ngAfterViewInit() {
		this.cookieService.get('dark') == 'false' ? this.header.darkModeEnabled = false : this.header.darkModeEnabled = true
		this.switchTheme();
	}

	switchTheme() {
		this.cssUrl = this.header.darkModeEnabled == false ? 'assets/style.css' : 'assets/style_dark.css';
		this.setCookie();
	}

	setCookie() {
		this.cookieService.set('dark', String(this.header.darkModeEnabled));
	}

	deleteCookie() {
		this.cookieService.delete('dark');
	}

	deleteAll() {
		this.cookieService.deleteAll();
	}

	// Method to dynamically load JavaScript
	loadScripts() {

		// This array contains all the files/CDNs
		const dynamicScripts = [
			'assets/app.js',
			'assets/spotify.js'
		];
		for (let i = 0; i < dynamicScripts.length; i++) {
			const node = document.createElement('script');
			node.src = dynamicScripts[i];
			node.type = 'text/javascript';
			node.async = false;
			document.getElementsByTagName('head')[0].appendChild(node);
		}
	}
}
