import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  private _window: Window = ((win) => {
    return win;
  })(window);

  get window(): Window {
    return this._window;
  }

  constructor() {
  }
}
