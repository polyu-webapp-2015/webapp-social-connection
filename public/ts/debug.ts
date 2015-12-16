module debug {
  export class APIError extends Error {
    public name = "APIError";

    constructor(message?:string) {
      super(message);
    }
  }

  export class IllegalStatusError extends Error {
    public name = "IllegalStatusError";

    constructor(message?:string) {
      super(message);
    }
  }
  export class APIFailedError extends Error {
    public name = "APICallFailed";

    constructor(message?:string) {
      super(message);
    }
  }
  export class APIParseResultError extends APIError {
    public name = "APIParseResultError";

    constructor(message?:string) {
      super(message);
    }
  }
  export class APICallError extends APIError {
    public name = "APICallError";

    constructor(message?:string) {
      super(message);
    }
  }
}
