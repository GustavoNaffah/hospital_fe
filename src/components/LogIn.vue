<template>
    <div class="logIn_user">
        <div class="container_logIn_user">
        <form v-on:submit.prevent="processLogInUser">
            <label id="user_username"> Usuario:
                   <input type="text" v-model="user.username" placeholder="Usuario" required> 
            </label>
            <br>
            <label id="user_password"> Contraseña:
                   <input type="password" v-model="user.password" placeholder="Contraseña" required> 
            </label>
            <br>
            <button type="submit"> Iniciar Sesion </button>  
        </form>
        <img src="@/assets/logo.jpg">
        
        </div>
    </div>
</template>


<script>
    import jwt_decode from 'jwt-decode';
    import axios from 'axios';
    export default {
        data:function(){
            return{
                user:{
                    username:"",
                    password:"",
                    perfil:""
                }
            }
        },
        methods:{
            processLogInUser: function(){
                axios.post("https://hospital-g52-4-be.herokuapp.com/login/",this.user, {header:{}})
                .then((result)=>{
                    let dataLogIn={
                        username: this.user.username,
                        token_access: result.data.access,
                        token_refresh: result.data.refresh,
                    } 
                
                    let userId= jwt_decode(dataLogIn.token_access).user_id.toString();

                    axios.get(`https://hospital-g52-4-be.herokuapp.com/ConsultaUsuario/${userId}`)
                    .then((result)=>{
                        let perfil = result.data.perfil
                        this.$emit('completedLogIn', dataLogIn,perfil)  
                    }).catch((error)=>{
                        console.log(error)
                    });
                    
                }).catch((error)=>{
                    console.log(error)
                    if(error.response.status=="401")
                        alert("ERROR 401: Credenciales Incorrectas");
                }
                );
                
            }

        }
    }
    </script>
    

<style>
.logIn_user{
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container_logIn_user {
    border: 2px solid #000000;
    border-radius: 30px;
    width: 40%;
    height: 60%;
    display: flex;
    justify-content: space-between;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.logIn_user form{
    padding: 30px;
    width: 100%;
}
.logIn_user input{
    height: 30px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 20px;
    padding: 10px 20px;
    margin: 5px 0;
    border: 1px solid #000000;
}
.logIn_user button{
    width: 100%;
    height: 40px;
    color: #E5E7E9;
    background: #2379e9;
    border: 1px solid #E5E7E9;
    border-radius: 5px;
    padding: 10px 25px;
    margin: 5px 0;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}

.logIn_user img{
    
    height: 40%;
    padding: 15% 1%;
    display: flex;
}
.logIn_user button:hover
{
color: #E5E7E9;
background: rgb(10, 108, 116);
border: 1px solid #000000;
}

</style>