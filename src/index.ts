import { completeFromList } from "@codemirror/autocomplete";
// @ts-ignore
import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  foldNodeProp,
  foldInside,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const parserWithMetaData = parser.configure({
  props: [
    foldNodeProp.add({
      Application: foldInside,
    }),
    styleTags({
      OpenMarker: t.brace,
      CloseMarker: t.brace,
      Plaintext: t.content,
      Resolvable: t.string,
    }),
  ],
});

export const floweaseLanguage = LRLanguage.define({
  parser: parserWithMetaData,
  languageData: {
    commentTokens: { line: ";" },
  },
});

const completions = floweaseLanguage.data.of({
  autocomplete: completeFromList([
    // { label: "test", type: "keyword" }, // to add in future
  ]),
});

export function floweaseExpression() {
  return new LanguageSupport(floweaseLanguage, [completions]);
}
