import {Task} from './task.service';

export class Stage {
  id: number;
  name: string;
  description: string;
  boardId: number;
  tasks: Task[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
