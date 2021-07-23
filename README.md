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
