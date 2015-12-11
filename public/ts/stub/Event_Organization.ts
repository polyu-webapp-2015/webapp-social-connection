/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
class Event_Organization_stub {
    public static table_name:string = "Event_Organization" ;

    public static __event_id:string = "event_id";
    public static __organization_id:string = "organization_id";

    private static getObject($http) {
        get_all_row($http,this.table_name)
    }

    private static parseObject(rawObject:any):Event_Organization {
        //TODO
        var myEvent_Organization = new Event_Organization();
        myEvent_Organization.event_id = rawObject.event_id;
        myEvent_Organization.organization_id = rawObject.organization_id;
        return myEvent_Organization;
    }

    public static get_all_instance($http):Event_Organization[] {
        var all_row = get_all_row($http,this.table_name);
        return all_row.map(row => this.parseObject(row));
    }

}
class Event_Organization {
    public static table_name:string = "Event_Organization" ;

    public event_id:number;
    public organization_id:number;
}