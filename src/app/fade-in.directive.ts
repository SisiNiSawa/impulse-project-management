import { Directive, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[fade-in]'
})
export class FadeInDirective implements OnInit {

  constructor(private elRef: ElementRef) {
    this.elRef.nativeElement.style.opacity = 0;
    this.elRef.nativeElement.style.transition = "0.5s all";
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.elRef.nativeElement.style.opacity = 1.0;
    }, 10);
  }

  // does not work for now
  ngOnDestroy() {
    setTimeout( () => {
      this.elRef.nativeElement.style.opacity = 0;
    }, 10);
  }

}
