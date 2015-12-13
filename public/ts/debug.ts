///<reference path="utils.ts"/>
module debug {
  export class IllegalStatusError extends Error {
    public name = "IllegalStatusError";
  }
  export class APIFailedError extends Error {
    public name = "APICallFailed";

    constructor(result:any) {
      super();
      utils.log(result);
    }
  }
}


