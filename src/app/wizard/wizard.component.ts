import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WizardProjectComponent } from './project/project.component';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  @ViewChild(WizardProjectComponent, {read: ElementRef}) wizardProject: ElementRef;

  constructor() {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.wizardProject.nativeElement.style.opacity = 1.0
    }, 10);
  }

}
