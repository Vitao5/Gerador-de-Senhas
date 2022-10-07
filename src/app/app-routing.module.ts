import { HomeComponent } from './view/home/home.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
      path: '',
      component: HomeComponent,
    },
]

@NgModule({
    imports: [RouterModule.forRoot(routes,{ useHash: true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }