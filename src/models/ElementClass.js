import Boost from './BoostClass';
import Player from './PlayerCreator';
import {hugeNumber, alignHugeNumbers, multiplyHugeNumbers} from '@/service/number';


class Element{

    constructor(id = null, name = null, description = null, color = null, boosts = new Array(), element_boosters = {}, title_boosters = {}, quantity = new hugeNumber(0, 0), titles_multiplier = new hugeNumber(1, 0), elements_multiplier = new hugeNumber(1, 0), multiplier = new hugeNumber(1, 0)){
        this.id = id;

        //Basic stuffs
        this.name = name
        this.description = description
        this.color = color;
        this.quantity = quantity

        //Boosts
        this.boosts = boosts
        this.element_boosters = element_boosters
        this.title_boosters = title_boosters
        
        //Multipliers
        this.titles_multiplier = titles_multiplier
        this.elements_multiplier = elements_multiplier
        this.multiplier = multiplier
    }

//#region Quantity function (add/remove/reset)
    addQuantity(add){
        //Multiply the added quantity by it's multiplier
        add = multiplyHugeNumbers(add, this.multiplier)

        //Add it to the existing quantity
        alignHugeNumbers(this.quantity, add) // Met au même exp

        this.quantity.afterMathValue(this.quantity.value + add.value)
        this.updateBoostersOfOthers()
    }

    removeQuantity(remove){
        //Substract it to the existing quantity
        alignHugeNumbers(remove, this.quantity);

        this.quantity.afterMathValue(this.quantity.value - remove.value)
        this.updateBoostersOfOthers()
    }

    resetQuantity(){
        //Manually put everything back to 0
        this.quantity.value = 0
        this.quantity.exp = 0
        this.updateBoostersOfOthers()
    }
//#endregion

//#region Boosters functions (add/update/updateOther's)
    updateBoostersOfOthers(){
        //it's like sending a signal to all the element that this one is boosting, telling by how much it's doing it
        this.boosts.forEach(boost => {
            boost.quantity = this.quantity
            Player.setElementBoostersWithId(boost, this.id)
        });
    }

    addElementBoosters(id_booster, boost){
        //it's like receiving the signal emit by an other element, adding it to the dictionnary of boosters or updating it inside it
        if(id_booster == this.id) return;
        this.element_boosters[id_booster] = boost

        //And now update the multiplier (this one is the element multiplier, there's also the title one)
        let multi = new hugeNumber(1, 0)

        Object.entries(this.element_boosters).forEach(([id, boost]) => {
            if(boost.quantity.value > 0){
                let val = boost.getBoost()

                multi = multiplyHugeNumbers(val, multi)
            }
        });
        this.elements_multiplier = multi
        this.updateTrueMultiplier()
    }
    

    addTitleBoosters(id_booster, boost){
        //it's like receiving the signal emit by a title, adding it to the dictionnary of boosters or updating it inside it
        this.title_boosters[id_booster] = boost

        //And now update the multiplier (this one is the title multiplier, there's also the element one)
        let multi = new hugeNumber(1, 0)

        Object.entries(this.title_boosters).forEach(([id, boost]) => {
            if(boost.quantity.value > 0){
                let val = boost.getBoost()

                multi = multiplyHugeNumbers(val, multi)
            }
        });
        this.titles_multiplier = multi
        this.updateTrueMultiplier()
    }

    updateTrueMultiplier(){
        //Combining both of the boosters multiplier to get the "true multiplier"
        this.multiplier = multiplyHugeNumbers(this.titles_multiplier, this.elements_multiplier)
    }
//#endregion
}

export default Element