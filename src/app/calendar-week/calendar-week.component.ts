import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import * as moment from 'moment';
import { HttpService } from '../service/http.service';
import { CreateTaskDialogComponent } from './create-task-dialog/create-task-dialog.component';
import { trigger } from '@angular/animations';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: [ './calendar-week.component.css' ],
})

export class CalendarWeekComponent implements OnInit {
  public weekdays = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday' ];
  public static CALENDAR_START_HOUR = 9;
  isLoading: boolean = false;


  timeColumn: string[] = [];
  events: ZoneUIEvent[] = [];

  constructor(public httpService: HttpService,
              public dialog: MatDialog) {
  }


  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CreateTaskDialogComponent, {
      width: '600px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  ngOnInit(): void {
    this.httpService.getSchedules().subscribe(response => {
      console.log('response', response.weeklySchedules);
      response.weeklySchedules.map((eventDay: { [key: string]: any }) => {
        return this.weekdays.map(dayOfWeek => {
          if (eventDay[dayOfWeek]) {
            eventDay[dayOfWeek].scheduledEvents.map((event: ScheduledEvent) => {
              let dayIndex = this.weekdays.indexOf(dayOfWeek);
              let eventTimeParameters = this.getEventTimeParameters(event.startTime, event.endTime);
              console.log(dayOfWeek, dayIndex);
              let eventColor = this.getEventColor(event.eventType);
              this.events.push({
                height: eventTimeParameters.eventDuration,
                top: eventTimeParameters.eventStart,
                left: dayIndex === 0 ? 100 : dayIndex * 215 + 100,
                name: event.eventName,
                width: 215,
                color: eventColor,
              });
            });
          }
        });
      });
    });
    this.timeColumn = this.getTimeLine(CalendarWeekComponent.CALENDAR_START_HOUR, 0, 10, 15);
  }

  private getTimeLine(startHour: number, startMinute: number, durationHours: number = 10, stepMinute: number = 15) { //TODO Refactor this method
    const result = [];
    const date = new Date();
    date.setHours(startHour);
    date.setMinutes(startMinute);
    var time = date.getTime();
    var mint = date.getMinutes();
    result.push(this.handleZero(startHour) + ':' + this.handleZero(startMinute));

    for (var i = 1; i <= Math.ceil(durationHours * 60 / stepMinute); i++) {
      var quarter_min = Math.ceil((mint / stepMinute)) * stepMinute + (i * stepMinute);
      var d2 = new Date(time + (quarter_min - mint) * 60000);
      result.push(this.handleZero(d2.getHours()) + ':' + this.handleZero(d2.getMinutes()));
    }
    return result;
  }

  private handleZero(num: number) {
    return String(num).padStart(2, '0');
  }

  private getEventTimeParameters(startTime: string, endTime: string) {
    let calendartStart = moment('09:00:00', 'HH:mm:ss'); //TODO Refactor
    let eventStart = moment(startTime, 'HH:mm:ss');
    let eventEnd = moment(endTime, 'HH:mm:ss');

    let eventStartHrs = moment.duration(eventStart.diff(calendartStart)).asHours();
    let eventDurationHrs = moment.duration(eventEnd.diff(eventStart)).asHours();

    return {
      eventStart: eventStartHrs === 0 ? 30 : (eventStartHrs * (60 / 15)) * 30,
      eventDuration: eventDurationHrs * (60 / 15) * 30,
    };
  }

  private getShedule() {
    return {
      'lastUpdated': '2023-10-01T10:32:48.6921245',
      'today': '2023-10-02',
      'weeklySchedules': [
        {
          'monday': {
            'date': '2023-10-02',
            'workdayStartTime': '09:00:00',
            'workdayEndTime': '17:00:00',
            'scheduledEvents': [
              {
                'id': 'f87e4167-8748-4c8a-9af8-3e4da747658c',
                'eventName': 'Daily Scrum',
                'startTime': '09:00:00',
                'endTime': '09:15:00',
                'totalDurationMin': 15,
              },
              {
                'id': 'cfc4611b-705d-425d-b5ea-219ed516b4a0',
                'eventName': 'Tech Interview',
                'startTime': '10:00:00',
                'endTime': '11:30:00',
                'totalDurationMin': 90,
              },
              {
                'id': 'a07f1a75-1c9b-4ee0-bdcb-1d639e3fb44c',
                'eventName': 'In the zone (1)',
                'startTime': '12:00:00',
                'endTime': '13:00:00',
                'totalDurationMin': 60,
              },
              {
                'id': 'def63efc-70d5-438d-8f14-db9b8bfb18cd',
                'eventName': 'Lunch',
                'startTime': '13:15:00',
                'endTime': '14:00:00',
                'totalDurationMin': 45,
              },
              {
                'id': '5e9250af-ff20-4d7d-8bcc-2eb5e1f74fdc',
                'eventName': 'In the zone (2)',
                'startTime': '14:15:00',
                'endTime': '15:15:00',
                'totalDurationMin': 60,
              },
              {
                'id': 'e3f60da6-33d2-4c25-9a2f-7f6c51ec1ab8',
                'eventName': 'Management Duties',
                'startTime': '15:30:00',
                'endTime': '17:00:00',
                'totalDurationMin': 90,
              },
            ],
          },
          'tuesday': {
            'date': '2023-10-03',
            'workdayStartTime': '09:00:00',
            'workdayEndTime': '17:00:00',
            'scheduledEvents': [
              {
                'id': '1f22aed0-5677-4861-a648-e1cba6ee3e88',
                'eventName': 'Daily Scrum',
                'startTime': '09:00:00',
                'endTime': '09:15:00',
                'totalDurationMin': 15,
              },
            ],
          },
          'wednesday': {
            'date': '2023-10-04',
            'workdayStartTime': '09:00:00',
            'workdayEndTime': '17:00:00',
            'scheduledEvents': [
              {
                'id': '9ac629df-c339-4e73-a7ca-e74d60e4186b',
                'eventName': 'Daily Scrum',
                'startTime': '09:00:00',
                'endTime': '09:15:00',
                'totalDurationMin': 15,
              },
            ],
          },
          'thursday': {
            'date': '2023-10-05',
            'workdayStartTime': '09:00:00',
            'workdayEndTime': '17:00:00',
            'scheduledEvents': [
              {
                'id': '893fdfca-b837-4b27-b6df-383a669a6423',
                'eventName': 'Daily Scrum',
                'startTime': '09:00:00',
                'endTime': '09:15:00',
                'totalDurationMin': 15,
              },
            ],
          },
          'friday': {
            'date': '2023-10-06',
            'workdayStartTime': '09:00:00',
            'workdayEndTime': '17:00:00',
            'scheduledEvents': [
              {
                'id': '8042434b-0ef0-466d-9bed-76cd00fdaa1e',
                'eventName': 'Daily Scrum',
                'startTime': '09:00:00',
                'endTime': '09:15:00',
                'totalDurationMin': 15,
              },
            ],
          },
          'saturday': {
            'date': '2023-10-07',
            'workdayStartTime': null,
            'workdayEndTime': null,
            'scheduledEvents': [],
          },
          'sunday': {
            'date': '2023-10-08',
            'workdayStartTime': null,
            'workdayEndTime': null,
            'scheduledEvents': [],
          },
        },
      ],
    };
  }

  private getEventColor(eventType: EventType): string {
    switch (eventType.toString()) {
      case EventType.FIXED_MEETING:
        return '#D9D9D9';
      case EventType.IN_THE_ZONE:
        return '#56CCF2';
      case EventType.LUNCH:
        return '#F8A04E';
      case EventType.TASK:
        return '#80CC28';
      default:
        return '#D9D9D9';
    }
  }

  protected readonly trigger = trigger;

  triggerRecalculation() {
    this.isLoading = true;
    this.httpService.recalculate().subscribe(repsonse => {
      this.isLoading = false;
      console.log('Recalculation done', repsonse);
    });
  }
}


export interface ZoneUIEvent {
  width: number;
  height: number;
  top: number;
  left: number;
  name: string;
  color: string;
}

export interface ScheduledEvent {
  id: string;
  eventName: string;
  startTime: string;
  endTime: string;
  totalDurationMin: number;
  priority: string;
  eventType: EventType;
}

export interface ScheduledResponse {
  'lastUpdated': string,
  'today': string,
  'weeklySchedules': any[]
}

export interface CreateNewEventRequest {
  'eventName': string; // "Sprint Demo",
  'eventDate': string; // "2023-10-06",
  'startTime': string; //'13:00:00',
  'durationMinutes': number; // 60,
  'priority': string; //'HIGH',
  // 'minPreferredStartTime': null,
  // 'maxPreferredStartTime': null
}


enum EventType {
  FIXED_MEETING = 'FIXED_MEETING',
  TASK = 'TASK',
  LUNCH = 'LUNCH',
  IN_THE_ZONE = 'IN_THE_ZONE'
}

export enum EventPriority {
  LOW = 'Low',
  NORMAL = 'Normal',
  HIGH = 'High'
}


