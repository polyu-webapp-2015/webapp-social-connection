///<reference path="ComplexDataObject.ts"/>
module stub {
  export class Username extends stub.DataObject {
    tableName():string {
      return "Username";
    }

    abstract uniqueKeyList():string[];

    abstract toObject(instant:DataObject):any;

    abstract parseObject(rawObject:any):DataObject ;

    public isEditSupport():boolean {
      return this.uniqueKeyList().length > 0;
    }

  }
}
