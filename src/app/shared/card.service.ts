import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ICard } from "./MTG.model";

@Injectable()

export class CardService{
  constructor(private httpServer: HttpClient){}

  getCardsBySet(setName:string){
    return this.httpServer.get<ICard[]>("http://localhost:3000/Cards?setName="+setName);
  }

  getCards(){
    return this.httpServer.get<ICard[]>("http://localhost:3000/Cards");
  }

  getCard(id:string){
    return this.httpServer.get<ICard>(`http://localhost:3000/Cards/${id}`);
  }

  getCardsByName(cardName:string){
    return this.httpServer.get<ICard[]>("http://localhost:3000/Cards?cardName_like="+cardName);
  }

  deleteCard(Id:number) {
    return this.httpServer.delete(`http://localhost:3000/Cards/${Id}`)
  }

  addCard(data){
    const options = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
    return this.httpServer.post('http://localhost:3000/Cards', data, options);
  }

  updateCard(id: string, data: any){
     const options = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
     return this.httpServer.put(`http://localhost:3000/Cards/${+id}`, data, options);
    }


}


