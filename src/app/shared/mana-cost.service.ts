import { Injectable, EventEmitter } from "@angular/core";


@Injectable({
 providedIn: 'root'

})
export class ManaCostService{
  manaCost$ = new EventEmitter<string>();

  constructor(){}

}
