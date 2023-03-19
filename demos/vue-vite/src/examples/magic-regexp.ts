import {
  anyOf,
  charIn,
  char,
  charNotIn,
  createRegExp,
  digit,
  exactly,
  letter,
  oneOrMore,
  wordChar
} from 'magic-regexp'

const regex = createRegExp(
  exactly('id: ').and(oneOrMore(wordChar).at.lineEnd())
)

console.log(regex)
const idRegex = createRegExp(
  exactly('id: ')
    .at.lineStart()
    .and(letter.or(digit).times.between(2, 6).at.lineEnd().groupedAs('id'))
)

const stringsToParse = [
  'id: 1',
  'there is no id',
  'learnvue id: 1',
  '[INFO] id: 12',
  'id: 1a',
  'random log info id: 4b93B30 random log',
  'id: 4b93B30'
].map((s) => {
  return [s, s.match(idRegex)?.groups.id]
})

console.table(stringsToParse)
