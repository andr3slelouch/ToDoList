import { Component, OnInit } from '@angular/core';
import { TodoService } from "../todo.service";
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Todo } from "../todo";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  title!: string;
  todo!: Todo;
  form!: FormGroup;
  constructor(
    public todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const title = this.route.snapshot.queryParamMap.get("title");
    if(title!==null){
      this.title = title
        this.todoService.find(this.title).subscribe((data: Todo)=>{
          this.todo = data;
        })
      this.form = new FormGroup({
        title: new FormControl('',[Validators.required]),
        body: new FormControl('',Validators.required)
      });
    }

  }

  get f(){
    return this.form.controls;
  }

  submit(){
    console.log(this.form.value);
    this.todoService.update(this.form.value).subscribe((res:any)=>{
      console.log("Post updated successfully");
      this.router.navigateByUrl('todo/index');
    })
  }

}
