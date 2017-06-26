import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../database.service';
import { KanbanService } from './kanban.service';
import { SidebarService } from '../../sidebar/sidebar.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { Kanban } from '../../shared/kanban.model';
import { KanbanCard } from '../../shared/kanban-card.model';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css'],
  providers: []
})
export class KanbanComponent implements OnInit {

  kanban: Kanban;

  constructor(
    private kanbanService: KanbanService,
    private dbService: DatabaseService,
    private sidebarService: SidebarService,
    private dragula: DragulaService) {
      let kanbanID = this.sidebarService.selectedItem;
      this.kanbanService.initializeKanban(kanbanID._id).then( (_kanban) => {
        this.kanban = _kanban;
        // console.log(_kanban);
      });
    }

  ngOnInit() {
    this.initDragulaEvents();
    this.initObserver();
  }

  createNewCard() {
    let newCard = new KanbanCard;
    newCard.name = "New Card";
    newCard._id = String(Date.now());
    newCard.order = this.kanban.cards.length + 1;
    this.kanbanService.createNewCard(this.kanban._id, newCard);
    console.log("New card added!");
    this.kanban.cards.push(newCard);
  }

  initDragulaEvents() {
    // dragula drop event returns an array with the following data:
    // [1] element moved
    // [2] new element container
    // [3] original element container
    // [4] sibling of element in new container
    this.dragula.drop.subscribe( (event) => {
      console.log(event);
      if (event[2] === event[3]) {
        // item moved inside of the same container
        this.moveItemInsideCard(event);
      } else if (event[2] !== event[3]) {
        // item moved to a new container
        this.moveItemToCard(event);
      } else {
        console.log("don't know what happened");
      }
    });
  }


    initObserver() {
      this.kanbanService.obsv.subscribe( (event) => {
        if (event.type === "removeItem") {
          this.removeItem(event.item, event.card);
        } else if (event.type === "removeCard") {
          this.removeCard(event.card);
        }
      });
    }

    removeItem(itemID, cardID) {
      let card: KanbanCard;
      let cardIndex: number = -1;
      let itemIndex: number = -1;
      for (let i = 0; i < this.kanban.cards.length; i++) {
        if (this.kanban.cards[i]._id === cardID) {
          card = this.kanban.cards[i];
          cardIndex = i;
          break;
        }
      }
      if (!card) {
        console.log("card not found?");
        return;
      }
      for (let i = 0; i < card.items.length; i++) {
        if (card.items[i]._id === itemID) {
          itemIndex = i;
          break;
        }
      }
      if (itemIndex !== -1) {
        this.kanban.cards[cardIndex].items.splice(itemIndex, 1);
        console.log("removed item from array");
      } else {
        console.log("could not find item index");
      }
    }

    removeCard(cardID: string) {
      for (let i = 0; i < this.kanban.cards.length; i++) {
        if (this.kanban.cards[i]._id === cardID) {
          this.kanban.cards.splice(i, 1);
        }
      }
    }

  moveItemToCard(event) {
    this.dbService.kanbanRemoveItemFromCard(event[3].id, event[1].id).then( () => {
      let index;
      if (event[4]) {
        this.dbService.kanbanSpliceItemToCardBySibling(event[2].id, event[1].id, event[4].id);
      } else {
        this.dbService.kanbanPushItemToCard(event[2].id, event[1].id);
      }
    });
  }

  moveItemInsideCard(event) {
    if (event[4]) {
      this.dbService.kanbanMoveItemInCard(event[2].id, event[1].id, event[4].id);
    } else {
      this.dbService.kanbanMoveItemInCard(event[2].id, event[1].id, undefined);
    }
  }

}
