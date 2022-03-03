import { Component } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ISet } from "../shared/MTG.model";
import { SetService } from "../shared/set.service";

@Component({
  selector: 'create-set',
  templateUrl: './create-set.component.html'
})

export class CreateSetComponent{
  setHeader:string = "New Set";
  EditingSet: ISet = {"id":0,"setName":"","code":"","setType":"","releasedDate":""};
  setId: string = ''
  mouseOverSaveBtn:Boolean;


  setName: string;
  code: string;
  setType: string;
  releasedDate: string;
  blockName: string;
  symbol: string;

  iconName:string;

  constructor(private router: Router, private setService: SetService, private route: ActivatedRoute){}

  ngOnInit(){
    this.editSet();
  }


  saveSet(formValues){

    if (!this.EditingSet.id)
    {
      formValues.symbol = this.iconName;
      console.log(formValues);


      this.setService.addSet(formValues)
      .subscribe(elemento => {console.log(elemento)});


      this.router.navigate(['/Sets']);


    }else{
      this.setService.updateSet(this.EditingSet.id.toString() ,this.EditingSet)
      .subscribe(elemento=> {console.log(elemento)});
      this.router.navigate(['/Sets']);
    }


  }

  editSet(){

    if (this.route.snapshot.params['setId'])
    {
      this.setHeader = "Edit Set";
      this.setId = this.route.snapshot.params['setId'];
      //console.log("Id = " + this.setId);

      this.setService.getSet(this.setId)
      .subscribe(Set => {
        this.EditingSet = Set
      })

      /*
      this.setService.getSet(this.setId)
      .snapshotChanges()
      .subscribe(data=>{
        let temp = data.payload.toJSON();
        this.EditingSet = temp as ISet;
        this.EditingSet.id  = data.payload.key;
        console.log(this.EditingSet.setName)
      })

    }*/

  }

}

  cancel(){
    this.router.navigate(['/Sets']);
  }

  importData() {
    let input = document.createElement('input');
    input.type = 'file';
    input.accept= ".png"
    input.onchange = _ => {
              let files =   Array.from(input.files);
              this.iconName = files[0].name;
          };
    input.click();

  }
}
