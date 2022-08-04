import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TodoService} from "../todo.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  form!: FormGroup;
  constructor(
    public todoService:TodoService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('',[Validators.required]),
      body: new FormControl('',Validators.required)
    })
  }
  /**
   * Write code on Method
   *
   * @return response()
   */

  get f(){
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */

  submit(){
    console.log(this.form.value);
    this.todoService.create(this.form.value).subscribe((res:any) => {
      console.log('Post created successfully!');
      this.router.navigateByUrl('todo/index');
    })
  }
}
