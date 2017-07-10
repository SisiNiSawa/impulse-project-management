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
    this.markdownStyling();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  saveMarkdown() {
    this.dbService.updateItem(this.markdown).then( () => {
      // update the revision for future edits
      this.dbService.getEntryByID(this.markdown._id).then( (markdown) => {
        this.markdown = markdown;
      });
    });
    this.toggleEditMode();
  }

  markdownStyling() {
    // add target _blank to all links so they open in the user's default browser
    this._markdown.renderer.link = (href: string, title: string, text: string) => {
      return `<a href="${href}" target="_blank" title="${title}">${text}</a>`;
    }
    // allows images to be centered and links to open in user's default browser
    this._markdown.renderer.image = (href: string, title: string, text: string) => {
      return `
      <p class="md-img">
        <a href=${href} target="_blank">
          <img src=${href} alt=${title}>
        </a>
      </p>
      `
    }
  }

}
