import {AfterViewChecked, AfterViewInit, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appShowSubmitButton]'
})
export class ShowSubmitButtonDirective implements AfterViewChecked {

  constructor(private renderer: Renderer2,
              private elRef: ElementRef) {}

  // ngAfterViewInit(): void {
  //   if (history.state.isOnEdit || history.state.isOnAddNewWorkDocument) {
  //     this.renderer.setStyle(this.elRef.nativeElement, 'display', 'block');
  //   } else {
  //     this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
  //   }
  // }

  ngAfterViewChecked(): void {
    if (history.state.isOnEdit || history.state.isOnAddNewWorkDocument || history.state.isOnAddNewDeliveryDocument) {
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
    }
  }

}
