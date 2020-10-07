import {AfterViewChecked, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appShowCurrentInput]'
})
export class ShowCurrentInputDirective implements AfterViewChecked {

  constructor(private renderer: Renderer2,
              private elRef: ElementRef) {}


  ngAfterViewChecked(): void {
    if (history.state.isOnEdit || history.state.shouldGetDataFromDb || history.state.isDocumentEntryOnEdit !== undefined) {
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
    }
  }

}
