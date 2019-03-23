import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
library.add(fas, far);

@NgModule({
  declarations: [
    AppComponent,
    ImageViewerComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule, 
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
