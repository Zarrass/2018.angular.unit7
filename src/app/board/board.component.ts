import {Component, OnDestroy, OnInit} from '@angular/core';
import {Stage} from '../models/stage.service';
import {Task} from '../models/task.service';
import {BackendService} from '../backend.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, OnDestroy {

  stages: Stage[];


  getStagesSubscription: Subscription;

  constructor(private service: BackendService) {
  }


  ngOnInit() {
    this.getStagesSubscription = this.service
      .getStages()
      .subscribe((stages: Stage[]) => this.stages = stages);
  }

  refreshStage() {
    {
      const refreshStagesSubscription = this.service
        .getStages()
        .subscribe((stages: Stage[]) => {
          this.stages = stages;
          refreshStagesSubscription.unsubscribe()
        });
    }
  }

  onMoveTask(task: Task, i: number) {
    task.stageId = this.stages[i + 1].id;
    const updateTaskSubscription = this.service
      .updateTask(task)
      .subscribe(() => {
        this.refreshStage();
        updateTaskSubscription.unsubscribe()
      });
  }

  ngOnDestroy(): void {
    this.getStagesSubscription.unsubscribe();
  }
}
