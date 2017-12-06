import {Entity} from '@loopback/repository';

export class TodoItem extends Entity {
  title: string;
  isComplete: boolean;
}
