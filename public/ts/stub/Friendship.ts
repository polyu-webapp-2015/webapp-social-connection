/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
class Friendship_stub {
    public static table_name:string = "Friendship" ;

    public static __friendship_id:string = "friendship_id";
    public static __host_id:string = "host_id";
    public static __guest_id:string = "guest_id";
    public static __remark:string = "remark";

    private static getObject($http) {
        get_all_row($http,this.table_name)
    }

    private static parseObject(rawObject:any):Friendship {
        //TODO
        var myFriendship = new Friendship();
        myFriendship.friendship_id = rawObject.friendship_id;
        myFriendship.host_id = rawObject.host_id;
        myFriendship.guest_id = rawObject.guest_id;
        myFriendship.remark = rawObject.remark;
        return myFriendship;
    }

    public static get_all_instance($http):Friendship[] {
        var all_row = get_all_row($http,this.table_name);
        return all_row.map(row => this.parseObject(row));
    }

}
class Friendship {
    public static table_name:string = "Friendship" ;

    public friendship_id:number;
    public host_id:number;
    public guest_id:number;
    public remark:string;
}