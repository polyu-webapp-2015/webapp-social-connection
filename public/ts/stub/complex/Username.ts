///<reference path="ComplexDataObject.ts"/>
///<reference path="../User_stub.ts"/>
///<reference path="../Title_stub.ts"/>
///<reference path="../../lang.ts"/>
///<reference path="../../DataObjectManager.ts"/>


module stub {
  import Consumer = lang.Consumer;
  import Producer = lang.Producer;
  export class Username extends stub.ComplexDataObject {
    tableName():string {
      return "Username";
    }

    private _user_stub = new stub.User_stub();
    private _title_stub = new stub.Title_stub();

    private user:stub.User_stub;
    private title:stub.Title_stub;

    baseInstances():DataObject[] {
      var list = [];
      list.push(this._user_stub);
      list.push(this._title_stub);
      return list;
    }

    masterStubInstance():DataObject {
      return this._user_stub;
    }

    masterDataObject():DataObject {
      return this.user;
    }

    buildFromMasterDataObject(user:User_stub, consumer:Consumer<Username>) {
      var instance = new Username();
      instance.user = user;
      var titleFilter:Producer<Title_stub,boolean> = function (title) {
        return title.get_title_id() == user.get_title_id();
      };
      var titleConsumer:Consumer<Title_stub[]> = function (titles) {
        if (titles.length == 0)
          throw new ComplexDataObjectMissingBaseStubError(instance, instance._title_stub);
        else {
          instance.title = titles[0];
          consumer(instance);
        }
      };
      DataObjectManager.request(this._title_stub, titleFilter, titleConsumer);
    }

    public getDisplayName():string {
      return this.title.get_title_text()
        + ' ' + this.user.get_first_name()
        + ' ' + this.user.get_last_name();
    }

    public get_account_id():number{
      return this.user.get_account_id();
    }
  }
  stub.add_stub_instance(new Username());
}
