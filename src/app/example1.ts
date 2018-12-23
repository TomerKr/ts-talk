//Code copied from github user RomkeVdMeulen, https://github.com/Microsoft/TypeScript/issues/13923#issuecomment-377185119

type DeepPartial<T> =
  T extends Array<infer U> ? DeepPartialArray<U> :
    T extends object ? DeepPartialObject<T> :
      T;

type DeepPartialNoMethods<T> =
  T extends Array<infer U> ? DeepPartialArrayNoMethods<U> :
    T extends object ? DeepPartialObjectNoMethods<T> :
      T;

interface DeepPartialArrayNoMethods<T> extends Array<DeepPartialNoMethods<T>> {}
interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}

type DeepPartialObject<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

type NonFunctionPropertyNames<T> = {
  [P in keyof T]: T[P] extends Function ? never : P;
}[keyof T];

type DeepPartialObjectNoMethods<T> = {
  [P in NonFunctionPropertyNames<T>]?: DeepPartialNoMethods<T[P]>;
};


class MyType {
  constructor(init?: DeepPartialNoMethods<MyType>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}
