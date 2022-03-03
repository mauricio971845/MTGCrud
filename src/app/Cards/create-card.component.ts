import { Component, OnInit, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CardService } from "../shared/card.service";
import { ManaCostService } from "../shared/mana-cost.service";
import { ICard, ISet } from "../shared/MTG.model";
import { SetService } from "../shared/set.service";

@Component({
  selector: 'create-card',
  templateUrl: './create-card.component.html',
  styles:[`
  .error input {background-color: #E3D3D5; border-color:#E36365}
  .error ::-webkit-input-placeholder {color:#E36365;}
  .error ::-moz-placeholder {color:#E36365;}
  .error :-moz-placeholder {color:#E36365;}
  .error :ms-input-placeholder {color:#E36365;}
  img {cursor:pointer}
`]

})

export class CreateCardComponent implements OnInit{
  Sets: ISet[]
  editingCard: ICard={"id":undefined, "cardName":""};
  cardHeader:String = "New Card"
  cardId: string;

  @Input() manaCostStr: string;
  newCardForm: FormGroup;
  cardName: FormControl;
  rarity: FormControl;
  set: FormControl;
  manaCost: FormControl;
  multiverseId: FormControl;

  constructor(private setService:SetService, private router:Router, private manaCostService:ManaCostService,
              private cardService:CardService, private route:ActivatedRoute){}

  ngOnInit(){
    this.editCard();
  }

  editCard(){
    this.cardHeader = "Edit Card";
    this.cardId = this.route.snapshot.params['cardId'];
    this.cardName = new FormControl('',Validators.required);
    this.rarity = new FormControl('',Validators.required);
    this.set = new FormControl('',Validators.required);
    this.manaCost = new FormControl('',Validators.required);
    this.multiverseId = new FormControl('',[Validators.required, Validators.pattern('^[0-9]*$')]);

    if (this.route.snapshot.params['cardId'])
    {
      console.log("editar "+this.cardId)
      this.cardService.getCard(this.cardId)
      .subscribe(elemento => {
        this.editingCard = elemento;

        this.cardName.setValue(elemento.cardName);
        this.rarity.setValue(elemento.rarity);
        this.set.setValue(elemento.setName);
        this.manaCost.setValue(elemento.manaCost);
        this.multiverseId.setValue(elemento.multiverseId);

        this.manaCostStr = elemento.manaCost;
        this.manaCostService.manaCost$.emit(this.manaCostStr);
      })
    }

    this.newCardForm = new FormGroup({
      cardName: this.cardName,
      rarity: this.rarity,
      set: this.set,
      manaCost: this.manaCost,
      multiverseId: this.multiverseId
    })

    this.setService.getSets()
    .subscribe(SetList => {
      this.Sets = [];
      SetList.forEach(elemento=>{
        this.Sets.push(elemento)
      });
    })

  }

  validateField(fieldName:string){
    return this.newCardForm.controls[fieldName].valid || this.newCardForm.controls[fieldName].untouched;
  }

  saveCard(formValues){
    this.editingCard.cardName = formValues.cardName,
    this.editingCard.rarity = formValues.rarity,
    this.editingCard.setName = formValues.set,
    this.editingCard.manaCost = formValues.manaCost,
    this.editingCard.multiverseId = formValues.multiverseId

    console.log(this.editingCard);

    if (this.editingCard.id)
    {
      console.log(this.editingCard);
      this.cardService.updateCard(this.editingCard.id.toString(), this.editingCard)
      .subscribe(elemento=>{console.log(elemento)});
    }
    else
    {
      this.cardService.addCard(this.editingCard)
      .subscribe(elemento=>{console.log(elemento)});
    }

    this.router.navigate(['/Sets']);

  }

  setManaCost(value:string){
    let grayNumber: number = 0;
    if (this.manaCostStr)
    {
      if (value == "1")
      {

        if (Number(this.manaCostStr.charAt(1))>0 && Number(this.manaCostStr.charAt(2))>=0)
        {
          grayNumber = parseInt(this.manaCostStr.substr(1,2));
          this.manaCostStr = "{"+(grayNumber+1)+"}"+ this.manaCostStr.substr(4,this.manaCostStr.length);
          console.log('Hello')
        }
        else if (Number(this.manaCostStr.charAt(1))>0)
        {
          grayNumber = parseInt(this.manaCostStr.substr(1,1));
          this.manaCostStr = "{"+(grayNumber+1)+"}" + this.manaCostStr.substr(3,this.manaCostStr.length);
        }
      }else{
        this.manaCostStr = this.manaCostStr+",{"+value+"}";
      }
    }
    else
    {this.manaCostStr = "{"+value+"}";}

    this.manaCostService.manaCost$.emit(this.manaCostStr);


    //console.log(this.manaCostStr);
  }
  cancel(){
    this.router.navigate(['Sets']);
  }

  clearManaCost(){
    this.manaCostStr = '';
    this.manaCostService.manaCost$.emit('');
  }

}
