# @getvim/execute
This is an extremely opinionated, zero dependencies, tiny module for executing command line programs from Node.js using a Bash shell.

The design philosophy behind this module aims to abstract away many of the Bash pitfalls most of us never knew existed.

## Requirements
You must be working in an environment where `/bin/bash` is available.

Minimal Node.js version is 8.0.0.

## Usage
### Installation
```shell script
npm install --save @getvim/execute
yarn add @getvim/execute
```
### Basic usage
```javascript
const { execute } = require('@getvim/execute');
execute('ls')
    .then(console.log); // result: "feature.js\nfeature.spec.js"
```
### Environment variables
```javascript
const { execute } = require('@getvim/execute');
execute('echo $MY_NAME', { env: { MY_NAME: 'Jake Chambers' } })
    .then(console.log); // result: "Jake Chambers"
```
### Piping
Piping allows you to interleave shell commands with modern JS features that are safer and easier to use than a lot of shell alternatives like using external modules, concurrency, loops or string formatters.
```javascript
const { execute, pipe } = require('@getvim/execute');
const mailer = require('@fictional/mail-client')
execute('ls | grep temp')
    .then(tempFiles => {
        mailer('admin@website.com', 'Temp files being deleted', tempFiles);
        return tempFiles;
    })
    .then(pipe('xargs rm'));
```
### Errors
```javascript
const { execute } = require('@getvim/execute');
execute('npm install')
    .then(() => execute('npm test')) // Has a failing test
    .then(() => execute('npm publish'))
    .catch(error => console.error('Failed CI/CD!', error));
    /* result:
        Failed CI/CD! 
        { 
            killed: false, 
            code: 1, 
            signal: null, 
            cmd: "set -euo pipefail\nnpm test" 
            stdout: "... test results ..."
            stderr: "... failing test ..."
        } 
    */
```

## Behavior
- execute's Promise will reject in the following cases:
  * Usage of an undefined environment variable
  * A command, in a pipe or otherwise, returned an exit code other than 0 (even `grep`ing without a result will do this)
- Results are always a string.
- Processes are not interactive and do not print to the screen. If a process is waiting for user input, (like a prompt for a Y/N confirmation) the Promise will never resolve/reject.

## Why?
Bash has a lot of pitfalls. As code organizations grow their reliance on CI/CD scripts or internal tooling for day-to-day work grow as well. Most organizations write those scripts in pure Bash. Most of the people reading/writing these scripts will find themselves victims of those counter intuitive Bash pitfalls. This module aims to take some very opinionated decisions that will guard its users from 80% of these common mistakes.

Every problem that this tool purports to solve can be solved using Bash only solutions, but it requires learning time most developers will not invest. Using this module you can use language features you're already familiar with instead of learning the archaic and unintuitive Bash solutions.

### Common Bash Pitfalls
#### Only the last error counts
**Problem:**
```shell script
npm install
npm test # this contains a failing test, the exit code here is nonzero
npm publish # Bash continues to run the script and npm publish will still happen
```
**Solution:**
Any command run with execute will be run with the [set -e](https://www.tldp.org/LDP/abs/html/options.html) flag and the script will immediately exit with a Promise rejection on any line that returns a non zero exit code.
#### Failure mid-pipe doesn't count
**Problem:**
```shell script
failingCommand | echo "a" # failingCommand does not throw an error because it's in a pipe
echo "b"
# result:
# a
# b
```
**Solution:**
Any command run with execute will be run with the [set -o pipefail](https://www.tldp.org/LDP/abs/html/options.html) flag and the script will immediately exit with a Promise rejection on any command in a pipe chain that returns a non zero exit code.
#### Using unset variables does not throw errors
**Problem:**
```shell script
rm -rf $BUILD_FOLDER/* # If $BUILD_FOLDER is unset by mistake, this line would delete the entire filesystem
```
**Solution:**
Any command run with execute will be run with the [set -u](https://www.tldp.org/LDP/abs/html/options.html) flag and the script will immediately exit with a Promise rejection on any usage of an unset environment variable.
#### Basic built-in language features like string manipulation are easy to get wrong
**Problem:**
```shell script
# Trying to extract the Nth word in a string
echo $STRING | awk -v N=$N '{print $N}' # You have to learn awk or other tools
```
**Solution:**
Usage of execute.pipe allows to easily jump between a Bash context and a JS context.
```javascript
const { execute, pipe } = require('@getvim/execute');
const N = 5;
execute('echo $STRING', { env: { STRING:'My name is Inigo Montoya'}})
    .then(result => result.split(' ')[N - 1])
    .then(pipe('rev'))
    .then(console.log); // Result: "ayotnoM"
```
#### Basic built-in language constructs like IF-ELSE / Conditionals are easy to get wrong
**Problem:**
It very easy to get Syntax error or unintended behavior from Bash's language constructs.
```shell script
# Checking if a variable is greater than 0
if [$VAR > 0]; then ... # Syntax error, forgot spaces

if [ $VAR > 0 ]; then ... # ">" Means stream redirection

if [[ $VAR > 0 ]]; then ... # ">" Means comparison, but of strings (lexicographs)

if [[ $VAR -gt 0 ]]; then ... # Finally works!

if (( $VAR > 0 )); then ... # Confusingly, this also works...
```
**Solution:**
Execute allows to easily jump between a Bash context and a JS context.
```javascript
const { execute, pipe } = require('@getvim/execute');
execute('wc -l file.txt')
    .then(lineCount => lineCount > 0 ? "Success" : "Failure")
    .then(pipe("tee SomeFile.txt"))
```