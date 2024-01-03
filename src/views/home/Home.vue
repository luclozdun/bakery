<template>
    <div>
        <div class="container">
            <div class="card-principal">
                <img>
                <div class="card-desc">
                    <p>Pasterleria a la vuelta de la casa</p>
                    <input placeholder="buscar mi distrito">
                </div>
            </div>
            <div class="card-space">
                <div class="space"></div>
                <div class="img">
                </div>
                <div class="space"></div>
            </div>
            <div class="gallery">
                <div class="food">
                    <img src="../../img/food/nibbles.jpg">
                    <p>Bocaditos</p>
                </div>
                <div class="food">
                    <img src="../../img/food/cake.jpg">
                    <p>Tortas</p>
                </div>
                <div class="food">
                    <img src="../../img/food/empanadas.jpg">
                    <p>Empanadas</p>
                </div>
                <div class="food">
                    <img src="../../img/food/pie.png">
                    <p>Tartas</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: 'Home'
}
</script>

<style>
div.container{
    width: 1500px;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

div.card-principal{
    margin-top: 50px;
    width: 100%;
    height: 600px;
    margin-bottom: 20px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: init-card-home 1.5s;
}

@keyframes init-card-home {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}

div.card-principal img{
    width: 100%;
    height: 100%;
    background: linear-gradient(rgba(0, 0, 0, 0.27),rgba(0, 0, 0, 0.27)),  url('../../img/bakery.jpg');
}

div.card-principal div.card-desc{
    position: absolute;
    width: 300px;
    display: flex;
    align-items: center;
    flex-direction: column;    
}

div.card-principal div.card-desc p{
    text-align: center;    
    font-size: 24px;
    color: var(--default);
}

div.card-principal div.card-desc input{
    margin: 20px 0px;
    width: 70%;
    padding: 0.5em 0.6em;
    border-radius: 20px;
    font-size: 1rem;
    background: var(--default);
}

div.card-space{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
}

div.card-space div.space{
    width: 40%;
    height: 7px;
    border-radius: 5px;
    background: var(--line-block);
}

div.card-space div.img{
    width: 45px;
    height: 45px;
    margin: 0px 20px;
    background: black;
}

div.container div.gallery{
    width: 80%;
    display: grid;
    gap: 30px 60px;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px),1fr));
    grid-auto-rows: 260px;
    position: relative;
    z-index: 10;
}

div.container div.gallery div.food{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}

div.container div.gallery div.food:hover img{
    transform: scale(1.2);
    transition: transform 0.5s;
}

div.container div.gallery div.food img{
    transition: transform 0.5s;
    width: 100%;
    height: 100%;
    z-index: 10;
    filter: brightness(51%);
    -webkit-filter: brightness(51%);
    -moz-filter: brightness(51%);
}

div.container div.gallery div.food p{
    color: var(--default);
    font-size: 26px;
    position: absolute;
    z-index: 11;
}

@media screen and (max-width: 1520px) {
    div.container{
        width: 100%;
    }
}

@media screen and (max-width: 600px) {
    div.card-principal div.card-desc{
        width: 95%;
    }

    div.card-principal div.card-desc p{
        font-size: 1.2rem;
    }

    div.container div.gallery{
        width: 90%;
        gap: 20px 10px;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px),1fr));
        grid-auto-rows: 160px;
        position: relative;
        z-index: 5;
    }
}

</style>