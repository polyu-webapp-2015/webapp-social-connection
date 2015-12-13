///<reference path="../js/enum/APIFieldEnum.ts"/>
///<reference path="../js/enum/ResultCodeEnum.ts"/>
///<reference path="../js/api_list.ts"/>
///<reference path="stub/City_stub.ts"/>
///<reference path="../js/enum/account_type_Enum.ts"/>
///<reference path="stub/Account_stub.ts"/>
///<reference path="utils.ts"/>
///<reference path="debug.ts"/>
///<reference path="api.ts"/>

import Producer = lang.Producer;
import Supplier = lang.Supplier;
import Consumer = lang.Consumer;

module  DataObjectManager {
  export function request<T extends stub.DataObject>(instance:T, filter:Producer<T,boolean>, consumer:Consumer<T[]>) {
    var filterFunc:Consumer<T[]> = function (list:T[]) {
      consumer(list.filter(filter));
    };
    instance.use_all_instance_list(filterFunc)
  }
}

