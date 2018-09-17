import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Stage} from '../models/stage.service';
import {Task} from '../models/task.service';
import {BackendService} from '../backend.service';
import {Subject, Subscription} from 'rxjs';
import {repeatWhen} from 'rxjs/operators';


@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.css']
})
export class StageComponent implements OnInit, OnDestroy {

  @Input()
  stage: Stage;


  @Input()
  moveEnabled: boolean;


  @Output()
  moveTask: EventEmitter<Task> = new EventEmitter<Task>();
  getTasksByStageSubscription: Subscription;
  refreshStage = new Subject();

  isEdit = false;
  stageName: string;

  constructor(private service: BackendService) {

  }

  ngOnInit() {
    this.getTasksByStageSubscription = this.service
      .getTasksByStage(this.stage.id)
      .pipe(repeatWhen(() => this.refreshStage))
      .subscribe((tasks: Task[]) => this.stage.tasks = tasks);
  }

  createTask(task: Task) {
    task.stageId = this.stage.id;
    const newTaskSubscription = this.service
      .createNewTask(task)
      .subscribe(() => {
        this.refreshStage.next();
        newTaskSubscription.unsubscribe();
      });
  }

  delTask($task: Task) {
    $task.stageId = this.stage.id;
    const delTaskSubscription = this.service
      .deleteTask($task)
      .subscribe(() => {
        this.refreshStage.next();
        delTaskSubscription.unsubscribe()
      })
  }

  onTaskMoved($move: Task) {
    this.stage.tasks = this.stage.tasks.filter(value => value !== $move);
    this.moveTask.emit($move);
  }

  ngOnDestroy(): void {
    this.getTasksByStageSubscription.unsubscribe();
  }

  onEditStart() {
    this.isEdit = true;
    this.stageName = this.stage.name;
  }

  onEditFinish() {
    this.isEdit = false;
    this.stage.name = this.stageName;
    const updateStageSubscription = this.service
      .updateStage(this.stage)
      .subscribe(() => updateStageSubscription.unsubscribe());
  }

  onEditCancel() {
    this.isEdit = false;
  }
}
