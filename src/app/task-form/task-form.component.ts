import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../models/task.service';


@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  panelOpenState = false;

  @Output()
  create: EventEmitter<Task> = new EventEmitter<Task>();

  taskForm: FormGroup;

  executors: string[] = ['Петров А.', 'Павлов М.'];

  constructor() {
    this.taskForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(250)]),
      executor: new FormControl('Петров А.', [Validators.required]),
    });
  }

  ngOnInit() {
  }

  createTask() {
    if (this.taskForm.valid) {
      const value: {
        name: string,
        description: string,
        executor: string
      } = this.taskForm.value;
      const task = new Task(value.name, value.description, value.executor, 1);
      this.taskForm.reset({
        name: '',
        description: '',
        executor: 'Павлов М',
      });
      this.create.emit(task);
      this.togglePanel();
    }
  }

  togglePanel() {
    this.panelOpenState = !this.panelOpenState
  }

}
