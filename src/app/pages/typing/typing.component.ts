import {AfterContentChecked, AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {SyntaxHighlightingService} from '../../common-module/services/syntax-highlighting.service';
import {Language} from '../../common-module/components/code-block/code-block.component';

interface ITypingSR {
  VARIABLE_JS: string;
  VARIABLE_TS: string;
  FUNCTION_JS: string;
  FUNCTION_TS: string;
  OBJECT_JS: string;
  OBJECT_TS: string;
}

const StringResources: ITypingSR = {
  VARIABLE_JS: `
const foo;
foo = 'bar'; // ok
foo = 2; // ok -- ?
foo = true; // ok -- ??`,
  VARIABLE_TS: `
let foo: string;
foo = 'bar'; // ok
foo = 2; // NOT ok; IDE/editor will highlight the error, error thrown at compilation
foo = true; // NOT ok; IDE/editor will highlight the error, error thrown at compilation `,

  FUNCTION_JS: `
const foo2 = (bar) => {
    return 2 + bar;
}

foo2(2) // ok => 4
foo2('bif') // ok => '2bif'; but anything expecting a number will be greatly disappointed
foo2(2).toLowerCase() // NOT ok; BUT no warning until it hits a browser
`,
  FUNCTION_TS: `
const foo2 = (bar: number): number => {
    return 2 + bar;
}

foo2(2) // ok => 4
foo2('bif') // NOT ok => '2bif'; IDE/editor will highlight the error, error thrown at compilation
foo2(2).toLowerCase() // NOT ok; IDE/editor will highlight the error, error thrown at compilation
`,
  OBJECT_JS: `
const obj = {fName: 'Joe', lName: 'Momma'};

obj.firstName2 = 'daBest'; // ok
obj.fName = 2; // ok
`,
  OBJECT_TS: `
const obj: {fName: string, lName: string} = {fName: 'Joe', lName: 'Momma'}; // ok

obj.firstName2 = 'daBest'; // NOT ok; IDE/editor will highlight the error, error thrown at compilation
obj.fName = 2; // NOT ok; IDE/editor will highlight the error, error thrown at compilation

// alternately ...
const obj: {fName: string, lName: string} = {firstName: 'Joe'}; // NOT ok; IDE/editor will highlight the error, error thrown at compilation


`,
};


@Component({
  selector: 'app-typing',
  templateUrl: './typing.component.html',
  styleUrls: ['./typing.component.scss']
})
export class TypingComponent implements OnInit, AfterViewChecked {

  sr: ITypingSR = StringResources;
  languages = Language;


  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
  }

}
