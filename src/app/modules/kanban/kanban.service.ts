import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DatabaseService} from '../../database.service';
import { SidebarService } from '../../sidebar/sidebar.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { Kanban } from '../../shared/kanban.model';
import { KanbanCard } from '../../shared/kanban-card.model';
import { KanbanItem } from '../../shared/kanban-item.model';

@Injectable()
export class KanbanService {
  kanban: Kanban;
  public obsv: Observable<any>;
  public observer;

  constructor(
    private dbService: DatabaseService,
    private sidebarService: SidebarService,
    private dragula: DragulaService
  ) {
    this.obsv = new Observable(observer => {
      this.observer = observer;
    });
  }

  // =========================
  // initialization functions
  // =========================

  initializeKanban(kanbanID: string) {
    console.log("initalizing...");
    let n;
    let _kanban;

    return this.loadKanbanModule(kanbanID).then( (kanban) => {
      _kanban = kanban;
      return this.loadKanbanCards(_kanban).then( (cardsArray) => {
        _kanban.cards = [];
        return Promise.all(cardsArray.map( (card) => {
          return this.loadKanbanCardItems(card).then( (cardItems) => {
            card.items = cardItems;
            _kanban.cards.push(card);
          });
        })).then( () => {
          return _kanban;
        });
      });
    });
  }

  loadKanbanModule(id: string) {
    return this.dbService.getEntryByID(id).then( (kanban) => {
      return kanban;
    });
  }

  loadKanbanCards(kanban: Kanban) {
    return Promise.all(kanban.cards.map( (card) => {
      return this.dbService.getEntryByID(card);
    })).then( (cardsArray) => {
      return cardsArray;
    });
  }

  loadKanbanCardItems(card: KanbanCard) {
    return Promise.all(card.items.map( (item) => {
      return this.dbService.getEntryByID(item);
    })).then( (itemsArray) => {
      return itemsArray;
    });
  }

  // Observable to delete items
  removeItemFromArray(itemID, cardID) {
    this.observer.next({type: "removeItem", item: itemID, card: cardID});
  }

  removeCardFromArray(cardID) {
    this.observer.next({type: "removeCard", card: cardID});
  }

  // =========================
  // creation functions
  // =========================

  createNewCard(kanbanID: string, card: KanbanCard) {
    this.dbService.addKanbanCard(kanbanID, card);
  }

  createNewItem(cardID: string, item: KanbanItem) {
    this.dbService.addKanbanCardItem(cardID, item);
  }

}
