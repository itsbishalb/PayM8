


## Commit Message
A standard git commit message typically appears as follows:

    <type>: <subject> 
### The “type” field must be chosen from the options listed below:

-   **build**  : Changes related to building the code _(e.g. adding npm dependencies or external libraries)._
-   **chore**: Changes that do not affect the external user _(e.g. updating the .gitignore file or .prettierrc file)._
-   **feat**: A new feature.
-   **fix:**  A bug fix.
-   **docs**: Documentation a related changes.
-   **refactor**: A code that neither fix bug nor adds a feature. (_eg: You can use this when there is semantic changes like renaming a variable/ function name)._
-   **perf**: A code that improves performance style: A code that is related to styling.
-   **test**: Adding new test or making changes to existing test

## Other Commit Rules

 1. Separate subject from body with a blank line
 2.  Limit the subject line to 50 characters
 3. Capitalize the subject line
      -   feat: Accelerate to 88 miles per hour // Good
        -   feat: accelerate to 88 miles per hour // Bad
4. Do not end the subject line with a period

	 -   feat: Accelerate to 88 miles per hour // Good
     -   feat: accelerate to 88 miles per hour. // Bad
5.  Wrap the body at 72 characters
6. Use the body to explain what and why vs. how (See Example Below)
```
commit eb0b56b19017ab5c16c745e6da39c53126924ed6
Author: Pieter Wuille <pieter.wuille@gmail.com>
Date:   Fri Aug 1 22:57:55 2014 +0200

   Simplify serialize.h's exception handling

   Remove the 'state' and 'exceptmask' from serialize.h's stream
   implementations, as well as related methods.

   As exceptmask always included 'failbit', and setstate was always
   called with bits = failbit, all it did was immediately raise an
   exception. Get rid of those variables, and replace the setstate
   with direct exception throwing (which also removes some dead
   code).

   As a result, good() is never reached after a failure (there are
   only 2 calls, one of which is in tests), and can just be replaced
   by !eof().

   fail(), clear(n) and exceptions() are just never called. Delete
   them.
```