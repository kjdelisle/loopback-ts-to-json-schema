import {post, param, get, put, patch, del, HttpErrors} from '@loopback/rest';
import {Todo} from '../models';
import {repository} from '@loopback/repository';
import {TodoRepository} from '../repositories/index';
import {resolve} from 'path';
import {inspect} from 'util';
import {SchemaObject} from '@loopback/openapi-spec';
import {readFileSync} from 'fs';
import { inject } from '@loopback/context';
const TodoSchema = require('../schemas/Todo.schema.json');

export class TodoController {
  constructor(
    @repository(TodoRepository.name) protected todoRepo: TodoRepository,
  ) {
  }

  @post('/todo')
  @param.body('todo', TodoSchema)
  async createTodo(todo: Todo) {
    if (!todo.title) {
      return Promise.reject(new HttpErrors.BadRequest('title is required'));
    }
    const result = await this.todoRepo.create(todo);
    return result;
  }

  @get('/todo/{id}')
  @param.path.number('id')
  @param.query.boolean('items')
  async findTodoById(id: number, items?: boolean): Promise<Todo> {
    return await this.todoRepo.findById(id);
  }

  @get('/todo')
  async findTodos(): Promise<Todo[]> {
    return await this.todoRepo.find();
  }

  @put('/todo/{id}')
  @param.path.number('id')
  @param.body('todo', TodoSchema)
  async replaceTodo(id: number, todo: Todo): Promise<boolean> {
    return await this.todoRepo.replaceById(id, todo);
  }

  @patch('/todo/{id}')
  @param.path.number('id')
  @param.body('todo', TodoSchema)
  async updateTodo(id: number, todo: Todo): Promise<boolean> {
    return await this.todoRepo.updateById(id, todo);
  }

  @del('/todo/{id}')
  @param.path.number('id')
  async deleteTodo(id: number): Promise<boolean> {
    return await this.todoRepo.deleteById(id);
  }
}
