import { hugeNumber } from '../service/number';
import ElementButtons from './ElementButtonsClass';
import Player from './PlayerCreator';
import SpecialButtons from './SpecialButtonsClass';
import TitleButtons from './TitleButtonsClass';
import World from './WorldClass';

class SystemCreator{

    constructor(){
        if(SystemCreator.instance == null){
            this.worlds = new Array()
            this.selected_world_id = 0

            this.initWorlds_Buttons_Titles_Recovery()
        }
        return SystemCreator.instance
    }

//#region World functions (set/get)
    //Change the selected world
    setSelectedWorldId(id){
        this.selected_world_id = id
    }

    //Return all worlds and put it in a nice JSON format
    getAllWorlds(){
        var list_worlds = []
        this.worlds.forEach(world =>{
            var w = {
                id : world.id,
                name : world.name,
                image : world.image
            }
            
            list_worlds.push(w)
        })
        return list_worlds
    }
//#endregion

//#region Get : Buttons / Titles / Recovery

//They all call Worlds functions that return JSON arrays
    getByWorldIdElementsButtons(){
        return this.worlds[this.selected_world_id].getAllElementsButtons()
    }

    getByWorldIdTitlesButtons(){
        return this.worlds[this.selected_world_id].getAllTitlesButtons()
    }

    getByWorldIdSpecialsButtons(){
        return this.worlds[this.selected_world_id].getAllSpecialsButtons()
    }
//#endregion

//#region Initialisation
    initWorlds_Buttons_Titles_Recovery(){
        var elements = [
            new ElementButtons(1, "Dirt"),
            new ElementButtons(2, "Wood"),
            new ElementButtons(3, "Stone"),
            new ElementButtons(4, "Coal"),
            new ElementButtons(5, "Copper")
        ]

        var titles = [
            new TitleButtons(0, "Dirst titles", new hugeNumber(100, 0), 1),
            new TitleButtons(1, "Stone titles", new hugeNumber(50, 0), 3)
        ]

        var special = [
            new SpecialButtons(0, 0, 0, 0, 0)
        ]

        this.worlds.push(new World(0, "Earth surface", "earth", elements, titles, special));

        
        elements = [
            new ElementButtons(6, "Iron"),
            new ElementButtons(7, "Silver"),
            new ElementButtons(8, "Gold"),
            new ElementButtons(9, "Titanium"),
            new ElementButtons(10, "Diamond")
        ]

        special = [
            new SpecialButtons(1, 1, 10, 4, 2),
            new SpecialButtons(2, 10000, 10, 5, 10),
        ]

        this.worlds.push(new World(1, "Earth caves", "nether", elements, new Array(), special));
    }
//#endregion
}

//It's like a Singleton
const System = new SystemCreator()

export default System