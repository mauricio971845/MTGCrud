//### Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


//### Components
import { AppComponent } from './app.component';
import { NavBarComponent } from './NavBar/nav-bar.component';
import { SetsListComponent } from './Sets/Sets-List.Component';
import { CreateSetComponent } from './Sets/create-set.component';
import { CardsListComponent } from './Cards/cards-list.component';
import { CardsComponent } from './Cards/cards';
import { CreateCardComponent } from './Cards/create-card.component'
import { ManaCostComponent } from './Cards/mana-cost.component';
import { NotFoundComponent } from './errors/404.component';
//### Services
import { SetService } from './shared/set.service';
import { CardService } from './shared/card.service';
import { ManaCostService } from './shared/mana-cost.service';
//### Routes
import { appRoutes } from './routes';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SetsListComponent,
    CardsListComponent,
    CreateSetComponent,
    CardsComponent,
    CreateCardComponent,
    ManaCostComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule

  ],
  providers: [SetService,CardService,ManaCostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
