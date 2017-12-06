import {DefaultCrudRepository, DataSourceType} from '@loopback/repository';
import {TodoItem} from '../models';
import {inject} from '@loopback/core';

export class TodoItemRepository extends DefaultCrudRepository<
  TodoItem,
  typeof TodoItem.prototype.id
> {
  constructor(@inject('datasource') protected datasource: DataSourceType) {
    super(TodoItem, datasource);
  }
}
