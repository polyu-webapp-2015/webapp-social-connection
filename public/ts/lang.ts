module lang {
  export interface Producer<T,R> {
    (t:T):R;
  }
  export interface Consumer<T> {
    (t:T);
  }
  export  interface Supplier<T> {
    ():T;
  }
  export type KeyValue = [string, any];
}
