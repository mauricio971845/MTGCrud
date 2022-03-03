import { Component, Input, OnChanges } from "@angular/core";
import { ICard } from "../shared/MTG.model";
import { CardService } from "../shared/card.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
selector: 'cards',
template:`

  <div class="row" style="font-weight:bold" *ngIf="Cards.length>0">
    <div class="col-md-2">Card Name</div>
    <div class="col-md-2">Card Type </div>
    <div class="col-md-2">Rarity</div>
    <div class="col-md-6">Mana Cost</div>
  </div>
  <div class="row" *ngIf="Cards.length<=0">
    <div class="col-md-12"><h4>No cards found</h4></div>
  </div>

  <div class="row" *ngFor="let Card of Cards">
    <div class="col-md-2">{{Card.cardName}}</div>
    <div class="col-md-2">{{Card.cardType}}</div>
    <div class="col-md-2">{{Card.rarity}}</div>
    <div class="col-md-2"><mana-cost [manaCostStr]="Card.manaCost"></mana-cost></div>
    <div class="col-md-1"><a><i class="fas fa-edit text-primary" (click)="editCard(Card.id)"></i></a> </div>
    <div class="col-md-1"><i class="fas fa-trash-alt text-danger" (click)="deleteCard(Card.id)"></i> </div>

  </div>
`,
  styles:[`i {cursor:pointer;}`]

})

export class CardsComponent implements OnChanges{
  Cards: ICard[]=[];
  @Input() setName: string = '';
  @Input() searchTerm: string = '';
  constructor(private cardService: CardService, private route:ActivatedRoute, private router:Router){}

  ngOnChanges(){
    console.log(this.searchTerm + ' changed')

  }

  ngOnInit(){
    if (this.setName)
      this.getCardsbySet()
    else if (this.searchTerm)
      this.getCardsbyName()
  }

  getCardsbySet(){
    this.cardService.getCardsBySet(this.setName)
    .subscribe(CardsSetList => {
      CardsSetList.forEach(elemento => {
        this.Cards.push(elemento)
      })
      console.table(this.Cards);
    })
  }

  getCardsbyName(){
    console.log("here");
    this.cardService.getCardsByName(this.searchTerm)
    .subscribe(CardsSetList => {
      CardsSetList.forEach(elemento => {
        this.Cards.push(elemento)
      })
      console.log(this.Cards);
    })
  }

  editCard(id:number){
    console.log("edit card " + id)
    this.router.navigate(["/Cards/Edit/",id]);
  }

  deleteCard(id:number){
    console.log("card id = "+id)
    this.Cards = this.Cards.filter(Card => Card.id !== +id);
    this.cardService.deleteCard(id)
    .subscribe(elemento=>{console.log(elemento)});
  }
}
