import { TodoItem } from './todo-item.model';

export class Todo {
  constructor(
    public _id: string = "",
    public type: string = "todo",
    public name: string = "",
    public icon: string = "fa-file-text-o ",
    public items: TodoItem[] = []
  ) {}
}
