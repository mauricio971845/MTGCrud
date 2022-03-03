import { TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import { CreateCardComponent } from "../Cards/create-card.component"
import { SetService } from "../shared/set.service";
import {HttpClient,HttpHandler} from "@angular/common/http";
import { By } from '@angular/platform-browser';
import {RouterTestingModule} from "@angular/router/testing"
import {Router, RouterLinkWithHref,ActivatedRoute,convertToParamMap} from '@angular/router'
import { CardService } from "../shared/card.service";
import { observable, of } from 'rxjs';
import { Observable } from 'rxjs';
import { ICard } from "../shared/MTG.model";


describe('Test from "create-card" component',()=>
{

  let routerSpy = {navigate: jasmine.createSpy('navigate')};
  const fakeCard = {
    getCard(id:string): Observable<any[]>{
      return of([]);
    },

    addCard(id:string): Observable<any[]>{
      return of([]);
    }
  };
  beforeEach(async() => {

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations:[CreateCardComponent],
      providers: [SetService,HttpClient,HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {snapshot: {params: {'cardId': '1'}}}},
          { provide: CardService, useValue: fakeCard }
      ],
    }).compileComponents();})


    it('CreateCardComponent should exists', () => {
      let fixture = TestBed.createComponent(CreateCardComponent);
      let app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });

/*
    it('Test Routing', () => {
      let fixture = TestBed.createComponent(CreateCardComponent);
      let app = fixture.componentInstance;
      app.ngOnInit();

      expect(app).toBeTruthy();
    });
    */

    /*
    it('klajdlsaj', () => {
      let fixture = TestBed.createComponent(CreateCardComponent);
      let app = fixture.componentInstance;
      expect(app).toBeTruthy();

      const testSets: ISet[] = [ {id: 1, setName: 'Set1', code:'S1', setType:'A',releasedDate:'11/20/21'},
      {id: 2, setName: 'Set2', code:'S2', setType:'B',releasedDate:'11/20/21'}];

      spyOn(setService,'getSetsList').and. returnValues(of(testSets));

    });
*/
    it('Should return invalid form', () => {
      let fixture = TestBed.createComponent(CreateCardComponent);
      let app = fixture.componentInstance;
      fixture.detectChanges();

      const form = app.newCardForm;
      const CardName = app.cardName;

      CardName.setValue('Test Card');
      expect(form.invalid).toBeTrue();
    });


    it('Should return valid form', () => {
      let fixture = TestBed.createComponent(CreateCardComponent);
      let app = fixture.componentInstance;
      fixture.detectChanges();

      const form = app.newCardForm;
      const CardName = app.cardName;
      const Rarity = app.rarity;
      const Set = app.set;
      const ManaCost = app.manaCost;
      const MultiverseId = app.multiverseId;

      CardName.setValue('Test Card');
      Rarity.setValue('Common');
      Set.setValue('Chronicles');
      ManaCost.setValue('{W}');
      MultiverseId.setValue('54');
      expect(form.invalid).toBeFalse();
    });

    it('Should return mana cost', () => {
      let fixture = TestBed.createComponent(CreateCardComponent);
      let app = fixture.componentInstance;
      fixture.detectChanges();
      app.setManaCost('1');
      expect(app.manaCostStr).toBe('{1}')
      app.setManaCost('1');
      app.setManaCost('1');
      app.setManaCost('1');
      app.setManaCost('1');
      app.setManaCost('1');
      app.setManaCost('1');
      app.setManaCost('1');
      app.setManaCost('1');
      app.setManaCost('1');
      app.setManaCost('1');
      expect(app.manaCostStr).toBe('{11}')
      app.setManaCost('U');
      app.setManaCost('B');
      expect(app.manaCostStr).toBe('{11},{U},{B}')
      app.clearManaCost();
      expect(app.manaCostStr).toBe('')
    });


    it('Should test save card', () => {
      let fixture = TestBed.createComponent(CreateCardComponent);
      let app = fixture.componentInstance;
      fixture.detectChanges();

      const btnElement = fixture.debugElement.query(By.css('button.btn'));
      const testData: ICard  = {id: 0, cardName: 'Test Card', rarity: 'Common', setName: 'Chronicles', manaCost: '{W}', multiverseId: 5}
      app.newCardForm.controls['cardName'].setValue('Test Card');
      app.newCardForm.controls['rarity'].setValue('Common');
      app.newCardForm.controls['set'].setValue('Chronicles');
      app.newCardForm.controls['manaCost'].setValue('{W}');
      app.newCardForm.controls['multiverseId'].setValue(5);
      app.editingCard.id = 0;
      fixture.detectChanges();

      app.saveCard(app.newCardForm.value);

      //btnElement.nativeElement.click();
      fixture.detectChanges();
      console.log(app.newCardForm.value);
      expect(app.editingCard.cardName).toEqual(testData.cardName);
      expect(app.editingCard.rarity).toEqual(testData.rarity);
      expect(app.editingCard.setName).toEqual(testData.setName);
      expect(app.editingCard.manaCost).toEqual(testData.manaCost);
      expect(app.editingCard.multiverseId).toEqual(testData.multiverseId);
    });

});
