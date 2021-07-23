<p align="center"><a href="https://avatars.githubusercontent.com/u/87829930?s=200&v=4" target="_blank" rel="noopener noreferrer"><img width="100" src="https://avatars.githubusercontent.com/u/87829930?s=200&v=4" alt="Vue logo"></a></p>

<p align="center">
  <img src="https://img.shields.io/david/WedgeScript/WedgeScript" />
  <img src="https://img.shields.io/bitbucket/issues/WedgeScript/WedgeScript" />
  
  <img src="https://img.shields.io/npm/v/wedgescript" />
  
  <img src="https://img.shields.io/npms-io/quality-score/wedgescript" />
  <img src="https://img.shields.io/npm/dt/wedgescript" />
  <img src="https://img.shields.io/tokei/lines/github/wedgescript/wedgescript" />
</p>


# WedgeScript

<br /><br />

### What is WedgeScript
WedgeScript is a simple interpreted stack based golfing language. This means that its designed to be used for code golfing, which is a programming game where you solve a problem using as little characters as you possibly can. Because WedgeScript is designed especially for this, it is hard to read yet produces very short code.

<br /><hr /><br />

### How to install
WedgeScript is hosted on NPM and thuss can be installed very easily:
```
npm i wedgescript -g
```

once its installed you can use the `wsi` interpreter to run webscript code (wsi stands for WedgeScriptInterpreter).


<br /><hr /><br />

### How to run code directly
The WedgeScript interpeter is able to read code directly from the command line instead of reading it out of a file, this might be handy for when you want to quickly try out something and dont want to make a file specially for this.

To do this, you can simply use the -e option
```
wsi -e "'Hello World!' o"
```

This will then output the string 'Hello World!'.

<br /><hr /><br />

### How to run code from a file
Normally you want to run code from a file however, this is done using the -i command line option (which is default so you can leave it away).

```
wsi -i somefile.wsc
```

or

```
wsi somefile.wsc
```

<br /><hr /><br />
### How watch a file for updates
(WARNING: this feature is still experimental and breaks if your program contains infinite loops)
If you are lazy and dont want to keep running the wsi command to restart the interpreter, you could use the -w option to watch the file for updates, and execute it every time you save it.

```
wsi -w somefile.wsc
```

<br /><hr /><br />

### language guide
As mentioned before, WedgeScript is a stack based language, this means that while the interpreter is running, it has a first in first out datastructure under the hood, to which you can push and pop values like an array.

As an example, you can push numbers by simply writing the number down `69 420` will first push 69 and then 420 to the stack, meaning the total length of the stack will be 2 elements. You can also use the - sign to indicate negative numbers and . to indicate fractions. Another literal you can push to the stack is strings, which are notated using ''.

Then there are a whole bunch of commands that are single ascii characters that represent actions that can be done to the stack, for example: the `+` character can be used to pop 2 values from the stack, add them together and then push the result back onto the stack. Another example is `d` which is used to duplicate the top value of the stack, Or `o` which is used to output the top value to the stack.

WedgeScript also has constructs like if, for and while, these are notated with (), {}, and [] respectively.

Lets take a look at for loops, consider the code `5 4{o}` this will first push 5, and then push 4, then we encounter a for loop, a for loop will pop the top value from the stack (which in this case is 4) and thats how many times it will loop. therefore the code `1 100 {1 +o}` will loop 100 times and increment the 1 every time and print it, therefore printing the numbers 1 to 100.

While statements are roughly the same but will instead pop a value every itteration and continue looping as long as that value is not 0, consider the code: `100 [od1 -]` this will push the number 100, then print it, subtract one from it, and repeat that until its 0.

If statements are one again the same idea, instead it will pop only once and not repeat, if the value popped is 0, it will skip the code in (), else it will just execute it. Consider the following code `4 (7 +)o` this will push the number 4, if that is not 0, it will push 7 and add that creating 4 + 7 = 11, and then print that.


<br /><hr /><br />

### command table
| command  | description  |
|---|---|
| p | pops the top value from the stack and discards it  |
| d | pops the top value from the stack, and pushes it back twice, duplicating it |
| c | combines the top 2 values by removing the from the stack and pushing them back as an array containing both of them |
| C | first pops a value from the stack representing the count, then pop 'count' more values and combine them together in an array |
| o | outputs the top value of the stack, no matter if its a string, an array, a number or whatever |
| t | type convert, converts a type to another, for example it converts a number to a string (decoding it by ascii), turns an array of strings to a single string, an array of numbers into a string, etc |
| : | concats the top 2 values on the stack, works with arrays and also with strings |
| + | pops 2 values from the stack, adds them, pushes the result back |
| - |  pops 2 values from the stack, subtracts them, pushes the result back |
| * |  pops 2 values from the stack, multiplies them, pushes the result back |
| / | pops 2 values from the stack, divides them, pushes the result back |
