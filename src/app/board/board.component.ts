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



  ngOnInit() {this.getStagesSubscription = this.service
    .getStages()
    .subscribe((stages: Stage[]) => this.stages = stages);
  }

  onMoveTask($event: Task, i: number) {
    this.stages[i + 1].tasks.push($event);
  }

  ngOnDestroy(): void {
    this.getStagesSubscription.unsubscribe();
  }
}
