<template>
    <div>
        <div class="container-surprise">
            <div class="profile-title">
                <p>Sorprendete por cada compra realizada{Mejorar Lema}</p>
            </div>
            <div class="suprise-text">
                <p>Por cada compra obtienes tu ticket para participar en los sorteos diarios, semanales y anuales</p>
                <p>Participa y gana comprando tu keke o algo ya se ve{Mejorar dicho}</p>
            </div>
            <div class="surprise-time">
                <div class="suprise-time-title">
                    <p>Ganadores semanales</p>
                </div>
                <div class="img">
                </div>
            </div>
            <div class="surprise-time">
                <div class="suprise-time-title">
                    <p>Ganadores mensuales</p>
                </div>
                <div class="img">
                </div>
            </div>
            <div class="surprise-time">
                <div class="suprise-time-title">
                    <p>Ganadores anuales</p>
                </div>
                <div class="img">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    name: 'Privacy'
}
</script>


<style>
div.container-surprise div.suprise-text{
    margin-top: 25px;
    font-size: 18px;
    font-family: Poppins-Medium;
    color: var(--text);
}

div.container-surprise div.surprise-time{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0px 0px;
}

div.container-surprise div.surprise-time div.img{
    width: 450px;
    height: 150px;
    background: var(--background-opacity);
}

div.container-surprise div.surprise-time div.suprise-time-title{
    color: var(--subtitle);
    font-size: 23px;
    font-family: Poppins-Bold;
}
</style>