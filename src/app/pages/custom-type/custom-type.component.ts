import {Component, OnInit} from '@angular/core';
import {Language} from '../../common-module/components/code-block/code-block.component';

interface ICustomTypingSR {
  ENUM: string;
  INTERFACE: string;
}

const StringResources: ICustomTypingSR = {
  ENUM: `
export enum Language {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
}

let myLanguage: Language = Language.TYPESCRIPT; // ok; \`myLanguage === 'typescript\`;'
let myLanguage2: Language = Language; // NOT ok'
let myLanguage3: Language = Language.KOTLIN; // NOT ok'
let myLanguage3: Language = 'TYPESCRIPT'; // NOT ok'
 `,
  INTERFACE: `
/**
 * @type Omit
 */
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

/**
 * @enum Species
 * @desc IFurBaby is an animal, this enum provides a list of possible animal values
 */
enum Species {
  DOG = 'dog',
  CAT = 'cat',
  LLAMA = 'llama',
}

/**
 * @interface IPerson
 */
export interface IPerson {
  fName: string;
  lName: string;
  age: number;
  children: (IPerson | IFurBaby)[];
}

/**
 * @interface IFurBaby
 */
export interface IFurBaby extends Omit<IPerson, 'children'> {
  fName: string;
  lName: string;
  age: number;
  species: Species;
}

// ok; Joe is a person with children
const joe: IPerson = {
  fName: 'Joe',
  lName: 'Johnson',
  age: 30,
  children: [],
};

// NOT ok; Jill is a person, but is missing the required age property
const jill: IPerson = {fName: 'Jill', lName: 'Johnson'};

// NOT ok; Jerry is missing a lot of properties
const jerry: IPerson = {};

// ok; Jolene is a properly defined furry person
const jolene: IFurBaby = {
  fName: 'Jolene',
  lName: 'Johnson',
  age: 2,
  species: Species.LLAMA,
};

// NOT ok; Joe Jr is a fur baby with too many properties
const joeJr: IFurBaby = {
  fName: 'Joe Jr.',
  lName: 'Johnson',
  age: 1,
  children: [],
  species: Species.LLAMA,
};

// ok BUT won't work as is as a child; Carl isn't exactly the shape of either a person or fur baby
const carl = {fName: 'Carl', lName: 'Johnson', age: 7};

joe.children.push(jill, jolene, joeJr, carl, jerry);
 `,
};

@Component({
  selector: 'app-custom-type',
  templateUrl: './custom-type.component.html',
  styleUrls: ['./custom-type.component.scss']
})
export class CustomTypeComponent implements OnInit {
  languages = Language;
  sr = StringResources;

  constructor() {
  }

  ngOnInit(): void {
  }

}
