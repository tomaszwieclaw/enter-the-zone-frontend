import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthComponent } from './auth/auth.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';

const routers: Routes = [
  // {path: '', component: AppComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'week', component: CalendarWeekComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CalendarWeekComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    RouterModule.forRoot(routers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
