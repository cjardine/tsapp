let foo;
foo = 'bar'; // ok
foo = 2; // ok -- ?
foo = true; // ok -- ??`,

// -------------------------------------------------------------------------

const foo2 = (bar) => {
    return 2 + bar;
}


foo2(2) // ok => 4
foo2('bif') // ok => '2bif'; but anything expecting a number will be greatly disappointed

// -------------------------------------------------------------------------


const obj = {fName: 'Joe', lName: 'Momma'};

obj.firstName2 = 'daBest'; // ok
obj.fName = 2; // ok
