const executor = require('./commands.js');
const util = require('util');
const stack = [];

const gatherSubSection = (startChar, code, index) => {
	const endChar = startChar == '(' ? ')'
		: startChar == '{' ? '}'
		: ']';

	let accumulator = '';
	const level = 0;
	while (code[++index] != endChar && level == 0) {
		accumulator += code[index];
	}

	return {
		newIndex: index,
		newToken: {
			value: startChar == '(' ? 'IF'
				: startChar == '{' ? 'FOR'
				: 'WHILE',
			code: tokeniser(accumulator),
			type: 'command'
		}
	};
};

// ===== Language exectution ===== \\
const tokeniser = (code) => {
	const tokens = [];
	let parsingNumber = false;
	let parsingString = false;
	let accumulator = '';
	for(let i = 0; i < code.length; i++) {
		const c = code[i];

		if (parsingString || c == '"') {
			if (c == "'" && parsingString) {
				tokens.push({value: accumulator, type: 'string' })
				parsingString = false;
				accumulator = '';
				continue;
			} else {
				if (parsingString)
					accumulator += c;
				parsingString = true;
				continue;
			}
		}

		else if (parsingNumber || c.match(/[-0-9]/g)) {
			if (c.match(/[\.0-9]/g) == null && parsingNumber) {
				tokens.push({value: accumulator, type: 'number' })
				parsingNumber = false;
				accumulator = '';
			} else {
				accumulator += c;
				parsingNumber = true;
				continue;
			}
		}

		else if (['(', '{', '['].includes(c)) {
			const gathering = gatherSubSection(c, code, i)
			i = gathering.newIndex;
			tokens.push(gathering.newToken)
		}

		else if (c === '\'') {
			tokens.push({value: code[++i], type: 'character' });
		} else if (c === '|') {
			tokens.push({value: 'INFINITE', code: tokeniser(code.substring(i + 1)), type: 'command'})
		} else {
			tokens.push({value: c, type: 'command' });
		}
	}

	if (accumulator != '')
		tokens.push({value: accumulator, type: 'number' })

	return tokens;
};

const wedgeScriptInterpreter = (code) => {
	const tokens = tokeniser(code);

	console.log(util.inspect(tokens, {showHidden: false, depth: null}))

	executor(tokens);
};

module.exports = wedgeScriptInterpreter;