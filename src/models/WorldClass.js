import { hugeNumber, numberToString } from '../service/number';
import Player from './PlayerCreator';
import ElementButtons from "./ElementButtonsClass";
import SpecialButtons from "./SpecialButtonsClass";
import TitleButtons from "./TitleButtonsClass";

class World{
    constructor(id = null, name = null, image = null, elements_buttons = [new ElementButtons], titles_buttons = [new TitleButtons], special_buttons = [new SpecialButtons]){
        this.id = id
        this.name = name
        this.image = image

        //Arrays
        this.elements_buttons = elements_buttons
        this.titles_buttons = titles_buttons
        this.special_buttons = special_buttons
    }

//#region All functions return arrays of Elements/Titles/Recoveries in a nice JSON format
    getAllElementsButtons(){
        var list_buttons = []
        this.elements_buttons.forEach(element_b => {
            var eb = {
                id : element_b.id,
                name : element_b.name,
                buttons : [
                    {
                        value : 1,
                        cost : element_b.getValueOfOne()
                    },
                    {
                        value : 10,
                        cost : element_b.getValueOfTen()
                    },
                    {
                        value : 100,
                        cost : element_b.getValueOfHundred()
                    },
                    {
                        value : 1000,
                        cost : element_b.getValueOfThousand()
                    }
                ]
            }

            list_buttons.push(eb)
        });

        return list_buttons
    }

    getAllTitlesButtons(){
        var list_buttons = []
        this.titles_buttons.forEach(title_b => {
            var id = title_b.id
            var tb = {
                id : id,
                name : title_b.name,
                buttons_cost : {
                    name : Player.getElementNameById(title_b.cost_element_id),
                    id : title_b.cost_element_id,
                    quantity : title_b.cost_value
                }
            }

            list_buttons.push(tb)
        });

        return list_buttons
    }

    

    getAllSpecialsButtons(){
        var list_buttons = []
        this.special_buttons.forEach(special_b => {
            var id = special_b.id
            if(id === 0){
                var sb = {
                    id : id,
                    name : special_b.name,
                }
            }
            else{
                var sb = {
                    buttons_element_recovery:{
                        id : special_b.recovery_id,
                        quantity : special_b.recovery_quantity,
                        name : Player.getElementNameById(special_b.recovery_id),
                    },
                    buttons_condition : {
                        id : special_b.condition_element_id,
                        name : Player.getElementNameById(special_b.condition_element_id),
                        quantity : special_b.condition_value
                    }
                }
            }

            list_buttons.push(sb)
        });

        return list_buttons
    }
//#endregion
}

export default World