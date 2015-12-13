module lang {
  export interface Consumer<T> {
    (t:T);
  }
  export interface Supplier<T> {
    ():T;
  }
  export interface Producer<T,R> {
    (t:T):R;
  }

 export module task {
    export interface Task {
      ():any;
    }
    export class TaskQueue {
      constructor(taskQueue:Task[] = []) {
        this.taskQueue = taskQueue;
      }

      private taskQueue:Task[];

      public startTasks() {
        while (this.hasNextTask()) {
          var task = this.nextTask();
          task();
        }
      }

      public addTask(task:Task) {
        this.taskQueue.push(task);
      }

      private hasNextTask():boolean {
        return this.taskQueue.length > 0;
      }

      private nextTask():Task {
        if (this.hasNextTask()) {
          return this.taskQueue.shift();
        } else {
          throw new NoNextTaskError();
        }
      }
    }
    class TaskError extends Error {
      public name = "TaskError";

      constructor(public message?:string) {
        super(message);
      }
    }
    class NoNextTaskError extends TaskError {
      public name = "NoNextTaskError";
    }
  }

  export type KeyValue=[string,any];
}
