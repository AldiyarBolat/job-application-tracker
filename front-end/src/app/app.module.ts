import { BrowserModule } from '@angular/platform-browser';
import {ClassProvider, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProviderService} from './services/provider.service';
import {AuthInterceptor} from './AuthInterceptor';
import { AddEditComponent } from './add-edit/add-edit.component';
import {MainService} from './services/main.service';
import {MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AddEditComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule
  ],
  providers: [
    ProviderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    } as ClassProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
