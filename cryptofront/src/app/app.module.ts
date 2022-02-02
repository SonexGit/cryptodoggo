import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// On importe toute la librarie d'icônes de Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

import { NgApexchartsModule } from "ng-apexcharts";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CryptolineComponent } from './components/cryptoline/cryptoline.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from './components/main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    CryptolineComponent,
    FooterComponent,
    HeaderComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgApexchartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, far, fab);
	}
}
