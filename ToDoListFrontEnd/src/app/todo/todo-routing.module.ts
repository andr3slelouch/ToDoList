import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from './index/index.component';
import {ViewComponent} from './view/view.component';
import {CreateComponent} from './create/create.component';
import {EditComponent} from './edit/edit.component';

const routes: Routes = [
  {path: "todo", redirectTo: "todo/index", pathMatch: "full"},
  {path: "todo/index", component: IndexComponent},
  {path: 'todo/create', component: CreateComponent},
  {path: 'todo/view', component: ViewComponent },
  {path: 'todo/edit', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule {
}
