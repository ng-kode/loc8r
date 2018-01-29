import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';


import { HomeListComponent } from './home-list/home-list.component';
import { DistancePipe } from './distance.pipe';


@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule
  ],
  providers: [HttpClientModule],
  bootstrap: [HomeListComponent]
})
export class AppModule { }
