import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WizardProjectComponent } from './project/project.component';
import { WizardModuleComponent } from './module/module.component';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {

  @ViewChild(WizardProjectComponent, {read: ElementRef}) wizardProject: ElementRef;
  @ViewChild(WizardModuleComponent, {read: ElementRef}) wizardModule: ElementRef;

  constructor() {

  }

  ngOnInit() {
  }

  nextStep() {
    this.wizardProject.nativeElement.style.opacity = 0;
    this.wizardProject.nativeElement.style.marginLeft = "-1000px";
    this.wizardModule.nativeElement.style.display = "inline-block";
    setTimeout( () => {
      this.wizardModule.nativeElement.style.opacity = 1;
      this.wizardModule.nativeElement.style.marginLeft = 0;
    }, 50);

  }

}
