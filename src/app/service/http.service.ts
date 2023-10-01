import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ScheduledResponse } from '../calendar-week/calendar-week.component';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  private readonly SERVER_URL = 'http://localhost:8080/api/';

  constructor(public httpClient: HttpClient) {
  }

  public getSchedules(): Observable<ScheduledResponse> {

    return this.httpClient.get<ScheduledResponse>(this.SERVER_URL + 'schedules');
  }

  public createTask(taskPayload: {scheduledEvents: CreateTaskRequest[] }): Observable<any>{
   return   this.httpClient.post<any>(this.SERVER_URL + 'scheduled-events',taskPayload);
  }

  recalculate() {
    return this.httpClient.post(this.SERVER_URL +"schedules/recalculate", {});
  }
}




export interface CreateTaskRequest {
  eventName: string;//"CTO weekly sync",
  eventType: string;// "TASK",    hardcoded
  // "eventDate": "2023-10-03", ???
  // "durationMinutes": 30,  shoudl be
  'priority': string; // "LOW",	 should be
}

