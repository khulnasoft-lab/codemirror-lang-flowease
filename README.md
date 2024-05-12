# codemirror-lang-flowease-expression

flowease expression language support for CodeMirror 6.

## Usage

Install flowease expression language support:

```sh
npm i codemirror-lang-flowease-expression
```

Install setup dependencies:

```sh
npm i @codemirror/language @lezer/common @lezer/javascript
```

Set up language support:

```js
import { parserWithMetaData as floweaseParser } from 'codemirror-lang-flowease-expression';
import { LanguageSupport, LRLanguage } from '@codemirror/language';
import { parseMixed } from '@lezer/common';
import { parser as jsParser } from '@lezer/javascript';

const floweasePlusJsParser = floweaseParser.configure({
	wrap: parseMixed((node) => {
		if (node.type.isTop) return null;

		return node.name === 'Resolvable'
			? { parser: jsParser, overlay: (node) => node.type.name === 'Resolvable' }
			: null;
	}),
});

const floweaseLanguage = LRLanguage.define({ parser: floweasePlusJsParser });

export function floweaseExpressionLanguageSupport() {
	return new LanguageSupport(floweaseLanguage);
}
```

## Author

© 2022 [KhulnaSoft DevOps](https://github.com/khulnasoft-lab)

## License

Distributed under the [MIT License](LICENSE.md).
