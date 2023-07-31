import Boost from './BoostClass';
import Player from './PlayerCreator';
import {hugeNumber} from '@/service/number';

class Title{
    constructor(id = null, name = null, rarity = 0, color = null, boosts = new Array(), quantity = new hugeNumber(0, 0)){
        this.id = id

        this.name = name
        this.color = color
        
        this.rarity = rarity
        this.boosts = boosts
        this.quantity = quantity
    }

    //Add quantity to this type of Title (all of the times add only 1)
    addQuantity(add){
        this.quantity.afterMathValue(this.quantity.value + add)
        this.updateBoostersOfElements()
    }

    //It's like emiting a signal to tell all the elements that this title boost that it has received a change and that their multiplier should update
    updateBoostersOfElements(){
        this.boosts.forEach(boost => {
            boost.quantity = this.quantity
            Player.setTitleBoostersWithId(boost, this.id)
        });
    }
}

export default Title