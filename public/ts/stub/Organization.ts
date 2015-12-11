/** @remark this is auto-generated file, do not edit
 * generated by php script
 * */
declare function get_all_row($http: any, table_name: string) : any[];
class Organization_stub {
    public static table_name:string = "Organization" ;

    public static __organization_id:string = "organization_id";
    public static __organization_type:string = "organization_type";
    public static __name:string = "name";
    public static __main_country:string = "main_country";

    private static getObject($http) {
        get_all_row($http,this.table_name)
    }

    private static parseObject(rawObject:any):Organization {
        //TODO
        var myOrganization = new Organization();
        myOrganization.organization_id = rawObject.organization_id;
        myOrganization.organization_type = rawObject.organization_type;
        myOrganization.name = rawObject.name;
        myOrganization.main_country = rawObject.main_country;
        return myOrganization;
    }

    public static get_all_instance($http):Organization[] {
        var all_row = get_all_row($http,this.table_name);
        return all_row.map(row => this.parseObject(row));
    }

}
class Organization {
    public static table_name:string = "Organization" ;

    public organization_id:number;
    public organization_type:string;
    public name:string;
    public main_country:number;
}