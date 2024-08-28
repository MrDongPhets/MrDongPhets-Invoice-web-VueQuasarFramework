<template>
  <div class="custom-layout">
  <q-layout view="lHh Lpr lFf">
    <q-header style="background-color:rgb(57, 156, 248);">
      <q-toolbar class="header">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      
        <div class="padding-search">
          <div class="searchbar">
          <q-input
        v-model="search"
     
        filled
        placeholder="Search"
        class="searhbar1"
       
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
        </div>
        
 
        </div>

        <div class="side-icon">
          <div>
            <q-btn
          flat
          dense
          round
          icon="chat"
         size="24px" 
         color="white"
        />
         
        </div>

        <div>
            <q-btn
          flat
          dense
          round
          icon="notifications"
         size="24px" 
         color="white"
        />
         
        </div>
        <div>
            <q-btn
          flat
          dense
          round
          icon="account_circle"
         size="24px" 
         color="white"
        />
         
        </div>
        
        </div>

       
        
      </q-toolbar>
    </q-header>

    <!-- Sidebar Drawer -->

    
      <q-drawer 
      class="custom-drawer"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    
    >
      <q-list>
        <q-item-label
          header
          style="font-size: 50px; margin-left: 0%;"
          class="text-gray"
        >
          DongPhets
        </q-item-label >
        <q-item
          to="/main"
          exact
          clickable
          class="dashboard"
        >
          <q-item-section avatar >
            <q-icon name="dashboard" size="54px" color="white"/>
          </q-item-section>
          <q-item-section>
            <q-item-label
            style="font-size: 30px; color:aliceblue;"
            >Dashboard</q-item-label>
          </q-item-section>
        </q-item>
    
        <q-item-label
          header
          style="font-size: 20px;"
          class="text-gray p-6"
        >
          Documents
        </q-item-label>

        <div class="item">
       

        <q-item
          to="/invoice"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon name="description" />
          </q-item-section>
          <q-item-section>
            <q-item-label 
            style="font-size: 20px;">Invoice</q-item-label>
          </q-item-section>
        </q-item>

        <q-item
          to="/product"
          exact
          clickable
        >
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label
            style="font-size: 20px;">Product</q-item-label>
          </q-item-section>
        </q-item>

     
      </div>

      </q-list>

      <div class="logout">
       <q-btn color="red" icon="logout" label="Logout" @click="goToWelcomePage"/>
      </div>
    </q-drawer>

    

    <!-- Page Container -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</div>
</template>

<style scoped>

.side-icon{
  display: flex;
 padding-left: 18%;
  
}

.custom-layout{
  background-color: rgb(244, 244, 245);
}

.padding-search{
  padding: 6px;
  margin-left: 10%;
}
.searchbar{
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  width: 500px;
  background-color: rgb(244, 244, 245);

}

.searchbar1{

  background-color: rgb(244, 244, 245);
}

.item{
  padding: 20px;
  width: 280px;

} 

.dashboard{
  margin-left: 10px;
  background-color: rgb(57, 156, 248);
  width: 270px;
  border-radius: 20px;
}

.logout{
  margin-left: 22%;
  margin-top: 70%;

}

.custom-drawer {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
}


</style>

<script>
export default {
  data() {
    return {
      leftDrawerOpen: false
    };
  },
  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    goToWelcomePage() {
      this.$router.push('/'); // Navigates to the login page
    }
  }
}
</script>
