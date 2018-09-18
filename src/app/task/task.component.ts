///<reference path="../../../node_modules/rxjs/internal/Observable.d.ts"/>
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Task} from '../models/task.service';
import {BackendService} from "../backend.service";
import {Subscription} from "rxjs/internal/Subscription";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit, OnDestroy {

  @Input()
  task: Task;

  @Input()
  moveEnabled: boolean;

  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  @Output()
  delTask: EventEmitter<Task> = new EventEmitter<Task>();

  isEdit = false;
  taskName: string;
  taskDescription: string;
  taskExecutor: string;

  executors: string[] = ['Петров А.', 'Павлов М.'];

  updateTaskSubscription: Subscription;


  constructor(private service: BackendService) {
  }

  ngOnInit() {
  }

  moveAhead() {
    this.moveTask.emit(this.task);
  }

  onEditStart() {
    this.isEdit = true;
    this.taskName = this.task.name;
    this.taskDescription = this.task.description;
    this.taskExecutor = this.task.executor;
  }

  onEditFinish() {
    this.isEdit = false;
    this.task.name = this.taskName
    this.task.executor = this.taskExecutor
    this.task.description = this.taskDescription
    this.updateTaskSubscription = this.service
      .updateTask(this.task)
      .subscribe(() => this.updateTaskSubscription.unsubscribe())
  }

  deleteTask(task: Task) {

    const delTaskSubscription = this.service
      .deleteTask(task)
      .subscribe(() => {
          this.delTask.emit(this.task);
          delTaskSubscription.unsubscribe();
        }
      );

  }

  onEditCancel() {
    this.isEdit = false;
  }

  ngOnDestroy(): void {
  }
}
