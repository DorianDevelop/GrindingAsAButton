<template>
    <section id="worlds">
        <div class="worlds-title">
            <h1>Worlds <br/> <span>HUB</span></h1>
        </div>
        <div class="list-worlds">
            <div class="world" v-for="world in worlds" v-bind:key="world.id" @click="changeWorld(world.id)">
                <img :src="'../src/assets/img/' + world.image + '.jpg'" :alt="world.image">
                <h3>{{ world.name }}</h3>
            </div>
        </div>
    </section>
</template>

<script>
import System from '@/models/SystemCreator';

export default {
    name:"Worlds",
    data(){
        return{
            worlds : null
        }
    },
    created() {
        this.worlds = System.getAllWorlds()
    },
    methods: {
        changeWorld(id){
            System.setSelectedWorldId(id)
            this.$emit('id_changed');
        }
    },
}
</script>


<style>
#worlds{
    max-width: 100%;
    display: flex;
    flex-direction: column;

    padding: 1rem 0.5rem;
    border: 1px solid rgba(0, 0, 0, 0.171);
}

.worlds-title{
    text-align: center;
    font-size: 2rem;
}

.worlds-title span{
    font-size: 1.8rem;
    font-style: italic;
    text-shadow: 2px 2px rgba(0, 68, 255, 0.404);
}

.worlds-title::after{
    content:'';
    display: block;
    width: 3.5rem;
    margin:auto;
    margin-top: 1rem;
    border-bottom: 1px solid black;
    margin-bottom: 1rem;
}

.list-worlds{
    max-height: 90%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 0.5rem 1.5rem;
    overflow-x: hidden;
}

.world{
    height: 5rem;
    width: 15rem;

    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.274);
    cursor: pointer;

    margin-bottom: 1.5rem;
    position: relative;
}

.world:hover{
    background: rgba(0, 0, 0, 0.055);
}

.world:active{
    background: rgba(0, 0, 0, 0.274);
}

.world:hover > img{
    opacity: 0.8;
}

.world img{
    width:100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;

    object-fit: cover;
    object-position: center center;
}

.world h3{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background: rgba(255, 255, 255, 0.877);
    text-align: center;
    padding: 0.3rem 0;
    font-size:1.4rem
}
</style>