import { hugeNumber } from "../service/number";

class TitleButtons{
    constructor(id = null, name = null, cost_value = new hugeNumber(0, 0), cost_element_id = 0){
        this.id = id
        
        this.name = name

        //Cost element stuffs
        this.cost_value = cost_value
        this.cost_element_id = cost_element_id
    }
}

export default TitleButtons