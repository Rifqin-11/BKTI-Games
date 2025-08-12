export interface Puzzle {
  id: string;
  title: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  language: 'html' | 'js' | 'ts';
  blocks: string[];
  solutionOrder: number[];
  hint: string;
  explanation: string;
  previewType: 'render' | 'console';
}

export const puzzles: Puzzle[] = [
  // BEGINNER PUZZLES
  {
    id: 'html-basic-structure',
    title: 'Basic HTML Structure',
    difficulty: 'beginner',
    language: 'html',
    blocks: [
      '</body>',
      '<title>My Page</title>',
      '<body>',
      '<!DOCTYPE html>',
      '<h1>Welcome</h1>',
      '<html>',
      '</html>',
      '<head>',
      '</head>'
    ],
    solutionOrder: [3, 5, 7, 1, 8, 2, 4, 6, 0],
    hint: 'HTML documents start with DOCTYPE, then html, head, and body tags.',
    explanation: 'A proper HTML document structure begins with DOCTYPE declaration, followed by html tag, head section with title, and body with content.',
    previewType: 'render'
  },
  {
    id: 'simple-list',
    title: 'Create an HTML List',
    difficulty: 'beginner',
    language: 'html',
    blocks: [
      '<ul>',
      '<li>Apple</li>',
      '</ul>',
      '<li>Orange</li>',
      '<li>Banana</li>'
    ],
    solutionOrder: [0, 1, 4, 3, 2],
    hint: 'Unordered lists need opening and closing tags with list items inside.',
    explanation: 'HTML lists use ul tags to wrap li elements in proper order.',
    previewType: 'render'
  },
  {
    id: 'basic-form',
    title: 'Simple Contact Form',
    difficulty: 'beginner', 
    language: 'html',
    blocks: [
      '<form>',
      '<input type="text" placeholder="Name">',
      '<input type="email" placeholder="Email">',
      '</form>',
      '<button type="submit">Send</button>'
    ],
    solutionOrder: [0, 1, 2, 4, 3],
    hint: 'Forms contain input fields and should end with a submit button.',
    explanation: 'HTML forms wrap input elements, with submit buttons inside the form tags.',
    previewType: 'render'
  },
  {
    id: 'css-center-div',
    title: 'Center a Div',
    difficulty: 'beginner',
    language: 'html',
    blocks: [
      '<div class="container">',
      '<style>',
      '.container { display: flex; justify-content: center; align-items: center; height: 100vh; }',
      '</style>',
      '<h2>Centered Content</h2>',
      '</div>'
    ],
    solutionOrder: [1, 2, 3, 0, 4, 5],
    hint: 'Use flexbox properties to center content both horizontally and vertically.',
    explanation: 'Flexbox with justify-content and align-items center creates perfect centering.',
    previewType: 'render'
  },
  {
    id: 'basic-table',
    title: 'Data Table',
    difficulty: 'beginner',
    language: 'html', 
    blocks: [
      '<table border="1">',
      '<th>Name</th>',
      '<tr>',
      '<td>John</td>',
      '</tr>',
      '</table>',
      '<th>Age</th>',
      '<td>25</td>'
    ],
    solutionOrder: [0, 2, 1, 6, 4, 2, 3, 7, 4, 5],
    hint: 'Tables have header rows (th) and data rows (td) wrapped in tr tags.',
    explanation: 'HTML tables structure data with thead/tbody sections and proper row/cell nesting.',
    previewType: 'render'
  },
  {
    id: 'simple-css-card',
    title: 'CSS Card Component',
    difficulty: 'beginner',
    language: 'html',
    blocks: [
      '<style>',
      '.card { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }',
      '</style>',
      '<div class="card">',
      '<h3>Card Title</h3>',
      '<p>This is a simple card component.</p>',
      '</div>'
    ],
    solutionOrder: [0, 1, 2, 3, 4, 5, 6],
    hint: 'Define styles first, then apply them to HTML elements.',
    explanation: 'CSS cards use padding, border-radius, and box-shadow for a clean appearance.',
    previewType: 'render'
  },
  {
    id: 'nav-menu',
    title: 'Navigation Menu',
    difficulty: 'beginner',
    language: 'html',
    blocks: [
      '<nav>',
      '<ul style="list-style: none; display: flex; gap: 20px;">',
      '<li><a href="#home">Home</a></li>',
      '<li><a href="#about">About</a></li>',
      '</ul>',
      '</nav>',
      '<li><a href="#contact">Contact</a></li>'
    ],
    solutionOrder: [0, 1, 2, 3, 6, 4, 5],
    hint: 'Navigation uses ul/li structure with styling for horizontal layout.',
    explanation: 'HTML navigation combines semantic nav elements with flexbox styling.',
    previewType: 'render'
  },
  {
    id: 'image-gallery',
    title: 'Simple Image Gallery',
    difficulty: 'beginner',
    language: 'html',
    blocks: [
      '<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">',
      '<img src="https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?w=200" alt="Nature">',
      '<img src="https://images.pexels.com/photos/1072179/pexels-photo-1072179.jpeg?w=200" alt="City">',
      '</div>',
      '<img src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?w=200" alt="Ocean">',
      '<img src="https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?w=200" alt="Mountains">'
    ],
    solutionOrder: [0, 1, 2, 4, 5, 3],
    hint: 'CSS Grid can create responsive image layouts with equal columns.',
    explanation: 'Grid layouts with repeat() create flexible image galleries.',
    previewType: 'render'
  },
  {
    id: 'alert-function',
    title: 'Simple Alert Function',
    difficulty: 'beginner',
    language: 'js',
    blocks: [
      'function showMessage() {',
      '  alert("Hello World!");',
      '}',
      'showMessage();'
    ],
    solutionOrder: [0, 1, 2, 3],
    hint: 'Functions are declared first, then called to execute.',
    explanation: 'JavaScript functions encapsulate reusable code that can be called multiple times.',
    previewType: 'console'
  },
  {
    id: 'variable-math',
    title: 'Basic Math Operations',
    difficulty: 'beginner',
    language: 'js',
    blocks: [
      'let a = 10;',
      'let result = a + b;',
      'let b = 5;',
      'console.log("Result:", result);'
    ],
    solutionOrder: [0, 2, 1, 3],
    hint: 'Variables must be declared before they can be used in calculations.',
    explanation: 'JavaScript variables need to be defined before being used in expressions.',
    previewType: 'console'
  },

  // INTERMEDIATE PUZZLES
  {
    id: 'array-filter',
    title: 'Filter Array Elements',
    difficulty: 'intermediate',
    language: 'js',
    blocks: [
      'const numbers = [1, 2, 3, 4, 5, 6];',
      'console.log("Even numbers:", evenNumbers);',
      'const evenNumbers = numbers.filter(num => num % 2 === 0);'
    ],
    solutionOrder: [0, 2, 1],
    hint: 'Filter method creates a new array with elements that pass a test.',
    explanation: 'Array filter() method returns elements that match a specified condition.',
    previewType: 'console'
  },
  {
    id: 'async-fetch',
    title: 'Async Data Fetching',
    difficulty: 'intermediate',
    language: 'js',
    blocks: [
      'async function getData() {',
      '  const response = await fetch("/api/data");',
      '  console.log("Data:", data);',
      '  const data = await response.json();',
      '  return data;',
      '}'
    ],
    solutionOrder: [0, 1, 3, 2, 4, 5],
    hint: 'Async functions use await for promises, and response must be converted to JSON.',
    explanation: 'Async/await pattern handles promises sequentially for cleaner code.',
    previewType: 'console'
  },
  {
    id: 'object-destructuring',
    title: 'Object Destructuring',
    difficulty: 'intermediate',
    language: 'js',
    blocks: [
      'const person = { name: "Alice", age: 30, city: "NYC" };',
      'console.log(`${name} is ${age} years old`);',
      'const { name, age } = person;'
    ],
    solutionOrder: [0, 2, 1],
    hint: 'Destructuring extracts properties from objects into individual variables.',
    explanation: 'ES6 destructuring syntax simplifies extracting multiple object properties.',
    previewType: 'console'
  },
  {
    id: 'class-inheritance',
    title: 'Class Inheritance',
    difficulty: 'intermediate',
    language: 'js',
    blocks: [
      'class Animal {',
      '  constructor(name) { this.name = name; }',
      '}',
      'class Dog extends Animal {',
      '  bark() { return `${this.name} says woof!`; }',
      '}',
      'const dog = new Dog("Rex");',
      'console.log(dog.bark());'
    ],
    solutionOrder: [0, 1, 2, 3, 4, 5, 6, 7],
    hint: 'Classes use extends keyword for inheritance and super for parent constructors.',
    explanation: 'ES6 classes provide a cleaner syntax for prototype-based inheritance.',
    previewType: 'console'
  },
  {
    id: 'promise-chain',
    title: 'Promise Chain',
    difficulty: 'intermediate',
    language: 'js',
    blocks: [
      'Promise.resolve(5)',
      '  .then(x => x * 2)',
      '  .then(x => x + 3)',
      '  .catch(err => console.error(err));',
      '  .then(x => console.log("Final result:", x))'
    ],
    solutionOrder: [0, 1, 2, 4, 3],
    hint: 'Promise chains execute sequentially, with catch handling any errors.',
    explanation: 'Promise chaining allows sequential async operations with error handling.',
    previewType: 'console'
  },
  {
    id: 'array-reduce',
    title: 'Array Reduce Function',
    difficulty: 'intermediate',
    language: 'js',
    blocks: [
      'const numbers = [1, 2, 3, 4, 5];',
      'const sum = numbers.reduce((acc, curr) => acc + curr, 0);',
      'console.log("Sum:", sum);'
    ],
    solutionOrder: [0, 1, 2],
    hint: 'Reduce accumulates array elements into a single value using a callback.',
    explanation: 'Array reduce() method applies a function to each element to produce a single result.',
    previewType: 'console'
  },
  {
    id: 'module-import',
    title: 'ES6 Module Import',
    difficulty: 'intermediate',
    language: 'js',
    blocks: [
      'import { calculateTax } from "./utils.js";',
      'const price = 100;',
      'console.log("Total with tax:", total);',
      'const total = price + calculateTax(price);'
    ],
    solutionOrder: [0, 1, 3, 2],
    hint: 'Import statements come first, then use the imported functions.',
    explanation: 'ES6 modules allow importing specific functions from other files.',
    previewType: 'console'
  },
  {
    id: 'closure-example',
    title: 'JavaScript Closure',
    difficulty: 'intermediate',
    language: 'js',
    blocks: [
      'function createCounter() {',
      '  let count = 0;',
      '  return function() {',
      '    return ++count;',
      '  };',
      '}',
      'const counter = createCounter();',
      'console.log(counter()); // 1',
      'console.log(counter()); // 2'
    ],
    solutionOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    hint: 'Closures allow inner functions to access outer function variables.',
    explanation: 'Closures preserve access to outer scope variables even after function returns.',
    previewType: 'console'
  },

  // ADVANCED PUZZLES
  {
    id: 'typescript-generic',
    title: 'Generic Function',
    difficulty: 'advanced',
    language: 'ts',
    blocks: [
      'function identity<T>(arg: T): T {',
      '  return arg;',
      '}',
      'const result = identity<string>("Hello TypeScript");',
      'console.log(result);'
    ],
    solutionOrder: [0, 1, 2, 3, 4],
    hint: 'Generics use angle brackets to define type parameters.',
    explanation: 'TypeScript generics provide type safety while maintaining flexibility.',
    previewType: 'console'
  },
  {
    id: 'interface-implementation',
    title: 'Interface Implementation',
    difficulty: 'advanced',
    language: 'ts',
    blocks: [
      'interface User {',
      '  name: string;',
      '  age: number;',
      '  greet(): string;',
      '}',
      'class Person implements User {',
      '  constructor(public name: string, public age: number) {}',
      '  greet() { return `Hi, I\'m ${this.name}`; }',
      '}',
      'const user = new Person("Alice", 25);',
      'console.log(user.greet());'
    ],
    solutionOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    hint: 'Interfaces define contracts that classes must implement.',
    explanation: 'TypeScript interfaces ensure classes follow specific structure and behavior.',
    previewType: 'console'
  },
  {
    id: 'async-generator',
    title: 'Async Generator Function',
    difficulty: 'advanced',
    language: 'ts',
    blocks: [
      'async function* numberGenerator(): AsyncGenerator<number> {',
      '  for (let i = 1; i <= 3; i++) {',
      '    await new Promise(resolve => setTimeout(resolve, 100));',
      '    yield i;',
      '  }',
      '}',
      'async function run() {',
      '  for await (const num of numberGenerator()) {',
      '    console.log("Generated:", num);',
      '  }',
      '}',
      'run();'
    ],
    solutionOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    hint: 'Async generators yield promises and can be consumed with for-await-of.',
    explanation: 'Async generators combine generator functions with async/await for streaming data.',
    previewType: 'console'
  },
  {
    id: 'decorator-pattern',
    title: 'TypeScript Decorator',
    difficulty: 'advanced',
    language: 'ts',
    blocks: [
      'function log(target: any, propertyName: string, descriptor: PropertyDescriptor) {',
      '  const method = descriptor.value;',
      '  descriptor.value = function(...args: any[]) {',
      '    console.log(`Calling ${propertyName} with args:`, args);',
      '    return method.apply(this, args);',
      '  };',
      '}',
      'class Calculator {',
      '  @log',
      '  add(a: number, b: number) { return a + b; }',
      '}',
      'const calc = new Calculator();',
      'calc.add(2, 3);'
    ],
    solutionOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    hint: 'Decorators modify class methods at design time using the @ syntax.',
    explanation: 'TypeScript decorators provide a way to add metadata and modify class behavior.',
    previewType: 'console'
  },
  {
    id: 'mapped-types',
    title: 'Mapped Types',
    difficulty: 'advanced',
    language: 'ts',
    blocks: [
      'type User = { name: string; age: number; email: string; };',
      'type Optional<T> = { [K in keyof T]?: T[K]; };',
      'type PartialUser = Optional<User>;',
      'const partialUser: PartialUser = { name: "John" };',
      'console.log(partialUser);'
    ],
    solutionOrder: [0, 1, 2, 3, 4],
    hint: 'Mapped types transform existing types by iterating over their properties.',
    explanation: 'TypeScript mapped types create new types by transforming properties of existing types.',
    previewType: 'console'
  },
  {
    id: 'conditional-types',
    title: 'Conditional Types',
    difficulty: 'advanced',
    language: 'ts',
    blocks: [
      'type IsString<T> = T extends string ? true : false;',
      'type Test1 = IsString<string>; // true',
      'type Test2 = IsString<number>; // false',
      'console.log("Type checking with conditional types");'
    ],
    solutionOrder: [0, 1, 2, 3],
    hint: 'Conditional types use extends keyword to create type-level conditionals.',
    explanation: 'TypeScript conditional types enable complex type transformations based on conditions.',
    previewType: 'console'
  },
  {
    id: 'advanced-promise',
    title: 'Promise.allSettled Pattern',
    difficulty: 'advanced',
    language: 'ts',
    blocks: [
      'const promises = [',
      '  Promise.resolve("Success 1"),',
      '  Promise.reject("Error 1"),',
      '  Promise.resolve("Success 2")',
      '];',
      'Promise.allSettled(promises).then(results => {',
      '  results.forEach((result, index) => {',
      '    console.log(`Promise ${index}:`, result.status, result.status === "fulfilled" ? result.value : result.reason);',
      '  });',
      '});'
    ],
    solutionOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    hint: 'Promise.allSettled waits for all promises regardless of their outcome.',
    explanation: 'Promise.allSettled handles mixed success/failure scenarios gracefully.',
    previewType: 'console'
  },
  {
    id: 'proxy-object',
    title: 'JavaScript Proxy',
    difficulty: 'advanced',
    language: 'js',
    blocks: [
      'const target = { name: "Alice", age: 30 };',
      'const handler = {',
      '  get(target, property) {',
      '    console.log(`Getting property: ${property}`);',
      '    return target[property];',
      '  }',
      '};',
      'const proxy = new Proxy(target, handler);',
      'console.log(proxy.name);'
    ],
    solutionOrder: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    hint: 'Proxy objects intercept and customize operations on other objects.',
    explanation: 'JavaScript Proxy provides meta-programming capabilities for object operations.',
    previewType: 'console'
  },
];

export function getPuzzlesByDifficulty(difficulty: 'beginner' | 'intermediate' | 'advanced'): Puzzle[] {
  return puzzles.filter(puzzle => puzzle.difficulty === difficulty);
}

export function getPuzzleById(id: string): Puzzle | undefined {
  return puzzles.find(puzzle => puzzle.id === id);
}