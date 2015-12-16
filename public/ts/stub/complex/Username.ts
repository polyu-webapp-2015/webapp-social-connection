///<reference path="ComplexDataObject.ts"/>
///<reference path="../User_stub.ts"/>
///<reference path="../Title_stub.ts"/>
module stub {
  export class Username extends stub.ComplexDataObject {
    tableName():string {
      return "Username";
    }

    private _user_stub = new stub.User_stub();
    private _title_stub = new stub.Title_stub();

    baseInstances():DataObject[] {
      var list = [];
      list.push(this._user_stub);
      list.push(this._title_stub);
      return list;
    }

    parseBaseObjects(rawObjects:any[]):Username {
      var user = rawObjects[0];
      var title = rawObjects[1];
      var instance:Username = new Username();
      var baseInstances = this.baseInstances();
      instance.user = this._user_stub.parseObject(user);
      instance.title = this._title_stub.parseObject(title);
      return instance;
    }

    toBaseObjects():any[] {
      var user = this.user.toObject();
      var title = this.title.toObject();
      return [user, title];
    }

    private user:stub.User_stub;
    private title:stub.Title_stub;

    public getDisplayName():string {
      return this.title.get_title_text()
        + ' ' + this.user.get_first_name()
        + ' ' + this.user.get_last_name();
    }
  }
}
