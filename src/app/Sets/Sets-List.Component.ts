import { Component, OnInit } from '@angular/core';
import { SetService } from '../shared/set.service';
import { ISet } from '../shared/MTG.model';
import { Router } from '@angular/router';

@Component({
  selector: 'Sets-List',
  template: `

    <div class="container mt-4">

      <div class="row"  >
        <div class="col-12">
          <div class="card mb-3">
            <div class="card-body">
              <div class="row">
                <div class="col-10"><h2>Sets List</h2></div>
                <div class="col-2 d-flex flex-row-reverse"><button class="btn btn-dark float-right" [routerLink]="['/Sets/New']"  > Add Set</button></div>
              </div>
              <hr/>
              <div class="row bg-secondary table-head" >
                 <div class="col-md-3 col-sm-12">Set name</div>
                 <div class="col-md-1 col-sm-12">Code</div>
                 <div class="col-md-1 col-sm-12">Set Type</div>
                 <div class="col-md-2 col-sm-12">Release Date</div>
                 <div class="col-md-2 col-sm-12">Block Name</div>
                 <div class="col-md-1 col-sm-12">Symbol</div>
                 <div class="col-md-2"></div>
              </div>

              <div  class="row hoverSet striped" *ngFor="let Set of Sets; let index = index" (click)="getSetCards(Set.setName)">
                    <div class="col-md-3 col-sm-12">{{Set?.setName}}</div>
                    <div class="col-md-1 col-sm-12">{{Set?.code}}</div>
                    <div class="col-md-1 col-sm-12">{{Set?.setType}}</div>
                    <div class="col-md-2 col-sm-12">{{Set?.releasedDate | date}}</div>
                    <div class="col-md-2 col-sm-12">{{Set?.blockName}} {{Set.id}}</div>
                    <div class="col-md-1 col-sm-12"><span *ngIf="Set?.symbol"> <img src="/assets/images/Sets/{{Set?.symbol}}" alt="" style="height: 20px;"></span></div>
                    <div class="col-md-1"><i class="fas fa-edit text-primary" (click)="editSet(Set.id)"></i> </div>
                    <div class="col-md-1"><i class="fas fa-trash-alt text-danger" (click)="deleteSet(Set.id)"></i> </div>
              </div>


            </div>
          </div>
        </div>
      </div>

    </div>

<!--
    <div class="container text-center py-5">
      <h1 class="display-1"> hola mundo</h1>

    </div>
-->
  `,
  styles:[
    `
       .rowcolor1 div {background-color:#FFF}
       .rowcolor2 div {background-color:#BBB}
       .thumbnail {min-height:210px;}
       .pad-left {margin-left:10px;}
       a {cursor:pointer}

       td div:nth-of-type(odd) { background: #e0e0e0; }
       td div:nth-of-type(even) { background: #FFFFFF; }





      .row.table-head{color: #fff ; padding: 1rem; font-weight: 500; text-transform: uppercase;}

      .row.striped{color: #000; padding: 1rem; background: #e0e0e0;}

      .row.striped:nth-child(odd){background: #FFFFFF;}

      .row.striped:focus,.row.striped:hover{background: #24a0ed;}

      @media (max-width: 767.98px) {row.table-head{display:none;}}
    `

  ]
})

export class SetsListComponent implements OnInit{
  Sets: ISet[]=[];
  deleting: boolean = false;
  editing: boolean = false;
  constructor(private setService:SetService, private router: Router){}

  ngOnInit(){
    this.setService.getSets()
    .subscribe(SetList => {
      this.Sets = [];
      SetList.forEach(elemento=>{
        //console.log(elemento)
        this.Sets.push(elemento)
      });
    })
    //console.log(this.Sets)
  }

  getSetCards(setName: string){
    if (!this.deleting && !this.editing)
       this.router.navigate(["/Sets/"+setName]);
    this.deleting = false;
  }

  addSet(){
    console.log('Add set click')
  }

  editSet(id: number){
    //console.log("Editing Set");
    this.router.navigate(["/Sets/Edit/",id]);
    this.editing = true;
  }

  deleteSet(id: number){
    this.deleting = true;

    this.Sets = this.Sets.filter(Set => Set.id !== +id);
    this.setService.deleteSet(id).subscribe( resultado => {
      console.log("Set deleted");
      console.log(resultado)
    });
    this.deleting = false;

    /*
     this.deleting = true;
     this.setService.deleteSet(id).then(()=> {
       console.log("Set deleted");
     }).catch(error=>{console.log(error)})
     */
  }

}
