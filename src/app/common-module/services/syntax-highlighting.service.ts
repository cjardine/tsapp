import {ElementRef, Injectable} from '@angular/core';
import hljs from 'highlightjs';

@Injectable({
  providedIn: 'root'
})
export class SyntaxHighlightingService {

  constructor() {}

  highlightBlock(element: HTMLElement): void {
    hljs.highlightBlock(element);
  }
}
