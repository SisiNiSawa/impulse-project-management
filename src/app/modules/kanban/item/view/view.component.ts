import { Component, OnInit } from '@angular/core';

import { DatabaseService } from '../../../../database.service';
import { PopupService } from '../../../../popup.service';
import { KanbanService } from '../../kanban.service';
import { MarkdownService } from 'angular2-markdown';

import { KanbanItem } from '../../../../shared/kanban-item.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class KanbanItemViewComponent implements OnInit {

  item: KanbanItem;
  viewItem: KanbanItem;
  cardID: string;
  showDropdown: boolean = false;
  editMode: boolean = false;

  itemColors: string[] = [
    "#B15C5C",
    "#4A8D4A",
    "#455078",
    "#B1975C",
    "#544579",
    "#904B6F",
    "#ACB05C",
  ];

  constructor(
      private popupService: PopupService,
      private dbService: DatabaseService,
      private kanbanService: KanbanService,
      private _markdown: MarkdownService
  ) { }

  ngOnInit() {
    this.dbService.getEntryByID(this.item._id).then( (returnedItem) => {
      this.viewItem = returnedItem;
    });
    // add target _blank to all links so they open in the user's default browser
    this._markdown.renderer.link = (href: string, title: string, text: string) => {
      return `<a href="${href}" target="_blank" title="${title}">${text}</a>`;
    }
  }

  clearPopups() {
    this.popupService.clearPopups();
  }

  updateItem() {
    this.dbService.updateKanbanItem(this.viewItem);
    // this shit is ghetto but it works
    this.item.description = this.viewItem.description;
    this.item.shortDescription = this.viewItem.shortDescription;
    this.item.color = this.viewItem.color;
    // update the reference so we get the new revision id
    this.updateItemReference().then( () => {
      this.toggleEditMode()
    });
  }

  updateItemReference() {
    return this.dbService.getEntryByID(this.viewItem._id).then( (item) => {
      this.viewItem = item;
    });
  }

  removeItem() {
    this.dbService.removeEntryByID(this.viewItem._id);
    this.dbService.kanbanRemoveItemFromCard(this.cardID, this.viewItem._id);
    this.kanbanService.removeItemFromArray(this.item._id, this.cardID);
    this.clearPopups();
  }

  updateColor(color: string) {
    if (color) {
      this.viewItem.color = color;
    } else {
      this.viewItem.color = undefined;
    }
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

}
