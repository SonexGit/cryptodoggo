import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	title = 'Cryptodoggo';
	constructor() {
		this.loadScripts();
	}

	// Method to dynamically load JavaScript
	loadScripts() {

		// This array contains all the files/CDNs
		const dynamicScripts = [
			'assets/app.js',
			'assets/graph.js',
			'assets/spotify.js',
			'assets/twitter.js'
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
