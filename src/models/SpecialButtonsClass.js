import { hugeNumber } from "../service/number";

class SpecialButtons{
    
    constructor(id = null, condition_value = 0, condition_element_id = 0, recovery_id = 0, recovery_quantity = 0){
        this.id = id

        //Condition elemment stuffs
        this.condition_element_id = condition_element_id
        this.condition_value = new hugeNumber(condition_value, 0)   

        //Recovery element stuffs
        this.recovery_id = recovery_id
        this.recovery_quantity = new hugeNumber(recovery_quantity, 0)
    }
}

export default SpecialButtons