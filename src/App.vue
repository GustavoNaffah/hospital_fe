<template>
  <div id="app" class="app">
    <div class="header">
      <img src="@/assets/home1.jpg">
    </div>
    <div class="buttons">
      <nav>
        <button v-if="is_auth" v-on:click="loadHome" > Inicio </button>
        <button v-if="is_auth" v-on:click="loadConsulPer"> Informacion personal </button>
        <button v-if="!is_auth" v-on:click="loadLogIn"> Iniciar Sesión </button>
        <button v-if="perfil=='Medico'" v-on:click="loadSignUp"> Registrar personal</button> 
        <button v-if="is_auth" v-on:click="logOut"> Cerrar Sesión </button>
      </nav>
  </div>

  </div>
  <div class="main-component">
    <router-view 
      v-on:completedLogIn= "completedLogIn"
      v-on:completedSignUp= "completedSignUp"
      v-on:logOut="logOut"
      ></router-view>
  </div> 
</template>

<script>
  export default({
  
    data: function(){
        return{
          is_auth: false,
          perfil: "",
        }
    },
  
    methods:{
      veryAuth: function(){
        this.is_auth= localStorage.getItem("isAuth") || false;
        this.perfil = localStorage.getItem("perfil")

      if(this.is_auth== false)
        this.$router.push({name:"logIn"});
      else
        this.$router.push({name:"home"});
      },  
      loadLogIn: function(){
          this.$router.push({name:"logIn"})
      },
      loadSignUp: function(){
          this.$router.push({name:"signUp"})
      },
      completedLogIn: function(data,perfil){
          localStorage.setItem("isAuth", true)
          localStorage.setItem("perfil", perfil)
          localStorage.setItem("username", data.username);
          localStorage.setItem("token_access", data.token_access);
          localStorage.setItem("token_refresh", data.token_refresh);
          alert("Auntentificación Exitoda");
          this.veryAuth();
      },
      completedSignUp: function(data){
          alert("Registro Exitoso");
          this.$router.push({name:"home"});
      },
      logOut:function(){
        localStorage.clear();
        alert("Sesion cerrada");
        this.veryAuth();
      },
      loadHome:function(){
        this.$router.push({name:"home"});
      },
      loadConsulPer:function(){
        this.$router.push({name:"consultPer"});
      },
      verySalud:function(){
        load =  true;
      }
    },
  
    created:function(){
      this.load= localStorage.getItem("load") || false;
    }
  })
  </script>


<style>

body{
    margin: 0 0 0 0; 
  }
.buttons {
    color: aqua;
}
.header{
    margin: 0;
    padding: 0;
    width:100%;
    min-height: 80px;
    background-color: #55c0e0;
    color: #E5E7E9;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .buttons{
    margin: 0;
    padding: 0% 2%;
    width:96%;
    height: 10vh;
    min-height: 10px;
    background-color: #7b808149;
    color: #2b73bb;
    display: flex;
    justify-content: flex-end;
    align-items:center;
  }
.buttons nav button{
    color: #E5E7E9;
    background: #2379e9;
    border: 1px solid #ffffff;
    border-radius: 20px;
    padding: 10px 20px;
    }
.buttons button:hover
{
color: #E5E7E9;
background: rgb(10, 108, 116);
border: 1px solid #000000;
}
</style>
