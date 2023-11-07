# Frontend Coding Conventions!

## Table of Contents

  1. [General](#general)
  2. [Naming Conventions](#namingconventions)
  3. [Variables](#variables)
  4. [Conditionals](#conditionals)
  5. [Functions](#functions)
  6. [Comments](#comments)
  
  
## General
### Requires At Top

Always put requires at top of file to clearly illustrate a file's dependencies. Besides giving an overview for others at a quick glance of dependencies and possible memory impact, it allows one to determine if they need a package.json file should they choose to use the file elsewhere.

*Right:*

```js
const express = require('express');
const router = express.Router();
```

*Wrong:*

```js

const router = express.Router();
router.get('/', (req, res) => {
  res.send('Hello World!');
});


const express = require('express');
```

### Use const and let instead of var

Use `const` for all constant values. Use `let` for all variables that are reassigned later.

*Right:*

```js
const a = 1;
let b = 2;
```

*Wrong:*

```js

```


### Use single quotes for strings

Use single quotes for strings, unless you are writing JSON.

*Right:*

```js
let name = 'Capt. Janeway';
```

*Wrong:*

```js
let name = "Capt. Janeway";
```

### Use semicolons

Use semicolons at the end of each statement.

*Right:*

```js

let name = 'Janeway';
```

*Wrong:*

```js
let name = 'Janeway'
```

### Newlines

Use UNIX-style newlines (`\n`), and a newline character as the last character
of a file. Windows-style newlines (`\r\n`) are forbidden inside any repository.

### 80 characters per line

Limit your lines to 80 characters. 

### Opening braces go on the same line

Your opening braces go on the same line as the statement.

*Right:*

```js
if (true) {
  console.log('winning');
}
```

*Wrong:*

```js
if (true)
{
  console.log('losing');
}
```


## Naming Conventions
### Use lowerCamelCase for variables, properties and function names

Variables, properties and function names should use `lowerCamelCase`.  They
should also be descriptive. Single character variables and uncommon
abbreviations should generally be avoided.

*Right:*

```js
let adminUser = db.query('SELECT * FROM users ...');
```

*Wrong:*

```js
let admin_user = db.query('SELECT * FROM users ...');
```
### Use UpperCamelCase for class names

Class names should be capitalized using `UpperCamelCase`.

*Right:*

```js
class BankAccount() {
}
```

*Wrong:*

```js
class bank_Account() {
}
```

### Use UPPERCASE for Constants

Constants should be declared as regular variables or static class properties,
using all uppercase letters.

*Right:*

```js
let SECOND = 1 * 1000;

function File() {
}
File.FULL_PERMISSIONS = 0777;
```

*Wrong:*

```js
const SECOND = 1 * 1000;

function File() {
}
File.fullPermissions = 0777;
```

[const]: https://developer.mozilla.org/en/JavaScript/Reference/Statements/const

## Variables

### Only one variable per line

Declare one variable per line, it makes it easier to read and maintain.

*Right:*

```js
let keys   = ['foo', 'bar'];
let values = [23, 42];
let object = {};
```

*Wrong:*

```js

let keys = ['foo', 'bar'],
    values = [23, 42],
    object = {};

let var1, var2, var3 = 1;
```


### Object / Array creation

Use trailing commas and put *short* declarations on a single line. Only quote
keys when your interpreter complains:

*Right:*

```js
let a = ['hello', 'world'];
let b = {
  good: 'code',
  'is generally': 'pretty',
};
```

*Wrong:*

```js
let a = [
  'hello', 'world'
];
let b = {"good": 'code'
        , is generally: 'pretty'
        };
```

## Conditionals

### Use the === operator

Programming is not about remembering [stupid rules][comparisonoperators]. Use
the triple equality operator as it will work just as expected.

*Right:*

```js
let a = 0;
if (a !== '') {
  console.log('winning');
}

```

*Wrong:*

```js
let a = 0;
if (a == '') {
  console.log('losing');
}
```

[comparisonoperators]: https://developer.mozilla.org/en/JavaScript/Reference/Operators/Comparison_Operators

### Use multi-line ternary operator

The ternary operator should not be used on a single line. Split it up into multiple lines instead.

*Right:*

```js
let foo = (a === b)
  ? 1
  : 2;
```

*Wrong:*

```js
let foo = (a === b) ? 1 : 2;
```

### Use descriptive conditions

Any non-trivial conditions should be assigned to a descriptively named variable or function:

*Right:*

```js
let isValidPassword = password.length >= 4 && /^(?=.*\d).{4,}$/.test(password);

if (isValidPassword) {
  console.log('winning');
}
```

*Wrong:*

```js
if (password.length >= 4 && /^(?=.*\d).{4,}$/.test(password)) {
  console.log('losing');
}
```

## Functions



### Write small functions

Keep your functions short. A good function fits on a slide that the people in
the last row of a big room can comfortably read. So don't count on them having
perfect vision and limit yourself to ~15 lines of code per function.

### Return early from functions

To avoid deep nesting of if-statements, always return a function's value as early
as possible.

*Right:*

```js
function isPercentage(val) {
  if (val < 0) {
    return false;
  }

  if (val > 100) {
    return false;
  }

  return true;
}
```

*Wrong:*

```js
function isPercentage(val) {
  if (val >= 0) {
    if (val < 100) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}
```

Or for this particular example it may also be fine to shorten things even
further:

```js
function isPercentage(val) {
  let isInRange = (val >= 0 && val <= 100);
  return isInRange;
}
```


## Comments

### Use slashes for comments

Use slashes for both single line and multi line comments. Try to write
comments that explain higher level mechanisms or clarify difficult
segments of your code. Don't use comments to restate trivial things.

*Right:*

```js
// 'ID_SOMETHING=VALUE' -> ['ID_SOMETHING=VALUE', 'SOMETHING', 'VALUE']
let matches = item.match(/ID_([^\n]+)=([^\n]+)/));

// This function has a nasty side effect where a failure to increment a
// redis counter used for statistics will cause an exception. This needs
// to be fixed in a later iteration.
function loadUser(id, cb) {
  // ...
}

let isSessionValid = (session.expires < Date.now());
if (isSessionValid) {
  // ...
}
```

*Wrong:*

```js
// Execute a regex
let matches = item.match(/ID_([^\n]+)=([^\n]+)/);

// Usage: loadUser(5, function() { ... })
function loadUser(id, cb) {
  // ...
}

// Check if the session is valid
let isSessionValid = (session.expires < Date.now());
// If the session is valid
if (isSessionValid) {
  // ...
}
```