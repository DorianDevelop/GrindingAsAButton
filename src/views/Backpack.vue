<template>
  <section id="backpack">
        <header class="backpack-header">
            <div class="backpack-header-return">
                <router-link to="/">
                    <img src="../assets/svg/return.svg" alt="">
                </router-link>
            </div>
            <p class="backpack-title">Backpack</p>
            <div class="backpack-number-btn">
                <button>10</button>
            </div>
        </header>

        <section id="backpack-main">
            <div class="both_lists">
                <div class="elementals-owned-list">
                    <div class="elemental-owned"  v-for="element in elements" v-bind:key="element.id">
                        <p class="item-title" :style="{'color': element.color}">{{ element.name }}</p>
                        <p class="item-number">{{ numberToString(element.quantity) }}</p>
                        <div class="elemental-description">
                            <h3>Description</h3>
                            <span>{{ element.description }}</span>
                            <p v-for="boost in getListElementBoosts(element.id)" v-bind:key="boost.id">
                                {{ boost.element_name }} x{{ numberToString(boost.boost_value) }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="titles-owned-list">
                    <div class="title-owned"   v-for="title in titles" v-bind:key="title.id">
                        <p class="item-title" :style="{'color': title.color}">{{ title.name }}</p>
                        <p class="item-number">{{ numberToString(title.quantity) }}</p>
                        <div class="title-description">
                            <h3>Description</h3>
                            <p v-for="boost in getListTitleBoosts(title.id)" v-bind:key="boost.id">
                                {{ boost.element_name }} x{{ numberToString(boost.boost_value) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer class="footer-backpack" />
  </section>
</template>

<script>
import Footer from "@/components/Footer.vue"

import Player from '@/models/PlayerCreator';
import {numberToString} from '@/service/number';

export default {
    name:"Backpack",
    components:{
        Footer
    },
    data(){
      return{
        elements : null,
        titles : null
      }
    },
    created(){
        // Retrieve saved player data from localStorage
        const savedPlayer = JSON.parse(localStorage.getItem("Player"));
        if (savedPlayer) {
            // Update the player data with the saved data
            Player.setAllPlayerDatas(savedPlayer);
        }else{
            Player.initInventory();
        }


        this.elements = Player.getElementsInventory()
        this.titles = Player.getTitlesInventory()
    },
    methods : {
        getListElementBoosts(id){
            return Player.getBoostsByElementId(id)
        },
        getListTitleBoosts(id){
            return Player.getBoostsByTitleId(id)
        },
        numberToString(nbr){
            return numberToString(nbr)
        }
    }
}
</script>
<style>

#backpack {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(9, 1fr);
    grid-row-gap: 0.3rem;

    height: 100vh;
}

.footer-backpack{
    grid-area: 9 / 1 / 10 / 11 !important;
}

.backpack-header{
    grid-area: 1 / 1 / 2 / 11;

    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
}

.backpack-header > *{
    width: 13rem;
}

.backpack-header-return{
    align-self: flex-start;
    text-align: left;
    margin: 1rem 2rem;
}

.backpack-header-return img{
    max-height: 3rem;
    cursor: pointer;
}

.backpack-header-return img:hover{
    opacity: 0.8;
}

.backpack-header-return img:active{
    opacity: 0.5;
}

.backpack-title{
    font-size: 2.5rem;
    text-decoration: underline;
}

.backpack-number-btn{
    margin: 1rem 2rem;
    display: flex;
    justify-content: flex-end;
    align-self: flex-start;
}

.backpack-number-btn button{
    padding: 0.5rem;
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.274);
    cursor: pointer;
}

.backpack-number-btn button:hover{
    background: rgba(0, 0, 0, 0.034);
}

.backpack-number-btn button:active{
    background: rgba(0, 0, 0, 0.274);
}

#backpack-main{
    grid-area: 2 / 2 / 9 / 10;
    width: 100%;
}

.both_lists{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 4rem;

    height: 100%;
    width: 100%;
    padding: 3rem 1rem;
}

.both_lists .elementals-owned-list,
.titles-owned-list{
    padding: 2rem 3rem;
    text-align: center;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.3rem;

    max-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.elementals-owned-list{
    grid-area: 1 / 1 / 2 / 2;
}

.titles-owned-list{
    grid-area: 1 / 2 / 2 / 3;
    direction: rtl;
}

.item-title{
    font-size: 1.5rem;
    padding: 0.2rem 0;
}

.item-title::after{
    content: '';
    display: block;
    width: 4rem;
    margin: auto;
    margin-top: 0.2rem;
    border-bottom: 1px solid black;
}

.item-number{
    padding: 0.5rem 0;
}

.item-number::after{
    content: '';
    display: block;
    width: 2rem;
    margin: auto;
    margin-top: 0.5rem;
    border-bottom: 1px solid black;
}

.elemental-description, .title-description{
    visibility: hidden;
    width: 12rem;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    padding: 1rem;
    
    position: absolute;
    top: 0;
    z-index: 100;
}

.elemental-description{
    left:-13rem;
}

.elemental-description h3,
.title-description h3{
    text-decoration: underline;
    margin-bottom: 0.5rem;
}

.elemental-description p,
.title-description p{
    margin: 0.5rem 0;
}


.elemental-description span,
.title-description span{
    font-style: italic;
    font-size: 0.85rem;
}

.elemental-description p:last-child,
.title-owned p:last-child{
    margin-bottom: 0;
}

.elemental-owned,
.title-owned{
    width: 8rem;
    position: relative;
}

.title-description{
    right:-13rem;
}

@media screen and (min-width: 1500px){

    .elemental-owned:hover > .elemental-description,
    .title-owned:hover > .title-description{
        visibility: visible;
    }
}
</style>