import {Entity} from '@loopback/repository';
import {TodoItem} from './TodoItem.model';

export class Todo extends Entity {
  id?: number;
  title: string;
  desc?: string;
  isComplete: boolean;
  todoList?: TodoItem[];
}
