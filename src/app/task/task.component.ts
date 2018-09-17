import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../models/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input()
  task: Task;

  @Input()
  moveEnabled: boolean;

  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();

  constructor() {
  }

  ngOnInit() {
  }

  moveAhead() {
    this.moveTask.emit(this.task);
  }
}
