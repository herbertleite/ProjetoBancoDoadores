import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, } from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router'
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component';
import { HttpInterceptorModule } from './service/header-interceptor';
import { GuardiaoGuard } from './service/guardiao.guard';
import { HomeDoadorComponent } from './home-doador/home-doador.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appRouters: Routes = [

  { path: 'home-doador', component: HomeDoadorComponent },
  { path: 'home-admin', component: HomeAdminComponent, canActivate: [GuardiaoGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeDoadorComponent,
    HomeAdminComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
