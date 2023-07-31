
class ElementButtons{
    
    constructor(id = null, element_name = null){
        this.id = id
        this.element_name = element_name
        this.cost_value = 10 * Math.pow(1.1, this.id - 1)
        this.cost_element_id = this.id - 1
    }

//#region AllButtons1x10x100x1000
    getValueOfOne(){
        return Math.floor(this.cost_value)
    }

    getValueOfTen(){
        return Math.floor((this.cost_value * 10) * 1.10)
    }

    getValueOfHundred(){
        return Math.floor((this.cost_value * 100) * 1.5)
    }

    getValueOfThousand(){
        return Math.floor((this.cost_value * 1000) * 2)
    }
//#endregion
}

export default ElementButtons