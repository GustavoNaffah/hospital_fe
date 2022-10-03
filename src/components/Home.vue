<template>
    <div class="greetings">
        <h1>¡Bienvenido <span class ="perfil">{{perfil}}</span> <span>{{username}}</span>!</h1>
    </div>
</template>

<script>
export default {
    data:function(){
        return{
            username: localStorage.getItem('username') || "none",
            perfil: localStorage.getItem('perfil') || "none"
        }
        
    }

}
</script>

<style>
.greetings{
    margin: 0;
    padding: 0%;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.greetings h1{
    font-size: 50px;
    color: #000000;
}
.greetings span{
    color: rgb(0, 0, 0);
    font-weight: bold;
}

</style>