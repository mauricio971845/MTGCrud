import { style } from "@angular/animations";
import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CardService } from "../shared/card.service";

@Component({
selector: 'nav-bar',
templateUrl: './nav-bar.component.html',
styles:[`
    .nav.navbar-nav {font-size:15px;}
    #searchForm {margin-right:100px;}
    @media (max-width: 1200px) {#searchForm {display:none;}}
    li > a.active {color:#F97924}
  `]


})

export class NavBarComponent{
  searchTerm: string = "";
  constructor(private cardService:CardService, private router:Router, private route:ActivatedRoute){}


    searchCards(formValues){
      console.log(this.searchTerm);
      console.log(this.route.component.toString)
      this.router.navigate(['Cards/',this.searchTerm]);

    }



}
