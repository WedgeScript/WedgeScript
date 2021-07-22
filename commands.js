const stack = [];

const pop = (stack) => {
	stack.pop();
};

const dupe = (stack) => {
	stack.push(stack[stack.length-1]);
};

const add = (stack) => {
	const a = stack.pop();
	const b = stack.pop();
	stack.push(a + b);
};

const subtract = (stack) => {
	const a = stack.pop();
	const b = stack.pop();
	stack.push(a - b);
};

const divide = (stack) => {
	const a = stack.pop();
	const b = stack.pop();
	stack.push(a / b);
};

const multiply = (stack) => {
	const a = stack.pop();
	const b = stack.pop();
	stack.push(a * b);
};

const combine = (stack) => {
	let a = stack.pop();
	let b = stack.pop();

	stack.push([a, b]);
};

const combine_multiple = (stack) => {
	const count = stack.pop();
	const values = [];

	for (let i = 0; i < count; i++)
		values.push(stack.pop())

	stack.push(values);
};

const concat = (stack) => {
	const a = stack.pop();
	const b = stack.pop();
	stack.push([...a, ...b]);
};

const output = (stack) => {
	console.log(stack[stack.length - 1])
}

const type_convert = (stack) => {
	const item = stack.pop()
	
	if (typeof item === 'string')
		stack.push(item.split``.map(x => x.charCodeAt(0)))
	else if (typeof item === 'number')
		stack.push(String.fromCharCode(item))
	else if (typeof item === 'object')
		stack.push(item
			.filter(x => typeof x === 'string' || typeof x === 'number')
			.map(x => typeof x === 'number'
				? String.fromCharCode(x)
				: x.charCodeAt(0)))
}

const _if = (stack, code) => {
	const val = stack.pop();

	if (val != 0)
		executor(code);
}

const _for = (stack, code) => {
	let amnt = stack.pop();

	for (let i = 0; i < amnt; i++) {
		executor(code);
	}
}

const _while = (stack, code) => {
	let val = stack.pop();

	while (val != 0) {
		executor(code);
		val = stack.pop();
	}
}

const executor = (tokens) => {
	tokens.forEach((token, i) => {
		if (token.type == 'number')
			stack.push(Number(token.value));
		else if (token.type == 'string'){ 
			stack.push(token.value);
		}
		else {
			switch (token.value) {
				case 'p':
					pop(stack);
					break;
				case 'd':
					dupe(stack);
					break;
				case 'c':
					combine(stack);
					break;
				case 'C':
					combine_multiple(stack);
					break;
				case 'o':
					output(stack);
					break;
				case 't':
					type_convert(stack);
					break;
				case ':':
					cmds.concat(stack);
					break;
				case '+':
					add(stack);
					break;
				case '-':
					subtract(stack);
					break;
				case '*':
					multiply(stack);
					break;
				case '/':
					cmds.divide(stack);
					break;
				case 'IF':
					_if(stack, token.code);
					break;
				case 'FOR':
					_for(stack, token.code);
					break;
				case 'WHILE':
					_while(stack, token.code);
					break;
			}
		}
	});
};

module.exports = executor;