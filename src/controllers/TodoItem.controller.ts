import {post, param, get, put, patch, del, HttpErrors} from '@loopback/rest';
import {TodoItem} from '../models';
import {repository} from '@loopback/repository';
import {TodoItemRepository} from '../repositories/index';
import {resolve} from 'path';
import {inspect} from 'util';
import {SchemaObject} from '@loopback/openapi-spec';
import {readFileSync} from 'fs';
import { inject } from '@loopback/context';
const TodoItemSchema = require('../schemas/TodoItem.schema.json');

export class TodoItemController {
  constructor(
    @repository(TodoItemRepository.name) protected todoItemRepo: TodoItemRepository,
  ) {
  }

  @post('/todo/{id}/item')
  @param.path.number('id')
  @param.body('todoItem', TodoItemSchema)
  async createTodoItem(id: number, todoItem: TodoItem) {
    const result = await this.todoItemRepo.create(todoItem);
    return result;
  }

  @get('/todo/{x}/items/{id}')
  @param.path.number('x')
  @param.path.number('id')
  async findTodoItem(id: number, x?: number): Promise<TodoItem> {
    return await this.todoItemRepo.findById(id);
  }

  @del('/todo/{x}/items/{id}')
  @param.path.number('x')
  @param.path.number('id')
  async deleteTodoItem(id: number, x?: number) : Promise<boolean> {
    return await this.todoItemRepo.deleteById(id);
  }
}
