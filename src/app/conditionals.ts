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
  } else {
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

type PartDuck = Partial<Duck>; //Defintion of Partial uses that as well.

type DeepPartial<T> = { //This is somewhat incomplete, acts kind of strangely with arrays. Later tools allow us to make it better.
  [K in keyof T]?: DeepPartial<T[K]>
}

//TODO: Add init example. Google DeepPartial

/**
 * Conditionals
 */
type Diff<T, U> = T extends U ? never: T; //Exclude is sort of defined like this

type TypePropertyNames<T, P> = {
  [K in keyof T]: T[K] extends P ? K : never
}[keyof T];

let t: TypePropertyNames<Duck, boolean>;

function doDuckThings(duck: Duck, thing: TypePropertyNames<Duck, () => any>) { //This one unfortunately does not work with generic. Unsure why.
  duck[thing]();
}

doDuckThings(duck, 'makeNoise');


/**
 * Infer
 */
type Unpack<T> = T extends {data: infer U} ? U : never;

interface DuckData {
  data: Duck;
  type: 'duck'
}

let data: Unpack<DuckData>;

/**
 * Combined usage
 */

enum FowlTypes {
    duck,
    goose
}

interface FowlData<T extends FowlTypes> {
    type: T;
    data: T extends FowlTypes.duck ? string :
        T extends FowlTypes.goose ? number :
        never;
}

type Action<T extends string = string> = {
  type: T
}

export function isType<T extends string = string>(...types: T[]) {
  return <A extends Action, U extends Extract<A, { type: T }>>(action: A): action is U =>
    types.some(type => action.type === type);
}



let thing = {
    data: 'thing'
};

