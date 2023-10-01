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
  public isLoading: boolean = false;
  protected readonly EventPriority = EventPriority;

  constructor(public dialogRef: MatDialogRef<CreateTaskDialogComponent>, public httpService: HttpService) {
  }

  creteTask(dialogForm: NgForm) {
    let payload = Object.assign({}, { scheduledEvents: [ { ...dialogForm.value, eventType: 'TASK' } ] });
    this.isLoading = true;
    this.httpService.createTask(payload).subscribe(response => {
      dialogForm.reset();
      this.isLoading = false;
    });
  }
}

