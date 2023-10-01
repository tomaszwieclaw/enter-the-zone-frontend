import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EventPriority } from '../calendar-week.component';
import { NgForm } from '@angular/forms';
import { HttpService } from '../../service/http.service';

@Component({
  selector: 'app-create-task-dialog',
  templateUrl: './create-task-dialog.component.html',
  styleUrls: [ './create-task-dialog.component.css' ],
})
export class CreateTaskDialogComponent {
  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>, public httpService: HttpService) {
  }

  protected readonly EventPriority = EventPriority;

  creteTask(dialogForm: NgForm) {
    console.log(dialogForm.value);

    let payload = Object.assign({}, { scheduledEvents: [ { ...dialogForm.value, eventType: 'TASK' } ] });
    console.log('paylaod', payload);
    this.httpService.createTask(payload);
  }
}

