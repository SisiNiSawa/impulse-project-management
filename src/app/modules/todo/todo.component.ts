import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../sidebar/sidebar.service';
import { DatabaseService } from '../../database.service';

import { Todo } from '../../shared/todo.model';
import { TodoItem } from '../../shared/todo-item.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  checkmark: boolean = false;
  todo: Todo;
  editIndex: number = undefined;

  constructor(
    private sidebarService: SidebarService,
    private dbService: DatabaseService
  ) {
    this.todo = this.sidebarService.selectedItem;
  }

  ngOnInit() {
  }

  newItem() {
    let newTodo = new TodoItem;
    newTodo.order = this.todo.items.length + 1;
    this.todo.items.push(newTodo);
    this.pushToDB()
    setTimeout( () => {
      this.editIndex = this.todo.items.length -1;
    }, 10)
  }

  removeItem(index: number) {
    this.editIndex = undefined;
    this.todo.items.splice(index, 1);
    this.pushToDB()
  }

  editItem(index: number) {
    this.editIndex = index;
  }

  updateItem(index: number) {
    this.editIndex = undefined;
    this.pushToDB()
  }

  toggleChecked(index: number) {
    this.todo.items[index].checked = !this.todo.items[index].checked;
    this.pushToDB();
  }

  // so we always have an up to date revision for our todo list
  pushToDB() {
    this.dbService.updateItem(this.todo).then( () => {
      this.dbService.getEntryByID(this.todo._id).then( (todo) => {
        this.todo = todo;
      });
    });
  }

}
