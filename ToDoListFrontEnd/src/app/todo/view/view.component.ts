import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import {TodoService} from "../todo.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  title!:string;
  todo!: Todo;
  constructor(
    public todoService: TodoService,
    private route:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    const title = this.route.snapshot.queryParamMap.get("title");
    console.log(title);
    if(title!==null){
      this.title = title
      this.todoService.find(this.title).subscribe((data:Todo) => {
        console.log(data);
        this.todo = data;
      });
    }
  }

}
