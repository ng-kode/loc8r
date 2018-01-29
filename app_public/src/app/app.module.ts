import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { HomeListComponent } from './home-list/home-list.component';
import { DistancePipe } from './distance.pipe';
import { FrameworkComponent } from './framework/framework.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    HomeListComponent,
    DistancePipe,
    FrameworkComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot([
        {
            path: '',
            component: HomeListComponent
        },
        {
            path: 'about',
            component: AboutComponent
        }
    ])
  ],
  providers: [HttpClientModule],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
