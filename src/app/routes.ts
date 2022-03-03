import { Routes } from "@angular/router"
import { CardsListComponent } from "./Cards/cards-list.component"
import { SetsListComponent } from "./Sets/Sets-List.Component"
import { CreateSetComponent } from "./Sets/create-set.component"
import { NotFoundComponent } from "./errors/404.component"
import { CreateCardComponent } from "./Cards/create-card.component"


export const appRoutes: Routes = [
  { path: 'Sets', component: SetsListComponent },
  { path: 'Sets/New', component: CreateSetComponent },
  { path: 'Sets/Edit/:setId', component: CreateSetComponent },
  { path: 'Sets/:setName', component: CardsListComponent},
  { path: 'Cards/New', component: CreateCardComponent},
  { path: 'Cards/Edit/:cardId', component: CreateCardComponent},
  { path: 'Cards/:searchTerm', component: CardsListComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: '/Sets', pathMatch:'full'},
  { path: '**', redirectTo: '/Sets', pathMatch:'full'}
]
