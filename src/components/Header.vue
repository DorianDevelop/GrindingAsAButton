<template>
    <header id="header">
        <div class="saves">
            <button @click="savePlayer">Save</button>
            <button @click="resetPlayer">Reset</button>
        </div>
        <router-link @click="savePlayer" to="/backpack" tag="button" class="header-btn">Backpack</router-link>
        <div class="parameters">
            <img src="../assets/svg/gear.svg" alt="">
            <img src="../assets/svg/volume.svg" alt="">
        </div>
    </header>
</template>

<script>
import Player from '../models/PlayerCreator';
export default {
    name:"Header",
    methods:{
        savePlayer(){
            localStorage.setItem("Player", JSON.stringify(Player))
        },
        resetPlayer(){
            if (confirm('Are you sure you want to reset all your datas?')) {
                localStorage.removeItem("Player")
                location.reload()
            }
        }
    }
}
</script>

<style>
#header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom:1px solid rgba(0, 0, 0, 0.24);
}

#header > * {
    min-width: 12rem;
}


.header-btn{
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.274);
    padding: 1rem;
    cursor: pointer;
    outline-offset: 4px;
    background: none;

    height: 4rem;
    width: 15rem;
    font-size: 1.5rem;
    text-align: center;
}

.header-btn:hover{
    background: rgba(0, 0, 0, 0.034);
}

.header-btn:active{
    background: rgba(0, 0, 0, 0.274);
}


.parameters{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.8rem;
    padding: 1rem;
}

.parameters img{
    max-width: 2rem;
    cursor: pointer;
}

.parameters img:hover{
    opacity: 0.8;
}

.parameters img:active{
    opacity: 0.5;
}


.saves{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    padding: 1rem;
}

.saves button{
    padding: 0.5rem 1rem;
    border: 1px solid black;
    border-radius: 7px;
    background: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.saves button:hover{
    background: rgba(0, 0, 0, 0.192);
    color: rgb(139, 139, 139);
}
.saves button:active{
    background: rgba(0, 0, 0, 0.438);
    color: rgb(197, 197, 197);
}
</style>