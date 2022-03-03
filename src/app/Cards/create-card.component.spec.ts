import { TestBed } from '@angular/core/testing';
import {ReactiveFormsModule,FormBuilder, FormControl, FormGroup, Validators, FormsModule} from '@angular/forms';
import { CreateCardComponent } from "../Cards/create-card.component"
import { SetService } from "../shared/set.service";
import {HttpClient,HttpHandler} from "@angular/common/http";
import { Router } from "@angular/router";

describe('Test from "create-card" component',()=>
{

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations:[CreateCardComponent],
      providers: [SetService,HttpClient,HttpHandler,Router],
    }).compileComponents();})




    it('CreateCardComponent should exists', () => {
      let fixture = TestBed.createComponent(CreateCardComponent);
      let app = fixture.componentInstance;
      expect(app).toBeTruthy();
    });


});
