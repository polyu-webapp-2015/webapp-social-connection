/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
class Attraction_stub {
    public static table_name:string = "Attraction" ;

    public static __event_id:string = "event_id";

    private static getObject($http) {
        get_all_row($http,this.table_name)
    }

    private static parseObject(rawObject:any):Attraction {
        //TODO
        var myAttraction = new Attraction();
        myAttraction.event_id = rawObject.event_id;
        return myAttraction;
    }

    public static get_all_instance($http):Attraction[] {
        var all_row = get_all_row($http,this.table_name);
        return all_row.map(row => this.parseObject(row));
    }

}
class Attraction {
    public static table_name:string = "Attraction" ;

    public event_id:number;
}