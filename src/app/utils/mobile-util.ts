import {Injectable} from '@angular/core';

@Injectable()
export class MobileUtil {

  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
}
