import { Component, OnInit } from "@angular/core";
import { ICard } from "../shared/MTG.model";
import { CardService } from "../shared/card.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'cards-list',
  template:`
    <div class="container-fluid pt-4 ps-5 pe-5">
      <div class="card">
        <div class="card-body">
          <h1 class="display-4">{{title}} </h1>
          <hr/>
          <cards [setName] = "setName" [searchTerm] = "searchTerm"></cards>
      </div>
      </div>
    </div>
  `

})

export class CardsListComponent implements OnInit{
  Cards: ICard[]=[];
  setName: string = "";
  searchTerm: string = "";
  title: string = ""
  constructor(private cardService: CardService, private route:ActivatedRoute){}

  ngOnInit(){
    this.setName    = this.route.snapshot.params['setName'];
    this.searchTerm = this.route.snapshot.params['searchTerm'];

    if (this.setName)
      this.title = this.setName
    else
      this.title = 'Results for "' + this.searchTerm + '"';
  }


}
