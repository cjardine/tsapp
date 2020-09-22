// =========================================================================
// STRING
// -------------------------------------------------------------------------
let foo: string;
foo = 'bar'; // ok
foo = 2; // NOT ok; IDE/editor will highlight the error, error thrown at compilation
foo = true; // NOT ok; IDE/editor will highlight the error, error thrown at compilation `,


// =========================================================================
// FUNCTION
// -------------------------------------------------------------------------
const foo2 = (bar: number): number => {
  return 2 + bar;
};

foo2(2); // ok => 4
foo2('bif'); // NOT ok => '2bif'; IDE/editor will highlight the error, error thrown at compilation


// =========================================================================
// OBJECT
// -------------------------------------------------------------------------
let obj: { fName: string, lName: string } = {fName: 'Joe', lName: 'Momma'}; // ok

obj.firstName2 = 'daBest'; // NOT ok; IDE/editor will highlight the error, error thrown at compilation
obj.fName = 2; // NOT ok; IDE/editor will highlight the error, error thrown at compilation

// alternately ...
obj = {firstName: 'Joe'}; // NOT ok; IDE/editor will highlight the error, error thrown at compilation


// =========================================================================
// ENUM
// -------------------------------------------------------------------------
export enum Language {
  JAVASCRIPT = 'javascript',
  TYPESCRIPT = 'typescript',
}

let myLanguage: Language;
myLanguage = Language.TYPESCRIPT; // ok; `myLanguage === 'typescript`;'
myLanguage = Language; // NOT ok'
myLanguage = Language.KOTLIN; // NOT ok; KOTLIN is not a valid value of the Language enum'
myLanguage = 'TYPESCRIPT'; // NOT ok; Can not assign type of string to type of Language'


// =========================================================================
// INTERFACE
// -------------------------------------------------------------------------
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

