<template>
    <div class="signUp_user">
        <div class="container_signUp_user">
            <form v-on:submit.prevent="processSignUp">
                <img src="@/assets/logo.jpg">
                <br>
                <div v-if="this.perfil=='Paciente'">
                    <label id="paciente_direccion"> Direccion:
                        <input type="text" v-model="paciente.direccion" placeholder="Direccion" required>
                    </label>
                    <label id="paciente_ciudad"> Ciudad:
                        <input type="text" v-model="paciente.ciudad" placeholder="Ciudad" required>
                    </label>
                    <label id="paciente_fecha"> Fecha de nacimiento:
                        <input type="text" v-model="paciente.fNacimiento" placeholder="AAAA-MM-DD" required>
                    </label>   
                </div>   
                
                <div v-if="this.perfil=='Medico'">
                    <label id="medico_rol"> Rol:
                        <input type="text" v-model="medico.rol" placeholder="Rol" required>
                    </label>
                    <label id="medico_especialidad"> Especialidad:
                        <input type="text" v-model="medico.especialidad" placeholder="Especialidad" required>
                    </label>   
                </div>
                <div v-if="this.perfil=='Familiar'">
                    <label id="familiar_parentesco"> Parentezco:
                        <input type="text" v-model="familiar.parentesco" placeholder="Parentesco" required>
                    </label>
                    <label id="familiar_correo"> Correo:
                        <input type="E-mail" v-model="familiar.correo" placeholder="Correo" required>
                    </label>   
                    <label id="familiar_paciente"> Paciente:
                        <input type="texto" v-model="familiar.idPaciente" placeholder="Id paciente" required>
                    </label>  
                </div>
                <button type="submit">Registrar</button>       
            </form>    
        </div>
    </div>
</template>

<script>


import jwt_decode from 'jwt-decode';
import axios from 'axios';
export default { 
    data:function(){
        return{
            perfil:localStorage.getItem("regPerfil") ,
            token: localStorage.getItem("regAccess"),
            paciente:{
                perSalud:"1",
                iduser:"",
                fNacimiento:"",
                direccion:"",
                ciudad:"",
            },
            medico:{
                iduser:"",
                rol:"",
                especialidad:""
            },
            familiar:{
                iduser:"",
                idPaciente:"",
                parentesco:"",
                correo:""
            }

        }
    },
    methods:{
        processSignUp:function(){
             let userId= jwt_decode(this.token).user_id.toString();
             this.medico.iduser = userId
             this.paciente.iduser = userId
             this.familiar.iduser = userId
            if(this.perfil == "Paciente"){
                axios.post("https://hospital-g52-4-be.herokuapp.com/Paciente/", this.paciente,{headers:{}})
                .then(()=>{
                    this.$emit('completedSignUp')
                }).catch((error)=>{
                        console.log(error)
                    });
                

            }else if(this.perfil == "Medico"){
                axios.post("https://hospital-g52-4-be.herokuapp.com/personalSalud/", this.medico,{headers:{}})
                .then(()=>{
                    this.$emit('completedSignUp') 
                }) .catch((error)=>{
                        console.log(error)
                    });
                

            }else if(this.perfil == "Familiar"){
                axios.post("https://hospital-g52-4-be.herokuapp.com/Familiar/", this.familiar,{headers:{}})
                .then(()=>{
                    this.$emit('completedSignUp') 
                }).catch((error)=>{
                        console.log(error)
                    });
            }
            
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