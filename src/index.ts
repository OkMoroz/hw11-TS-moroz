//Вам потрібно створити умовний тип, що служить для встановлення типу, що повертається з функції. Як параметр типу повинен обов'язково виступати функціональний тип.
//Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром (або задовільним) та повертає кортеж, де перше значення - це тип, що функція повертає, а другий - тип її параметру
//Створіть тип, який об'єднує властивості двох об'єктів тільки в тому випадку, якщо їхні значення мають спільний тип.

//Наприклад: { a: number; b: string } та { b: string; c: boolean } => { b: string; }

interface Book {
  title: string;
  author: string;
  genre: string;
}

type BookWithPages = {
  title: string;
  author: string;
  genre: string;
  pages: number;
};

//1
type FuncParam<T extends (...params: any[]) => any> = T extends (
  ...params: any[]
) => any
  ? ReturnType<T>
  : never;

function getBookTitle(book: Book): string {
  return book.title;
}
const book: Book = {
  title: "Кобзар",
  author: "Тарас Шевченко",
  genre: "Вірші",
};
const bookTitle: FuncParam<typeof getBookTitle> = getBookTitle(book);

//2
type FuncnInfo<T extends (param: any) => any> = T extends (
  param: infer ParameterType
) => infer ReturnType
  ? [ReturnType, ParameterType]
  : never;

type GetBookTitleInfo = FuncnInfo<typeof getBookTitle>;

const bookInfo: GetBookTitleInfo = [
  "Вірші",
  {
    title: "Кобзар",
    author: "Тарас Шевченко",
    genre: "Вірші",
  },
];

//3
type IntersectingProp<T, U> = {
  [K in Extract<keyof T, keyof U>]: T[K] & U[K];
};

const bookWithPages: BookWithPages = {
  title: "Кобзар",
  author: "Тарас Шевченко",
  genre: "Вірші",
  pages: 200,
};

const mergedBook: IntersectingProp<Book, BookWithPages> = {
  ...book,
  ...bookWithPages,
};

console.log(bookTitle);
console.log(bookInfo);
console.log(mergedBook);
