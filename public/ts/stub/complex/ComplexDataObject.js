///<reference path="../../api.ts"/>
///<reference path="../../../js/enum/ResultCodeEnum.ts"/>
///<reference path="../../debug.ts"/>
///<reference path="../DataObject.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var stub;
(function (stub) {
    var ComplexDataObjectParseError = (function (_super) {
        __extends(ComplexDataObjectParseError, _super);
        function ComplexDataObjectParseError(dataObject, message) {
            if (message === void 0) { message = "ComplexDataObject (" + dataObject.tableName() + ") does not support parsing"; }
            _super.call(this, dataObject, message);
            this.dataObject = dataObject;
            this.message = message;
            this.name = "ComplexDataObjectParseError";
        }
        return ComplexDataObjectParseError;
    })(stub.DataObjectError);
    stub.ComplexDataObjectParseError = ComplexDataObjectParseError;
    var ComplexDataObjectMissingBaseStubError = (function (_super) {
        __extends(ComplexDataObjectMissingBaseStubError, _super);
        function ComplexDataObjectMissingBaseStubError(dataObject, baseDataObjectStub, message) {
            if (message === void 0) { message = "ComplexDataObject (" + dataObject.tableName() + ") Failed to get required base stub (" + baseDataObjectStub.tableName() + ")"; }
            _super.call(this, dataObject, message);
            this.dataObject = dataObject;
            this.baseDataObjectStub = baseDataObjectStub;
            this.message = message;
            this.name = "ComplexDataObjectParseError";
        }
        return ComplexDataObjectMissingBaseStubError;
    })(stub.DataObjectError);
    stub.ComplexDataObjectMissingBaseStubError = ComplexDataObjectMissingBaseStubError;
    var ComplexDataObject = (function (_super) {
        __extends(ComplexDataObject, _super);
        function ComplexDataObject() {
            _super.apply(this, arguments);
        }
        ComplexDataObject.prototype.isComplex = function () {
            return true;
        };
        /**
         * @deprecated in subclass, only used in super class to compute 'isSame'
         * @return object of master instance
         * */
        ComplexDataObject.prototype.toObject = function (instance) {
            if (instance === void 0) { instance = this; }
            return instance.masterDataObject().toObject();
        };
        ComplexDataObject.prototype.parseObject = function (rawObject) {
            //return this.parseBaseObjects(this.baseInstances().map(baseInstance=>baseInstance.parseObject(rawObject)));
            throw new stub.ComplexDataObjectParseError(this);
        };
        ComplexDataObject.prototype.uniqueKeyList = function () {
            //return this.baseInstances()
            //  .map(baseInstance=>baseInstance.uniqueKeyList())
            //  .reduce((a, c)=>a.concat(c));
            return this.masterStubInstance().uniqueKeyList();
        };
        /**
         * parse the target base object from a list of un-ordered rawObject
         * */
        ComplexDataObject.prototype.parseTargetBaseObject = function (rawObjects, instance) {
            var targetBaseObject = null;
            rawObjects.forEach(function (rawObject) {
                try {
                    targetBaseObject = instance.parseObject(rawObject);
                }
                catch (exception) {
                }
            });
            if (targetBaseObject == null)
                throw new stub.DataObjectParseError(this);
            else
                return targetBaseObject;
        };
        /**
         * @remark security leak
         * */
        ComplexDataObject.prototype.isEditSupport = function () {
            return this.baseInstances().some(function (e) { return e.isEditSupport(); });
        };
        ComplexDataObject.prototype.isSame = function (another) {
            return this.masterDataObject().isSame(another.masterDataObject());
        };
        ComplexDataObject.prototype.hashCode = function () {
            return this.masterDataObject().hashCode();
        };
        ComplexDataObject.prototype.use_all_instance_list = function (consumer) {
            var complexInstance = this;
            /* build all complex instance from all master instance */
            var master_dataObjects_consumer = function (master_dataObject_array) {
                /* fork and build all complex instance */
                var complexDataObject_array = [];
                /*   build pool */
                var pool = [];
                master_dataObject_array.forEach(function (master_dataObject) {
                    pool.push(function (reportDone) {
                        /* save instance to collector (array) */
                        var consumer = function (complexDataObject) {
                            complexDataObject_array.push(complexDataObject);
                            reportDone();
                        };
                        complexInstance.buildFromMasterDataObject(master_dataObject, consumer);
                    });
                });
                /* pass the complex instance list to consumer */
                var allDone = function () {
                    consumer(complexDataObject_array);
                };
                lang.async.fork_and_join(pool, allDone);
            };
            /* get all master instance */
            complexInstance.masterStubInstance().use_all_instance_list(master_dataObjects_consumer);
        };
        //TODO to implement the filter logic on server (php)
        ComplexDataObject.prototype.use_fully_matched_instance_list = function (queryKeyValues, consumer) {
            throw new TypeError("Operation not support yet");
        };
        //TODO to implement the filter logic on server (php)
        ComplexDataObject.prototype.use_partially_matched_instance_list = function (queryKeyValues, consumer) {
            throw new TypeError("Operation not support yet");
        };
        return ComplexDataObject;
    })(stub.DataObject);
    stub.ComplexDataObject = ComplexDataObject;
})(stub || (stub = {}));
//# sourceMappingURL=ComplexDataObject.js.map