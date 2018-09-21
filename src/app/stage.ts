import {Task} from './task';

export class Stage {
  name: string;
  tasks: Task[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
