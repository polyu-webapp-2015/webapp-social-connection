<?php

/**
 * Created by IntelliJ IDEA.
 * User: beenotung
 */
class EditOrganizationActor extends Actor
{
    public $name = "EditOrganization";
    public $params = array(
        Organization_Fields::__organization_id => 1,
        APIFieldEnum::_field_array => [
            [Organization_Fields::__name => "Poly U 2"],
            [Organization_Fields::__main_country => 1],
            [Organization_Fields::__organization_type => organization_type_Enum::__academic]
        ]
    );
    public $output = [
        APIFieldEnum::_result_code => ResultCodeEnum::_Success
    ];
    public $desc = "update organization (self or other for admin) Info, aka edit organization";

    public function handle($data)
    {
        $account_id = ActorUtil::check_session_valid($data);
        put_all_into($data, $this->params);
        $target_organization_id = $this->params[Organization_Fields::__organization_id];
        if (DatabaseOperator::getUserOrganization($account_id) != $target_organization_id) {
            $account_type = DatabaseOperator::getAccountType($account_id);
            if ($account_type != account_type_Enum::__admin && $account_type != account_type_Enum::__helper)
                throw new Exception("This user ($account_type) cannot edit organization of other user", ResultCodeEnum::_No_Permission);
        }
        $field_value_array = $this->params[APIFieldEnum::_field_array];
        $table_name = Organization_Fields::_;
        $where_statement = DatabaseHelper::field_value_to_statement([
            Organization_Fields::__organization_id => $target_organization_id
        ]);
        $result = DatabaseHelper::update_on_table($table_name, $field_value_array, $where_statement);
        return $this->output;
    }
}

addAPI(new EditOrganizationActor());
