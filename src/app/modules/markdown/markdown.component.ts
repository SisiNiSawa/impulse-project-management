import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../sidebar/sidebar.service';
import { DatabaseService } from '../../database.service';
import { Markdown } from '../../shared/markdown.model';

import { MarkdownService } from 'angular2-markdown';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.css']
})
export class MarkdownComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService,
    private _markdown: MarkdownService,
    private dbService: DatabaseService
  ) { }

  editMode: boolean = false;

  markdown: Markdown;

  ngOnInit() {
    // always get an up to date version of the markdown editor
    this.dbService.getEntryByID(this.sidebarService.selectedItem._id).then( (markdown) => {
      this.markdown = markdown;
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveMarkdown() {
    this.dbService.updateItem(this.markdown).then( () => {
      this.dbService.getEntryByID(this.markdown._id).then( (markdown) => {
        this.markdown = markdown;
      });
    });
    this.toggleEditMode();
  }

}
