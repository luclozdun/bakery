<template>
    <div>
        <div class="container-addlocation">
            <div class="profile-title">
                <Title name="Añade los puntos de entrega"/>
            </div>
            <div class="container-card">
                <div class="card-addlocation">

                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import Title from '../../../components/Title.vue';

export default{
    name: 'AddLocation',
    components: { Title }
}
</script>


<style>

div.container-card{
    width: 100%;
    display: flex;
    justify-content: center;
}

div.card-addlocation{
    width: 80%;
    height: 20px;
    box-shadow: 0px 0px 5px black;
}
</style>