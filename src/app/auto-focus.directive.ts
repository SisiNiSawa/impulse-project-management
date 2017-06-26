import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[auto-focus]'
})
export class AutoFocusDirective implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    this.elementRef.nativeElement.focus();
  }
}
