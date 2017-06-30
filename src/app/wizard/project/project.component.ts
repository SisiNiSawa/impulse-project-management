import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-wizard-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class WizardProjectComponent implements OnInit {

  @Output() project: EventEmitter<any> = new EventEmitter();
  @Output() next: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  nextStep() {
    this.next.emit();
  }

  createProject() {

  }

}
