import { BrowserModule } from '@angular/platform-browser';
import {ClassProvider, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProviderService} from './services/provider.service';
import {AuthInterceptor} from './AuthInterceptor';
import { AddEditComponent } from './add-edit/add-edit.component';
import {MainService} from './services/main.service';
import {MatButtonModule, MatInputModule, MatSelectModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AuthComponent } from './auth/auth.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {RouterModule, Routes} from '@angular/router';
import { ApplyComponent } from './apply/apply.component';

const appRoutes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'add-edit',      component: AddEditComponent },
  { path: 'apply', component: ApplyComponent},
  { path: '',
    redirectTo: '/add-edit',
    pathMatch: 'full'
  }
];
@NgModule({
  declarations: [
    AppComponent,
    AddEditComponent,
    AuthComponent,
    ApplyComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MDBBootstrapModule.forRoot(),
    RouterModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
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
