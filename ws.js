// https://codegolf.stackexchange.com/questions/229052/ihateoddnumbers
// ne1\
//
// n
//  e   
//   1  pushes the number 1 to the stack 
//    \ reverse divide, does {top of stack} / {top - 1 of stack}
const commandLineArgs = require('command-line-args');
const fs = require('fs');
const interpreter = require('./interpreter.js');
const commandLineUsage = require('command-line-usage');
const package = require("./package.json");
const chalk = require('chalk');
const util = require('util');

const r = chalk.red;
const b = chalk.blue;

const CLI_TITLE = r('Wedge') + b('Script');
const CLI_DESCRIPTION = 'The WedgeScript golfing language interpreter';
const CLI_USAGE = 'Usage: \`ws file.wsc [options ...]\`';

const HELP_HEADER = ` ${r('_     _')}
${r('| | _ | |')+ b('  _______')} 
${r('| || || |')+ b(' |  _____|')}        ${chalk.bold.underline(CLI_TITLE)}
${r('| || || |')+ b(' | |_____ ')}                
${r('| || || |')+ b(' |_____  |')}        ${CLI_DESCRIPTION}
${r('|   _   |')+ b('  _____| |')}
${r('|__| |__|')+ b(' |_______|')}        ${CLI_USAGE}
`;

const sections = [
  {
    content: HELP_HEADER,
		raw: true,
  },
  {
    header: 'Options',
    optionList: [
      {
        name: 'input',
        alias: 'i',
        typeLabel: '{underline file}',
        description: 'The .wsc file to run'
      },
      {
        name: 'watch',
        alias: 'w',
        typeLabel: '{underline file}',
        description: 'Watches a .wsc file'
      },
      {
        name: 'help',
        alias: 'h',
        type: Boolean,
        description: 'Print this usage guide.'
      },
      {
        name: 'parse',
        alias: 'p',
        type: Boolean,
        description: 'show the parse result'
      },
      {
        name: 'time',
        alias: 't',
        type: Boolean,
        description: 'show how long exection took'
      },
      {
        name: 'version',
        alias: 'v',
        type: Boolean,
        description: 'displays your WS version'
      },
      {
        name: 'execute',
        alias: 'e',
        type: String,
        description: 'executes a string directly'
      }
    ]
  }
];

const usage = commandLineUsage(sections)

const optionDefinitions = [
  { name: 'input', alias: 'i', type: String, defaultOption: true },
  { name: 'watch', alias: 'w', type: String },//
  { name: 'help', alias: 'h', type: Boolean },
  { name: 'version', alias: 'v', type: Boolean },
  { name: 'execute', alias: 'e', type: String }
]

const options = commandLineArgs(optionDefinitions)

if (options.help === true) {
	console.log(usage)
} else if (options.version === true) {
	console.log(`WedgeScript v${package.version}\n`)
} else if (options.execute != null) {
	interpreter(options.execute)
} else if (options.watch != null) {
	interpreter(fs.readFileSync(options.watch).toString());

	fs.watchFile(options.watch, {
		interval: 500
	}, () => {
		console.log(`\n[detected changes, updating...]\n`)
		interpreter(fs.readFileSync(options.watch).toString());
	});
} else if (options.input != null) {
	interpreter(fs.readFileSync(options.input).toString())
} else {
	console.log(usage)
}
