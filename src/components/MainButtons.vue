<template>
    <section id="main">
        <div class="first-part"> <!--Herbs collect or recovery buttons-->
            <div  v-if="specials[0].id === 0">
                <button class="herbs big-btn" @mouseenter="startTimer" @mouseleave="stopTimer">
                    <div class="big-btn-front">
                        <div class="big-btn-front-bg"></div>
                        <div class="big-btn-front-animation"></div>
                        <h1>Herbs</h1>
                    </div>
                </button>
                <p class="herbs-quantity">{{ getElementQuantitybyId(0) }}</p>
            </div>
            <div class="recovery-btns" v-else>
                <button class="recovery big-btn" v-for="recovery in specials" v-bind:key="recovery.id"  
                    @mouseenter="startRecoveryTimer(recovery.buttons_element_recovery.id, recovery.buttons_element_recovery.quantity ,recovery.buttons_condition.id, recovery.buttons_condition.quantity)" @mouseleave="stopRecoveryTimer">
                    <div class="big-btn-front">
                        <div class="big-btn-front-bg"></div>
                        <div class="big-btn-front-animation"></div>
                        <div class="recovery-text">
                            <h1 class="recovery-btn-title">{{numberString(recovery.buttons_element_recovery.quantity)}} {{ recovery.buttons_element_recovery.name }}</h1>
                            <h1 class="recovery-btn-need">{{numberString(recovery.buttons_condition.quantity)}} {{recovery.buttons_condition.name}}</h1>
                        </div>
                    </div>
                </button>
            </div>
        </div>
        <div class="elements-list"> <!--All the elements buttons-->
            <div class="element" v-for="element in buttons" v-bind:key="element.id"> <!--One element with its multiple buttons-->
                <h2 :style="{'color': getColor[element.id]}">{{ getName[element.id] }}</h2>
                <p class="element-quantity">{{ getElementQuantitybyId(element.id) }}</p> 
                <div class="element-btns">
                    <button  v-for="btn in element.buttons" v-bind:key="btn.index" @click="buyElement(element.id, btn.value, btn.cost)">
                        <h3>x{{ btn.value }}</h3>
                        <h5 v-bind:class="{'greenTextClass': hasEnoughSubElement(element.id, btn.cost), 'redTextClass': !hasEnoughSubElement(element.id, btn.cost)}">-{{ btn.cost }}</h5>
                    </button>
                </div>
            </div>
        </div>
        <div class="element-list-border"></div>
    </section>
</template>

<script>
import Player from '@/models/PlayerCreator';
import System from '@/models/SystemCreator';
import {hugeNumber, numberToString} from '@/service/number';

export default {
    name:"Main",
    data() {
        return{
            buttons : null,
            specials: null,
            inventory : null,
            list_element_quantity : [],
            
            timer: null,
            interval: 1000,

            Recoverytimer : null,
        }
    },
    created() {
        this.buttons = System.getByWorldIdElementsButtons()
        this.specials = System.getByWorldIdSpecialsButtons()
        this.inventory = Player.getElementsInventory()

        this.list_element_quantity = Player.getListQuantity()
    },
    computed:{
        getName(){
            return this.inventory.map(u => u.name)
        },
        getColor(){
            return this.inventory.map(u => u.color)
        }
    },
    methods: {
        startTimer() {
            this.timer = setInterval(() => {
                Player.addElement(0, new hugeNumber(1, 0))
                this.inventory = Player.getElementsInventory()
                this.list_element_quantity = Player.getListQuantity()
            }, this.interval);
        },

        stopTimer() {
            clearInterval(this.timer);
        },

        startRecoveryTimer(id, quantity, id_element, value_condition){
            this.Recoverytimer = setInterval(() => {
                Player.addElementWithCondition(id, quantity, id_element, value_condition);
                this.inventory = Player.getElementsInventory()
                this.list_element_quantity = Player.getListQuantity()
            }, this.interval);
        },

        stopRecoveryTimer(){
            clearInterval(this.Recoverytimer);
        },

        buyElement(id, quantity, price){
            Player.boughtElement(id, new hugeNumber(quantity, 0), new hugeNumber(price, 0))

            //Update quantities
            this.inventory = Player.getElementsInventory()
            this.list_element_quantity = Player.getListQuantity()
        },

        hasEnoughSubElement(id, price){
            let val = this.list_element_quantity[id - 1]

            price = new hugeNumber(price, 0)

            if(price.exp > val.exp) return false
            if(price.exp < val.exp) return true
            if(price.value > val.value) return false
            return true
        },
        getElementQuantitybyId(id){
            return numberToString(this.list_element_quantity[id])
        },
        numberString(nbr){
            return numberToString(nbr)
        }
    },
}
</script>

<style>
#main{
    text-align: center;
    padding: 1rem;
    max-width: 100%;
}

.first-part{
    margin: 0 5rem;

    min-height: 7rem;
}

.herbs{
    --bg-pos:-100%;
    --bg-end-pos:0;
    --text-pos:-99%;
    --btn-width:80%;
    --btn-height:5rem; 
    --text-size:3rem;
    --text-start-pos:0;
}

.herbs-quantity{
    font-size: 1.5rem;
    padding: 0.5rem 0;

    padding-bottom: 0 !important;
}

.herbs-quantity::after{
    content: '';
    display: block;
    margin: auto;
    margin-top: 0.3rem;
    width: 28rem;
    border-bottom: 1px solid black;
}

.recovery{
    --bg-pos:-158px;
    --bg-end-pos:0px;
    --text-pos:158px;
    --btn-width:10rem;
    --btn-height:5rem; 
    --text-size:1.2rem;
    --text-start-pos:0;

    width: var(--btn-width);
    margin:1rem;
}

.big-btn {

    background: hsl(0, 0%, 0%);
    border-radius: 12px;
    border: none;
    padding: 0;
    cursor: pointer;
    outline-offset: 4px;

    width: var(--btn-width);
    height: var(--btn-height);
}

.big-btn .big-btn-front {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 12px;
    background: transparent;
    border: 1px solid black;
    color: rgb(0, 0, 0);
    transform: translateY(-6px);
    
    font-size: var(--text-size);
    font-weight: bold;

    width: 100%;
    height: var(--btn-height);

    position: relative;
    overflow: hidden;
}

.big-btn .big-btn-front-animation{
    width: 100%;
    height: calc(var(--btn-height) * 4);
    transform: translateY(-7px) translateX(var(--bg-pos));
    background: black;
    position: absolute;
}

.big-btn .big-btn-front-bg{
    transition: all 1s linear;
    width: 100%;
    height: calc(var(--btn-height) * 3);
    transform: translateY(-7px);
    background: white;
    border: 1px solid black;
    position: absolute;
}

.big-btn-front h1{
    transition: all 1s linear;
    z-index: 100;
    text-transform: uppercase;
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

.big-btn:hover .big-btn-front {
    transform: translateY(-1px);
}

.big-btn:hover .big-btn-front .big-btn-front-animation{
    animation: button-bg 1s infinite linear;
}

.big-btn:hover .big-btn-front h1{
    animation: button-text 1s infinite linear;
}

.recovery-btns{
    border-radius: 12px;
    margin: auto;
    padding: 0.3rem;
}

.recovery-btn-title{
    font-size: var(--text-size);
}

.recovery-btn-title::after{
    z-index: 100;
    content: '';
    display: block;
    width: 2rem;
    margin: auto;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgb(134, 134, 134);
}

.recovery-btn-need{
    font-size: calc(var(--text-size) - 0.4rem);
    color: rgb(126, 2, 2);
}

.recovery-text{
    z-index: 100;
    width: 100%;
}

.elements-list{
    margin: 0.1rem;
    max-height: 78.7%;
    overflow-y: auto;
}

.element-list-border{
    width: 28rem;
    margin: auto;
    border-bottom: 1px solid black;
}

.element{
    display: flex;
    align-items: center;

    flex-direction: column;
}

.element h2{
    font-size: 2rem;
    margin-top: 1.5rem;
}

.element-quantity{
    font-size: 1.5rem;
}

.element-quantity::after{
    content: '';
    display: block;
    margin: auto;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    width: 7rem;
    border-bottom: 2px solid black;
}

.element-btns{
    display: flex;
    justify-content: space-between;
    width: 22rem;
}

.element-btns button{
    cursor: pointer;
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.274);
    border-radius: 5px;
    padding: 0.5rem 1rem;
    outline-offset: 4px;
}

.element-btns button:hover{
    background: rgba(0, 0, 0, 0.034);
}

.element-btns button:active{
    background: rgba(0, 0, 0, 0.274);
}

.redTextClass{
    color: red;
}

.greenTextClass{
    color: green;
}


@keyframes button-bg {
    0%{
        transform: translateY(-7px) translateX(var(--bg-pos));
    }

    100%{
        transform: translateY(-7px) translateX(var(--bg-end-pos));
    }
}


@keyframes button-text {
    0%{
        background-position-x: var(--text-start-pos);
    }

    100%{
        background-position-x: var(--text-pos);
    }
}
</style>