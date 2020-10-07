import {AfterViewChecked, Directive, ElementRef, Renderer2} from '@angular/core';

@Directive({
  selector: '[appSaveEntriesButton]'
})
export class SaveEntriesButtonDirective implements AfterViewChecked {

  constructor(private renderer: Renderer2,
              private elRef: ElementRef) {}
  //
  // ngAfterViewInit(): void {
  //   if (history.state.isOnEdit || history.state.isOnAddNewWorkDocument) {
  //     this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
  //   } else {
  //     this.renderer.setStyle(this.elRef.nativeElement, 'display', 'block');
  //   }
  // }


  ngAfterViewChecked(): void {
    if (!history.state.isSaveEntriesButtonVisible) {
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'none');
    } else {
      this.renderer.setStyle(this.elRef.nativeElement, 'display', 'block');
    }
  }

}
