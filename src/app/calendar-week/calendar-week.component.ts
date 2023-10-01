import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-week',
  templateUrl: './calendar-week.component.html',
  styleUrls: [ './calendar-week.component.css' ],
})

export class CalendarWeekComponent implements OnInit {
  // public weekday = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];
  public weekdays = [ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'sunday' ];


  timeColumn: string[] = [];
  events: ZoneUIEvent[] = [];

  ngOnInit(): void {
    this.timeColumn = this.getTime(9, 0, 8, 15);
    console.log('this.timeColumn', this.timeColumn);
    this.getShedule().weeklySchedules.map((eventDay: { [key: string]: any }) => {
      return this.weekdays.map(dayOfWeek => {
        eventDay[dayOfWeek].scheduledEvents
          // .filter((event: ScheduledEvent) => event.id === 'f87e4167-8748-4c8a-9af8-3e4da747658c')
          .map((event: ScheduledEvent) => {
            let dayIndex = this.weekdays.indexOf(dayOfWeek);
            console.log('event', event);

            let eventStartAndDuration = this.getEventStartAndDuration(event.startTime, event.endTime);
            console.log('eventStartAndDuration', eventStartAndDuration);

            this.events.push({
              height: eventStartAndDuration.eventDuration,
              top: eventStartAndDuration.eventStart,
              left: dayIndex === 0 ? 135 : dayIndex * 135,
              name: event.eventName,
              width: 135,
            });
          });
      });
    });
  }


  getTime(hours: number, startMinutes: number, durationHours: number = 60, step: number = 15) {
    const result = [];
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(startMinutes);
    var time = date.getTime();
    var mint = date.getMinutes();
    result.push(this.handleZero(hours) + ':' + this.handleZero(startMinutes));

    for (var i = 1; i <= Math.ceil(durationHours * 60 / step); i++) {
      var quarter_min = Math.ceil((mint / step)) * step + (i * step);
      var d2 = new Date(time + (quarter_min - mint) * 60000);
      result.push(this.handleZero(d2.getHours()) + ':' + this.handleZero(d2.getMinutes()));
    }
    return result;
  }

  private handleZero(num: number) {
    return String(num).padStart(2, '0');
  }

  private getEventStartAndDuration(startTime: string, endTime: string) {
    let calendartStart = moment('09:00:00', 'HH:mm:ss');
    let eventStart = moment(startTime, 'HH:mm:ss');
    let eventEnd = moment(endTime, 'HH:mm:ss');

    let eventStartHrs = moment.duration(eventStart.diff(calendartStart)).asHours();
    let eventDurationHrs = moment.duration(eventEnd.diff(eventStart)).asHours();

    console.log('------->>>>', eventStartHrs);
    // console.log(eventStart, eventEnd, data/1000/60/60, eventStart);
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
}


export interface ZoneUIEvent {
  width: number;
  height: number;
  top: number;
  left: number;
  name: string;
}


export interface ScheduledEvent {
  id: string;
  eventName: string;
  startTime: string;
  endTime: string;
  totalDurationMin: number;

}

// {
//   'id': '8042434b-0ef0-466d-9bed-76cd00fdaa1e',
//   'eventName': 'Daily Scrum',
//   'startTime': '09:00:00',
//   'endTime': '09:15:00',
//   'totalDurationMin': 15,
// },
