<template>
    <section id="titles">
        <div class="titles-title">
            <h1>Titles <br/> <span>GACHA</span></h1>
        </div>
        <div class="list-titles-gachas">
            <button class="gacha" v-for="title in titles" v-bind:key="title.id" @mouseenter="startTimer(title.id, title.buttons_cost.id, title.buttons_cost.quantity)" @mouseleave="stopTimer">
                <div class="gacha-animation"></div>
                <h2>{{title.name}}</h2>
                <p>-{{numberString(title.buttons_cost.quantity)}} {{title.buttons_cost.name}}</p>
            </button>
        </div>
        
        <div class="last_title" v-show="showPopup">{{ lastTitle }}</div>
    </section>
</template>

<script>
import Player from '@/models/PlayerCreator';
import System from '@/models/SystemCreator';
import {numberToString} from '@/service/number';

export default {
    name:"Titles",
    data(){
        return{
            titles : null,

            timer: null,
            interval: 500,
            
            showPopup: false,
            lastTitle : ''
        }
    },
    created() {
        this.titles = System.getByWorldIdTitlesButtons()
    },
    computed:{
        getLastTitle(){
            return Player.last_title
        }
    },
    methods:{
        startTimer(id, id_element_buyer, price) {
            this.timer = setInterval(() => {
                if(Player.canBoughtTitle(id, id_element_buyer, price)){
                    Player.boughtTitle(id, id_element_buyer, price)

                    this.lastTitle = Player.last_title
                    this.showPopupWithText()
                    this.$emit('title_bought');
                }
            }, this.interval);
        },

        stopTimer() {
            clearInterval(this.timer);
        },
        numberString(number){
            return numberToString(number)
        },
        showPopupWithText() {
        setTimeout(() => {
            this.showPopup = true;
        }, 100);
        setTimeout(() => {
            this.showPopup = false;
        }, 500);
        },
    }
}
</script>

<style>
#titles{
    max-width: 100%;
    display: flex;
    flex-direction: column;

    padding: 1rem 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.171);
}

.titles-title{
    text-align: center;
    font-size: 2rem;
}

.titles-title span{
    font-size: 1.8rem;
    font-style: italic;
    text-shadow: 2px 2px rgba(212, 0, 255, 0.404);
}

.titles-title::after{
    content:'';
    display: block;
    width: 3.5rem;
    margin:auto;
    margin-top: 1rem;
    border-bottom: 1px solid black;
    margin-bottom: 1rem;

}

.list-titles-gachas{
    display: flex;
    justify-content: flex-start;
    padding: 1.5rem 0.5rem;
    gap: 0.5rem;
    flex-direction: column;
    align-items: center;
    flex: 1;

    max-height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
}


.gacha{
    --bg-pos:-150%;
    --bg-end-pos:0;
    --text-start-pos:49%;
    --text-pos:-100%;
    --btn-width:80%;
    --btn-height:5rem; 
    --text-size:3rem;
}

.gacha {
    border-radius: 25px;
    border: 1px solid rgba(0, 0, 0, 0.274);
    padding: 1rem;
    cursor: pointer;
    outline-offset: 4px;
    background: transparent;

    height: 5rem;
    width: 15rem;

    margin-bottom: 1rem;
    transition: all 0.5s linear;

    position: relative;
    overflow: hidden;
}

.gacha-animation{
    width: 100%;
    height: 200%;
    position: absolute;
    top:-50%;
    left: 0;
    z-index: -100;

    transform: translateX(var(--bg-pos));

    background: black;
}

.gacha h2, .gacha p{
    transition: all 1s linear;
    z-index: 100;
    color: black;
    background: white;
    background-image: url('../assets/img/black-bg.png');
    background-size: 200% 100%;
    background-position-x: var(--text-start-pos);
    background-repeat: no-repeat;
    width: 100%;
    color:transparent;
    background-clip: text;
    -webkit-background-clip: text;
}

.gacha:hover{
    transform: scale(1.1);
}

.gacha:hover .gacha-animation{
    animation: button-bg 0.5s infinite linear;
}

.gacha:hover h2, .gacha:hover p{
    animation: button-text 0.5s infinite linear;
}

@keyframes gachaRolling {
    0%{
        background: white;
    }

    100%{
        background: rgba(0, 0, 0, 0.274);
    }
}


.last_title {
  position: fixed;
  top: 10%;
  left: 15%;
  width: 15rem;
  height: 5rem;
  background-color: #fff;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  animation: fadeOut 0.5s linear;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5rem;

  border: 1px solid black;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>