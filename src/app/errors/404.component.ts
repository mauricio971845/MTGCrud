import { style } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  template: `
    <div class="container-fluid text-center">
      <div class="row">
        <div class="col-12"><h1 class="display-5">Page not found</h1></div>
      </div>
      <div class="row">
        <div class="col-12"><a [routerLink]="['/Sets']">Go home page</a>  </div>
      </div>

    </div>
  `

})

export class NotFoundComponent{


}
