<template>
    <div class="signUp_user">
        <div class="container_signUp_user">
            <form v-on:submit.prevent="processSignUp">
                <img src="@/assets/logo.jpg">
                <br>
        
                <label id="user_username"> Usuario:
                    <input type="text" v-model="user.username" placeholder="Usuario" required>
                </label>
                <label id="user_password"> Password:
                    <input type="password" v-model="user.password" placeholder="Contraseña" required>
                </label>
                <label id="user_name"> Nombre completo:
                    <input type="text" v-model="user.name" placeholder="Nombre completo" required>
                </label>
                <label id="user_perfil"> Perfil:
                    <br>
                    <select id="cajon1" v-model="user.perfil" required>
                        <option>Paciente</option>
                        <option>Familiar</option>
                        <option>Medico</option>
                    </select>
                </label>
                <br>
                <label id="user_telefono"> Telefono:
                    <input type="text" v-model="user.telefono" placeholder="Telefono" required>
                </label>
                <label id="genero">Genero:
                    <br>
                    <select id="cajon2" v-model="user.genero" required>
                        <option>masculino</option>
                        <option>femenino</option>
                    </select>
                </label>
                <button type="submit">Registrar</button>
            </form>    
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default { 
    data:function(){
        return{
            user:{
                username:"",
                password:"",
                perfil:"",
                name:"",
                telefono:"",
                genero:""
            }
        }
    },
    methods:{
        processSignUp:function(){
            axios.post("https://hospital-g52-4-be.herokuapp.com/user/", this.user,{headers:{}})
            .then((result)=>{
                localStorage.setItem( "regAccess",result.data.access)
                localStorage.setItem("regPerfil",this.user.perfil)
                alert("registro en progreso")
                this.$router.push({name:"signUp2"})
            })
        }
    }
}
</script>

<style>

.signUp_user{
    margin: 0;
    padding: 5% 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.container_signUp_user {
    border: 3px solid #000000;
    border-radius: 10px;
    width: 40%;
    height: 85%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.signUp_user h2
{
    color: #080808;
    
}
.signUp_user form
{
    width: 70%;
    padding: 10%;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
}
.signUp_user input
{
    height: 40px;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 20px;
    margin: 8px;
    border: 1px solid #000000;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    border-radius: 20px;
}
.signUp_user button
{
    width: 100%;
    height: 40px;
    color: #E5E7E9;
    background: #2379e9;
    border: 1px solid #E5E7E9;
    border-radius: 20px;
    padding: 10px 25px;
    margin: 20px 8px;
}

.signUp_user button:hover
{
    color: #E5E7E9;
    background: rgb(10, 108, 116);
    border: 1px solid #000000;
}
.signUp_user select{
    width: 100%;
    border-radius: 20px;
    height: 40px;
    border: 1px solid #000000;
    margin: 10px 8px;
    padding: 10px 20px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

</style>