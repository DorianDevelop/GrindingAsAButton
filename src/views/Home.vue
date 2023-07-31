<template>
  <section id="jeu">
    <Header />
    <MainButtons v-if="renderComponent && renderMain" />
    <Titles @title_bought="titleBought" v-if="renderComponent"/>
    <Worlds @id_changed="worldChanged"/>
    <Footer />
  </section>
</template>

<script>
import MainButtons from "@/components/MainButtons.vue"
import Titles from "@/components/Titles.vue"
import Worlds from "@/components/Worlds.vue"
import Footer from "@/components/Footer.vue"
import Header from "@/components/Header.vue"

import Player from '@/models/PlayerCreator';

export default{
    name:'Home',
    components:{
        MainButtons,
        Titles,
        Worlds,
        Footer,
        Header
    },
    data(){
      return{
        renderComponent: true,
        renderMain : true,
      }
    },
    created() {
      // Retrieve saved player data from localStorage
      const savedPlayer = JSON.parse(localStorage.getItem("Player"));
      if (savedPlayer) {
        // Update the player data with the saved data
        Player.setAllPlayerDatas(savedPlayer);
      }else{
        Player.initInventory();
      }
    },
    methods: {
      async forceRerender() {
        this.renderComponent = false;

        await this.$nextTick();

        this.renderComponent = true;
      },
      async forceRerenderMain() {
        this.renderMain = false;

        await this.$nextTick();

        this.renderMain = true;
      },
      worldChanged(){
        this.forceRerender()
      },
      titleBought(){
        this.forceRerenderMain()
      }
    },
}
</script>

<style>
#jeu {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(8, 1fr);
  grid-row-gap: 0.3rem;

  height: 100vh;
}

#main{
  grid-area: 2 / 3 / 8 / 9;
}

#titles{
  grid-area: 2 / 1 / 8 / 3;
}

#worlds{
  grid-area: 2 / 9 / 8 / 11;
}

#footer{
  grid-area: 8 / 1 / 9 / 11;
}

#header{
  grid-area: 1 / 1 / 2 / 11;
}
</style>