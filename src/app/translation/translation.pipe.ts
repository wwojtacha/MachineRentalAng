import {Pipe, PipeTransform} from '@angular/core';
import {TranslationService} from './translation.service';

@Pipe({
  name: 'translate',
  pure: true
})
export class TranslationPipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(value: any, args?: any): any {
    return this.translationService.translate(value);
  }
}
