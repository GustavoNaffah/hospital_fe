<template>
    <h1>Información de tú cuenta</h1>
    <div >
        <h2> Nombre: <span>{{name}}</span></h2>
        <h2> Perfil: <span>{{perfil}} </span></h2>
        <h2> Telefono: <span>{{telefono}}</span></h2>
        <h2> Genero: <span>{{genero}}</span></h2>
    </div>
  </template>
  
  <script>
  import jwt_decode from 'jwt-decode';
  import axios from 'axios';
  export default {
      data:function(){
          return{
            name: "",
            perfil: "",
            telefono: "",
            genero: "",
            loaded: true,
          }
      },
      methods:{
            getData: async function(){
                if(localStorage.getItem("token_access")===null || localStorage.getItem("token_refresh")===null){
                    this.$emit('logOut');
                    return;
                }
                await this.verifyToken();
                let token= localStorage.getItem("token_access");
                let userId= jwt_decode(token).user_id.toString();
                axios.get(`https://hospital-g52-4-be.herokuapp.com/ConsultaUsuario/${userId}`)
                .then((result)=>{
                    console.log(result)
                    this.name= result.data.name;
                    this.perfil= result.data.perfil;
                    this.telefono= result.data.telefono;
                    this.genero= result.data.genero;
                    this.ciudad= result.data.paciente.ciudad;
                }).catch((error)=>{ 
                });
            },
            verifyToken:function(){
                return axios.post("https://hospital-g52-4-be.herokuapp.com/refresh/",{refresh: localStorage.getItem("token_refresh")},{headers:{}})
                .then((result)=>{
                    localStorage.setItem("token_access",result.data.access);
                }).catch(()=>{
                    this.$emit('logOut');
                });
            }, 
        },
        created: async function(){
          this.getData();
    } 
  }
  </script>
  
  <style>
  .information{
  margin: 0;
  padding: 0%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }
  .information h1{
  font-size: 60px;
  color: #0f1316;
  }
  .information h2{
  font-size: 40px;
  color: #000000;
  }
  .information span{
  color: crimson;
  font-weight: bold;
  }
  </style>