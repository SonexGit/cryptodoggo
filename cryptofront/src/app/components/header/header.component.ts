import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    @Output("switchTheme") switchThemeEvent: EventEmitter<any> = new EventEmitter();
    
	darkModeEnabled: boolean;

    constructor() { 
        this.darkModeEnabled = false
    }

    ngOnInit(): void {
    }

    switchTheme() {
        this.darkModeEnabled = !this.darkModeEnabled
        this.switchThemeEvent.emit()
    }

}
