import { Component, OnInit } from '@angular/core';
import {Todo} from "../todo";
import {TodoService} from "../todo.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  todoList: Todo[] = [];
  constructor(public todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAll().subscribe((data) => {
      this.todoList = data;
      console.log(this.todoList);
    })
  }

  deleteTodo(title: string){
    this.todoService.delete(title).subscribe(res => {
      this.todoList = this.todoList.filter(todo => todo.title !== title);
      console.log("Post deleted successfully")
    })
  }

}
