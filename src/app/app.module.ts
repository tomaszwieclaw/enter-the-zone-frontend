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
import { RouterModule, Routes } from '@angular/router';
import { CalendarWeekComponent } from './calendar-week/calendar-week.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from './calendar-week/create-task-dialog/create-task-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDividerModule } from '@angular/material/divider';

const routers: Routes = [
  // {path: '', component: AppComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'week', component: CalendarWeekComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    CalendarWeekComponent,
    CreateTaskDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDividerModule,
    FormsModule,
    MatDialogModule,
    RouterModule.forRoot(routers),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
