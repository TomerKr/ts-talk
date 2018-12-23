/**
 * Big verbose code
 */
import {MyAction, MyPayload, MyState} from './pointless-interfaces';

function uglyPick(obj: any, property: string): any { //Any in input, can put in whatever property. Null pointer exceptions everywhere!
  return obj[property];
}

interface TypeWithNumbers {
  a: number;
  b: number;
  c: string;
  d: Date;
}

function addNumberPropsUgly(obj: any, p1: string, p2: string): number {
  return obj[p1] + obj[p2]; //Are we sure these are numbers? We're losing all type safety here.
}

function uglyReducer(state: MyState, action: MyAction<any>): MyState { //'any' in input, what about safety for payload shapes?
  switch (action.type) {
    case 'mytype':
      let payload: MyPayload = action.payload as MyPayload; //Why should I tell it when it's obvious?
      return {...state, ...payload};
    default:
      return state;
  }
}



/**
 * The basics
 */

interface Bird {
  makeNoise(): string;
  looks: string;
  walk(steps: number): number;
  canSwim: boolean;
  canFly: boolean;
}

let duck1 = {
  canFly: true,
  canSwim: true,
  looks: 'duck',
  makeNoise: () => 'quack',
  walk: (steps: number) => steps,
  fly: () => {}
};

function doStuff(bird: Bird) {
  bird.makeNoise();
  bird.walk(5);
}

doStuff(duck1);


/**
 * Literals & Basics
 */
interface Duck extends Bird {
  looks: 'duck';
  canSwim: true;
  canFly: true;
  fly(): void;
}

type ColoredDuck = Duck & { color: string; }

function paintMyDuck(duck: Duck, color: string): ColoredDuck {
  return {...duck, color};
}

let duck: Duck = {
  canFly: true,
  canSwim: true,
  looks: 'duck',
  makeNoise: () => 'quack',
  walk: (steps: number) => steps,
  fly: () => {}
};

let blueDuck = paintMyDuck(duck, 'blue');


interface Penguin extends Bird {
  looks: 'tux';
  canSwim: true;
  canFly: false; // 😢
  eatFish(): void;
}

type BirdUnion = Duck | Penguin;
function tryToFly(bird: BirdUnion): boolean {
  if (bird.canFly) {
    bird.fly(); //TS knows this is a duck, and not a penguin.
    return true;
  } else { //Only works in strict mode.
    bird.eatFish();
    return false;
  }
}

/**
 * Meta information & recursion
 */
type DuckKeys = keyof Duck;

function pick<T, K extends keyof T>(obj: T, property: K): T[K] {
  return obj[property];
}

let duckLooks = pick(duck, 'looks');


type PartDuck = Partial<Duck>;
type myPartial<T> = {
  [K in keyof T]?: T
}

type DeepPartial<T> = { //This is somewhat incomplete, acts kind of strangely with arrays. Later tools allow us to make it better.
  [K in keyof T]?: DeepPartial<T[K]>
}

/**
 * Conditionals
 */
type Diff<T, U> = T extends U ? never : T; //Exclude is sort of defined like this

type BoolPropertyNames<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never
}[keyof T];

/**
 * {
 *     canSwim: 'canSwim'
 *     canFly: 'canFly'
 *     looks: never
 *     fly: never
 * }
 */

let t: BoolPropertyNames<Duck>;


type TypePropertyNames<T, P> = {
  [K in keyof T]: T[K] extends P ? K : never
}[keyof T];

function doDuckThings(duck: Duck, thing: TypePropertyNames<Duck, () => any>) {
  duck[thing]();
}

doDuckThings(duck, 'makeNoise');

function addNumberProps(obj: TypeWithNumbers, p1: TypePropertyNames<TypeWithNumbers, number>, p2: TypePropertyNames<TypeWithNumbers, number>): number {
  return obj[p1] + obj[p2];
}


/**
 * Infer
 */
type Unpack<T> = T extends {data: infer U} ? U : never;

interface DuckData {
  data: Duck;
  type: 'duck'
}

let data: Unpack<DuckData>;

type Unpacked<T> = //Example taken from docs.
  T extends (infer U)[] ? U :
  T extends (...args: any[]) => infer U ? U :
  T extends Promise<infer U> ? U :
  T;
