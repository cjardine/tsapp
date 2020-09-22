import {AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SyntaxHighlightingService} from '../../services/syntax-highlighting.service';

export enum Language {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
}


@Component({
  selector: 'app-code-block',
  templateUrl: './code-block.component.html',
  styleUrls: ['./code-block.component.scss']
})
export class CodeBlockComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() code: string;
  @Input() language: Language;

  escapedCode: string;
  $el: HTMLElement;

  constructor(
    private hlService: SyntaxHighlightingService,
    private elRef: ElementRef
  ) {
    this.$el = this.elRef.nativeElement;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.code !== undefined) {
      const text = document.createTextNode(changes.code.currentValue.trim());
      this.escapedCode = `// ${this.language}\r${text.wholeText}`;
    }
  }

  ngAfterViewInit(): void {
      this.hlService.highlightBlock(this.$el);
  }
}
