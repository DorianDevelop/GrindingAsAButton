import Title from "./TitleClass";

class TitlesGroup{
    //This class regroups multiples Title in a same "group" so it can roll between all the titles when using the "Gacha" assigned

    constructor(id = null, name = null, titles = [new Title()]){
        this.id = id
        this.name = name
        this.titles = titles

        this.total_rarities = this.calculTotalRarities()
    }

    //All titles have different rarirties and chances to drop, but we're never sure that when combined they all form 100% so we adjust here    
    calculTotalRarities(){
        let sum = 0
        this.titles.forEach(title => {
            sum += title.rarity
        })

        return sum
    }

    getTitleById(id){
        let res = null;
        this.titles.forEach(title => {
            if(title.id == id){
                res = title
            }
        })

        return res
    }
}

export default TitlesGroup