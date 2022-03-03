import { Injectable } from "@angular/core";
import { ISet } from "./MTG.model"
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class SetService{
  selectSet: ISet;

  BASE_URL = 'http://localhost:3000/';

  constructor(private httpServer: HttpClient){}

  getSets(){
    //console.log("fsfd");
    //console.log(this.httpServer.get<any[]>("http://localhost:3000/Sets"))
    return this.httpServer.get<ISet[]>(this.BASE_URL + "Sets");
  }

  deleteSet(Id:number){
    return this.httpServer.delete(`http://localhost:3000/Sets/${Id}`)
  }

  getSet(setId:string){
    return this.httpServer.get  <ISet>(`http://localhost:3000/Sets/${setId}`);
  }

  addSet(data){
    const options = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
    return this.httpServer.post('http://localhost:3000/Sets', data, options);
  }

  updateSet(setId: string, data: any){
     const options = {headers: new HttpHeaders({'Content-Type':  'application/json'})};
     return this.httpServer.put(`http://localhost:3000/Sets/${+setId}`, data, options);
    }

}
