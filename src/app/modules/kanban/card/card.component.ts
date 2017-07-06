import { Component, OnInit, Input } from '@angular/core';

import { KanbanService } from '../kanban.service';
import { DatabaseService } from '../../../database.service';
import { PopupService } from '../../../popup.service';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import { KanbanCard } from '../../../shared/kanban-card.model';
import { KanbanItem } from '../../../shared/kanban-item.model';

@Component({
  selector: 'app-kanban-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class KanbanCardComponent implements OnInit {

  editMode: boolean = false;

  @Input() card: KanbanCard;
  @Input() kanbanID: string;


  constructor(
      private kanbanService: KanbanService,
      private dbService: DatabaseService,
      private popupService: PopupService
  ) { }

  ngOnInit() {}

  createNewItem() {
    let newItem = new KanbanItem;
    newItem._id = String(Date.now());
    newItem.shortDescription = "New Item";
    this.kanbanService.createNewItem(this.card._id, newItem).then( () => {
      this.popupService.viewKanbanItemInfo(newItem, newItem._id);
    });
    this.card.items.push(newItem);
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  onPressEnter(name: string) {
    this.toggleEditMode();
    this.updateKanbanCard(name);
  }

  updateKanbanCard(newName: string) {
    this.card.name = newName;
    this.dbService.getEntryByID(this.card._id).then( (card) => {
      card.name = newName;
      this.dbService.updateKanbanCard(card);
    });
  }

  deleteCard() {
    this.dbService.kanbanRemoveCard(this.card._id, this.kanbanID);
    this.kanbanService.removeCardFromArray(this.card._id);
  }

}
