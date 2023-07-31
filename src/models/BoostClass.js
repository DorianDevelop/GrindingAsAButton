import {hugeNumber, multiplyHugeNumbers} from '@/service/number';

class Boost{
    
    constructor(id_boosted = 0, value = new hugeNumber(0, 0), quantity = new hugeNumber(0, 0)){
        this.id_boosted = id_boosted // Id of the boosted element
        this.value = value // How much will it boost
        this.quantity = quantity // How many boost quantity of this boost
    }

    getBoost(){
        if(this.quantity.value <= 0) return this.value

        return multiplyHugeNumbers(this.value, this.quantity)
    }
}

export default Boost