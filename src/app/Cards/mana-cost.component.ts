import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ManaCostService } from "../shared/mana-cost.service";

@Component({
  selector: 'mana-cost',
  template: `

    <span *ngFor="let Cost of ManaCost">
      <span [ngSwitch]=Cost *ngIf="Cost!=null">
        <img *ngSwitchCase="'{W}'" src="{{SymbolPath}}White.png" />
        <img *ngSwitchCase="'{B}'" src="{{SymbolPath}}Black.png" />
        <img *ngSwitchCase="'{U}'" src="{{SymbolPath}}Blue.png" />
        <img *ngSwitchCase="'{G}'" src="{{SymbolPath}}Green.png" />
        <img *ngSwitchCase="'{R}'" src="{{SymbolPath}}Red.png" />

        <img *ngSwitchCase="'{W/B}'" src="{{SymbolPath}}WhiteBlack.png" />
        <img *ngSwitchCase="'{W/U}'" src="{{SymbolPath}}WhiteBlue.png" />
        <img *ngSwitchCase="'{B/R}'" src="{{SymbolPath}}BlackRed.png" />
        <img *ngSwitchCase="'{U/B}'" src="{{SymbolPath}}BlueBlack.png" />
        <img *ngSwitchCase="'{G/W}'" src="{{SymbolPath}}GreenWhite.png" />
        <img *ngSwitchCase="'{R/G}'" src="{{SymbolPath}}RedGreen.png" />
        <img *ngSwitchCase="'{U/R}'" src="{{SymbolPath}}BlueRed.png" />
        <img *ngSwitchCase="'{B/G}'" src="{{SymbolPath}}BlackGreen.png" />
        <img *ngSwitchCase="'{R/W}'" src="{{SymbolPath}}RedWhite.png" />
        <img *ngSwitchCase="'{G/U}'" src="{{SymbolPath}}GreenBlue.png" />

        <img *ngSwitchCase="'{2W}'" src="{{SymbolPath}}2White.png" />
        <img *ngSwitchCase="'{2B}'" src="{{SymbolPath}}2Black.png" />
        <img *ngSwitchCase="'{2U}'" src="{{SymbolPath}}2Blue.png" />
        <img *ngSwitchCase="'{2G}'" src="{{SymbolPath}}2Green.png" />
        <img *ngSwitchCase="'{2R}'" src="{{SymbolPath}}2Red.png" />

        <img *ngSwitchCase="'{0}'" src="{{SymbolPath}}0.png" />
        <img *ngSwitchCase="'{1}'" src="{{SymbolPath}}1.png" />
        <img *ngSwitchCase="'{2}'" src="{{SymbolPath}}2.png" />
        <img *ngSwitchCase="'{3}'" src="{{SymbolPath}}3.png" />
        <img *ngSwitchCase="'{4}'" src="{{SymbolPath}}4.png" />
        <img *ngSwitchCase="'{5}'" src="{{SymbolPath}}5.png" />
        <img *ngSwitchCase="'{6}'" src="{{SymbolPath}}6.png" />
        <img *ngSwitchCase="'{7}'" src="{{SymbolPath}}7.png" />
        <img *ngSwitchCase="'{8}'" src="{{SymbolPath}}8.png" />
        <img *ngSwitchCase="'{10}'" src="{{SymbolPath}}10.png" />
        <img *ngSwitchCase="'{11}'" src="{{SymbolPath}}11.png" />
        <img *ngSwitchCase="'{X}'" src="{{SymbolPath}}X.png" />

        <small *ngSwitchDefault>{{CleanCost(Cost)}}</small>

      </span>
    </span>
  `


})

export class ManaCostComponent implements OnInit, OnDestroy{
  @Input() manaCostStr: string;
  ManaCost:string[];
  SymbolPath: string= '/assets/images/ColorSymbols/';
  WSymbol: string= '/assets/images/ColorSymbols/White.png';
  BSymbol: string= '/assets/images/ColorSymbols/Black.png';
  USymbol: string= '/assets/images/ColorSymbols/Blue.png';
  GSymbol: string= '/assets/images/ColorSymbols/Green.png';
  RSymbol: string= '/assets/images/ColorSymbols/Red.png';

  manaCostServStr: string= "nada";
  ManaSubscription: Subscription;

  constructor(private manaCostService:ManaCostService){ }
  ngOnDestroy() {
    if (this.ManaSubscription)
    {
      console.log("destroy mana sub")
      this.ManaSubscription.unsubscribe();
    }
  }

  ngOnInit(){
    if(!this.manaCostStr)
    {
      this.ManaSubscription = this.manaCostService.manaCost$.subscribe(valor => {
        this.manaCostStr =  valor;

        if (this.manaCostStr != null && this.manaCostStr != '')
          this.ManaCost = this.manaCostStr.split(",")
        else
        this.ManaCost = []
      })
    } else {
       this.ManaCost = this.manaCostStr.split(",");
    }
  }

  CleanCost(Cost:string){
    return Cost.replace('{','').replace('}','');
  }






}



