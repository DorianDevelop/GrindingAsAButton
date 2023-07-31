import {hugeNumber} from '../service/number';
import Boost from './BoostClass';
import Element from './ElementClass';
import Title from './TitleClass';
import TitlesGroup from './TitlesGroupClass';

class PlayerCreator{
    constructor(){
        if(PlayerCreator.instance == null){
            this.name = "Unknown"
            this.elements = [new Element()]
            this.titles_group = [new TitlesGroup()]
            this.last_title = ''
            PlayerCreator.instance = this
        }
        return PlayerCreator.instance
    }

//#region Elements functions

    //Get an element's name when provided by it's id
    getElementNameById(id){
        //Verify that the id is inside the elements array (id starting at 0 and incrementing by 1 each time will with elements be reliated to the array)
        if(id < 0 || id > this.elements.length) return;

        return this.elements[id].name
    }

    //Get all element's and give them a nice JSON format to use in view
    getElementsInventory(){
        var inventory = []
        this.elements.forEach(element => {
            var id = element.id
            
            var e = {
                id : id,
                name : element.name,
                description : element.description,
                quantity : element.quantity,
                color : element.color
            }

            inventory.push(e)
        });

        return inventory
    }

    //Add element quantity
    addElement(id, quantity){
        if(id < 0 || id > this.elements.length) return;

        this.elements[id].addQuantity(quantity)
    }
    
    //Remove element quantity (pay)
    removeElement(id, quantity){
        if(id < 0 || id > this.elements.length) return;

        let removeQuantity = new hugeNumber(quantity.value, quantity.exp)
        this.elements[id].removeQuantity(removeQuantity)
    }

    //Get element quantity but check if enough price so can buy and if then remove price from inventory
    boughtElement(id_bought, quantity_bought, price){
        if(id_bought < 0 || id_bought >= this.elements.length || id_bought - 1 < 0 || price < 0) return;

        //id_bought - 1 because we always buy from the element before
        if(this.elements[id_bought - 1].quantity.exp < price.exp) return;
        if(this.elements[id_bought - 1].quantity.exp == price.exp && this.elements[id_bought - 1].quantity.value < price.value) return;

        for (let i = 0; i < id_bought; i++) {
            this.elements[i].resetQuantity()
            
        }

        this.addElement(id_bought, quantity_bought)
    }
    
    //It's for recovery button, it add element if condition true
    addElementWithCondition(id, quantity, id_element_condition, value_condition){
        if(id < 0 || id > this.elements.length) return;

        if(this.elements[id_element_condition].quantity.exp < value_condition.exp) return;
        if(this.elements[id_element_condition].quantity.exp == value_condition.exp && this.elements[id_element_condition].quantity.value < value_condition.value) return;

        this.elements[id].addQuantity(quantity)
    }

    //Go inside element cibled and update or add boost inside element_booster array
    setElementBoostersWithId(boost, id_booster){
        let id = boost.id_boosted
        if(id < 0 || id > this.elements.length) return;

        this.elements[id].addElementBoosters(id_booster, boost)
    }

    //Get all element quantity, it's use to reduce force refresh in main page every time we buy an element, it just update itself in a local array
    getListQuantity(){
        var quantities = new Array()
        this.elements.forEach(element => {
            quantities.push(element.quantity)
        });

        return quantities
    }
//#endregion

//#region Titles functions

    //Get all titles and give it a nice JSON format for view
    getTitlesInventory(){
        var inventory = []
        this.titles_group.forEach(group => {
            group.titles.forEach(title => {
                var id = title.id
                
                var t = {
                    id : id,
                    name : title.name,
                    quantity : title.quantity,
                    color : title.color
                }

                inventory.push(t)
            })
        });

        return inventory
    }

    //Like for booster, it access the element it's boost is boosting and add itself or update itself in a dictionnary
    setTitleBoostersWithId(boost, id_booster){
        let id = boost.id_boosted
        if(id < 0 || id > this.elements.length) return;

        this.elements[id].addTitleBoosters(id_booster, boost)
    }

    //Add title quantity, most of the time (every time by only 1)
    addTitle(id_title_group, id){
        if(id_title_group < 0 || id_title_group > this.titles_group.length) return;
        if(this.titles_group[id_title_group].getTitleById(id) == null) return;

        this.last_title = this.titles_group[id_title_group].getTitleById(id).name
        this.titles_group[id_title_group].getTitleById(id).addQuantity(1);
    }

    //Buy new title (rolling through the possible title in a group and pick one)
    boughtTitle(id_title_group, id_buyer, price){
        if(!this.canBoughtTitle(id_title_group, id_buyer, price)) return;

        let roll = Math.random()
        let sum_chances = 0;
        this.titles_group[id_title_group].titles.forEach(title => {
            if(roll > sum_chances && roll < (title.rarity / this.titles_group[id_title_group].total_rarities) + sum_chances){
                this.addTitle(id_title_group, title.id, 1);
                this.removeElement(id_buyer, price)
            }
            sum_chances += (title.rarity / this.titles_group[id_title_group].total_rarities)
        })
    }

    //Check if player can buy this title
    canBoughtTitle(id_title_group, id_buyer, price){
        if(id_title_group < 0 || id_title_group >= this.titles_group.length) return false;

        if(this.elements[id_buyer].quantity.exp < price.exp) return false;
        if(this.elements[id_buyer].quantity.exp == price.exp && this.elements[id_buyer].quantity.value < price.value) return false;

        return true;
    }
//#endregion

//#region Boost functions

    //Get a boost by an element's id (access inside element 'booster' dictionnay)
    getBoostsByElementId(id){
        if(id < 0 || id > this.elements.length) return;

        var boosts = []

        let list = this.elements[id].boosts
        list.forEach(boost => {
            var b = {
                element_name : this.getElementNameById(boost.id_boosted),
                boost_value : boost.value
            }

            boosts.push(b)
        })
        return boosts
    }

    //Get a boost by an title's id (access inside element 'booster' dictionnay)
    getBoostsByTitleId(id){
        if(id < 0) return;


        let list = [];
        var found = false;

        this.titles_group.forEach(group => {
            group.titles.forEach(title => {
                if(title.id === id){
                    list = title.boosts
                    found = true;
                }
            })
        })

        if(!found || list.length < 1) return;

        var boosts = []
        list.forEach(boost => {
            var b = {
                element_name : this.getElementNameById(boost.id_boosted),
                boost_value : boost.value
            }

            boosts.push(b)
        })
        return boosts
    }
//#endregion

//#region Load datas from save inside Player, convert every object in it's true type so every function are usable
    setAllPlayerDatas(save){
        
        var all_elements = []
        save.elements.forEach(element => {
            var all_boosts = []
            element.boosts.forEach(boost => {
                all_boosts.push(new Boost(boost.id_boosted, new hugeNumber(boost.value.value, boost.value.exp), new hugeNumber(boost.quantity.value, boost.quantity.exp)))
            })
            var all_element_booster = {}
            for (const [id, boost] of Object.entries(element.element_boosters)) {
                all_element_booster[id] = new Boost(boost.id_boosted, new hugeNumber(boost.value.value, boost.value.exp), new hugeNumber(boost.quantity.value, boost.quantity.exp))
            }
            var all_title_booster = {}
            for (const [id, boost] of Object.entries(element.title_boosters)) {
                all_title_booster[id] = new Boost(boost.id_boosted, new hugeNumber(boost.value.value, boost.value.exp), new hugeNumber(boost.quantity.value, boost.quantity.exp))
            }

            all_elements.push(new Element(element.id, element.name, element.description, element.color, all_boosts, all_element_booster, all_title_booster, new hugeNumber(element.quantity.value, element.quantity.exp), new hugeNumber(element.titles_multiplier.value, element.titles_multiplier.exp), new hugeNumber(element.elements_multiplier.value, element.elements_multiplier.exp), new hugeNumber(element.multiplier.value, element.multiplier.exp)))
        })
        this.elements = all_elements
        var all_titles_group = []
        save.titles_group.forEach(title_g => {
            var all_titles = []
            title_g.titles.forEach(title => {
                var all_boosts = []
                title.boosts.forEach(boost => {
                    all_boosts.push(new Boost(boost.id_boosted, new hugeNumber(boost.value.value, boost.value.exp), new hugeNumber(boost.quantity.value, boost.quantity.exp)))
                })
                all_titles.push(new Title(title.id, title.name, title.rarity, title.color, all_boosts, new hugeNumber(title.quantity.value, title.quantity.exp)))
            })
            all_titles_group.push(new TitlesGroup(title_g.id, title_g.name, all_titles))
        })

        this.titles_group = all_titles_group
        this.name = save.name
    }
//#endregion

//#region Initialisation function

    initInventory(){
        var elements = [
            new Element(0, "Herbs", "The simpliest element you could find", "rgb(0,255,0)"),
            new Element(1, "Dirt", "It look tasty", "rgb(139,69,19)", [new Boost(0, new hugeNumber(20, 0))]),
            new Element(2, "Wood", "", "rgb(160,82,45)", [new Boost(1, new hugeNumber(20, 0)), new Boost(0, new hugeNumber(20, 0))]),
            new Element(3, "Stone", "", "rgb(163, 163, 163)", [new Boost(2, new hugeNumber(20, 0)), new Boost(1, new hugeNumber(20, 0)), new Boost(0, new hugeNumber(20, 0))]),
            new Element(4, "Coal", "", "rgb(0,0,0)", [new Boost(3, new hugeNumber(20, 0)), new Boost(2, new hugeNumber(20, 0)),new Boost(1, new hugeNumber(20, 0)),new Boost(0, new hugeNumber(20, 0))]),
            new Element(5, "Copper", "", "rgb(	184, 115, 51)", [new Boost(4, new hugeNumber(20, 0)), new Boost(0, new hugeNumber(20, 0), 0)]),
            new Element(6, "Iron", "", "#a19d94", [new Boost(5, new hugeNumber(20, 0)), new Boost(0, new hugeNumber(20, 0), 0)]),
            new Element(7, "Silver", "", "#C0C0C0", [new Boost(6, 2), new Boost(0, new hugeNumber(20, 0), 0)]),
            new Element(8, "Gold", "", "#FFDF00", [new Boost(7, new hugeNumber(20, 0)),new Boost(6, new hugeNumber(20, 0), 0), new Boost(0, new hugeNumber(20, 0))]),
            new Element(9, "Titanium", "", "#D3D3D3", [new Boost(8, new hugeNumber(20, 0)),new Boost(7, new hugeNumber(20, 0), 0), new Boost(6, new hugeNumber(20, 0)), new Boost(0, new hugeNumber(20, 0))]),
            new Element(10, "Diamond", "", "#B9F2FF", [new Boost(9, new hugeNumber(20, 0)),new Boost(8, new hugeNumber(20, 0), 0), new Boost(0, new hugeNumber(20, 0))]),
        ]

        var titles = [
            new Title(0, "Dirt eater", 0.3, "rgb(0,0,0)", [new Boost(0, new hugeNumber(1.1, 0))]),
            new Title(1, "Dirt digger", 0.2, "rgb(0,255,0)", [new Boost(0, new hugeNumber(1.2, 0))]),
            new Title(2, "Dirt lover", 0.2, "rgb(0,0,0)", [new Boost(0, new hugeNumber(1.5, 0))]),
            new Title(3, "SUPER Dirt", 0.2, "rgb(0,0,0)", [new Boost(0, new hugeNumber(1.5, 0))]),
            new Title(4, "EPIC Dirt", 0.1, "rgb(0,0,0)", [new Boost(0, new hugeNumber(3, 0))]),
        ]

        var titles_group = [
            new TitlesGroup(0, "First World Titles", titles)
        ]

        titles = [
            new Title(5, "Iron eater"),
            new Title(6, "Iron digger"),
            new Title(7, "Iron lover"),
            new Title(8, "SUPER Iron"),
            new Title(9, "EPIC Iron"),
        ]

        titles_group.push(new TitlesGroup(1, "2nd World", titles))

        this.elements = elements
        this.titles_group = titles_group
    }
//#endregion
}

//It's like a Singleton
const Player = new PlayerCreator()

export default Player