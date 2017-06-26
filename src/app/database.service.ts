import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as PouchDB from 'pouchdb';
import * as PouchFind from 'pouchdb-find';
PouchDB.plugin(PouchFind);

import { Project } from './shared/project.model';
import { Kanban } from './shared/kanban.model';
import { KanbanCard } from './shared/kanban-card.model';
import { KanbanItem } from './shared/kanban-item.model';
import { Markdown } from './shared/markdown.model';

@Injectable()
export class DatabaseService {

  private pouch;
  // public data: Observable<any>;

  // initialize the database and all neccesary functions
  constructor() {
    this.pouch = new PouchDB("projects");
  }


  // =========================================
  // generic database functions
  // =========================================

  createTypeIndex() {
    this.pouch.createIndex({
      index: {fields: ['type']}
    }).catch( (err) => {
      console.log(err);
    });
  }

  getEntriesOfType(typeOf: string) {
    return this.pouch.createIndex({
      index: {fields: ['type']}
    }).then( () => {
      return this.pouch.find({
        selector: {type: {$eq: typeOf}}
      });
    }).catch( (err) => {
      console.log(err);
    });
  }

  getEntryByID(entryID: string) {
    return this.pouch.get(entryID);
  }

  removeEntryByID(entryID: string) {
    return this.pouch.get(entryID).then( (doc) => {
      return this.pouch.remove(doc);
    });
  }

  // =========================================
  // database functions for adding new entries
  // =========================================


  addNewProject(newProject: Project) {
    this.pouch.put(newProject);
  }

  addNewKanbanModule(projectID: string, newKanban: Kanban) {
    this.pouch.get(projectID).then( (project) => {
      project.modules.push(newKanban._id);

      return this.pouch.put(project);
    }).then( () => {
      return this.pouch.put(newKanban);
    }).then( () => {
      console.log("New project successfully created!");
      console.log(newKanban);
    }).catch( (err) => {
      console.log(err);
    });
  }

  addNewMarkdownModule(projectID: string, newMarkdown: Markdown) {
    this.pouch.get(projectID).then( (project) => {
      project.modules.push(newMarkdown._id);
      return this.pouch.put(project);
    }).then( () => {
      return this.pouch.put(newMarkdown);
    }).then( () => {
      console.log(newMarkdown);
    }).catch ( (err) => {
      console.log(err);
    })
  }

  addKanbanCard(kanbanID: string, card: KanbanCard) {
    this.pouch.get(kanbanID).then( (kanban) => {
      kanban.cards.push(card._id);

      return this.pouch.put(kanban);
    }).then( () => {
      return this.pouch.put(card);
    }).then( () => {
      console.log(card);
    }).catch( (err) => {
      console.log(err);
    });
  }

  addKanbanCardItem(cardID: string, item: KanbanItem) {
    this.pouch.get(cardID).then( (card) => {
      card.items.push(item._id);

      return this.pouch.put(card);
    }).then( () => {
      return this.pouch.put(item);
    }).then( () => {
      console.log(item);
    }).catch( (err) => {
      console.log(err);
    });
  }

    // useless code? keeping for reference before release
    addNewModule(projectID: string, name: string, type: string) {
      let id = String(Date.now());

      let newModule = {
        _id: <string> id,
        name: <string> name,
        type: <string> type
      }

      this.pouch.get(projectID).then( (project) => {
        if (!project.modules) {
          project.modules = [];
        }
        project.modules.push(id);
        console.log(project);

        return this.pouch.put(project);

      }).then( () => {
        console.log("Hello!");
      }).catch( (err) => {
        console.log(err);
      });

    }

  // =========================================
  // database functions for updating entries
  // =========================================

  updateKanbanCard(updatedCard: KanbanCard) {
    this.pouch.put(updatedCard).catch( (err) => {
      console.log(err);
    });
  }

  updateKanbanItem(updatedItem: KanbanItem) {
    this.pouch.put(updatedItem).then( () => {
      // console.log(updatedItem);
    }).catch( (err) => {
      console.log(err);
    });
  }

  // =========================================
  // kanban specific functions
  // =========================================

  kanbanRemoveItemFromCard(cardID: string, itemID: string) {
    return this.getEntryByID(cardID).then( (card: KanbanCard) => {
      for (let i = 0; i < card.items.length; i++) {
        if (card.items[i] === itemID) {
          card.items.splice(i, 1);
          return this.updateKanbanCard(card);
        }
      }
    });
  }

  kanbanAddItemToCardByIndex(cardID: string, itemID: string, index: number) {
    return this.getEntryByID(cardID).then( (card: KanbanCard) => {
      card.items.splice(index, 0, itemID);
      return this.updateKanbanCard(card);
    });
  }

  kanbanPushItemToCard(cardID: string, itemID: string) {
    return this.getEntryByID(cardID).then( (card: KanbanCard) => {
      card.items.push(itemID);
      this.updateKanbanCard(card);
    });
  }

  kanbanSpliceItemToCardBySibling(cardID: string, itemID: string, siblingID: string) {
    return this.getEntryByID(cardID).then( (card: KanbanCard) => {
      let siblingIndex;
      for (let i = 0; i < card.items.length; i++) {
        if (card.items[i] === siblingID) {
          siblingIndex = i;
          break;
        }
      }
      if (!siblingIndex) {
        return;
      } else {
        card.items.splice(siblingIndex, 0, itemID);
        this.updateKanbanCard(card);
      }
    });
  }

  kanbanMoveItemInCard(cardID: string, itemID: string, siblingID: string) {
    return this.getEntryByID(cardID).then( (card: KanbanCard) => {
      let siblingIndex;
      for (let i = 0; i < card.items.length; i++) {
        // remove item from array
        if (card.items[i] === itemID) {
          card.items.splice(i, 1);
        }
        // find sibling index
        if (card.items[i] === siblingID) {
          siblingIndex = i;
        }
      }
      card.items.splice(siblingIndex, 0, itemID);
      return this.updateKanbanCard(card);
    });
  }

  kanbanRemoveCard(cardID: string, kanbanID: string) {
    let n;
    this.getEntryByID(cardID).then( (card: KanbanCard) => {
      for (let i = 0; i < card.items.length; i++) {
        this.removeEntryByID(card.items[i]);
      }
    }).then( () => {
      this.getEntryByID(kanbanID).then( (kanban) => {
        for (let i = 0; i < kanban.cards.length; i++) {
          n = i;
          if (kanban.cards[n] === cardID) {
            kanban.cards.splice(n, 1);
            this.pouch.put(kanban);
          }
        }
      })
    });
  }
}
