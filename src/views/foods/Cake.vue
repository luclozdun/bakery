<template>
    <div class="container-cake">
        <div class="grid-cake">
            <div class="title">
                <p>Tres Leches</p>
            </div>
            <div class="description">
                <p>Cubierto de Chantylly</p>
                <p>Tamaño Mediano</p>
                <p>Sabor Vainilla</p>
                <p>Delicionas torta de tres leches</p>
            </div>
            <div class="filling">
                <div class="cook">
                    <p>Manjar</p>
                </div>
                <div class="cook">
                    <p>Mermelada</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Cake',
    data(){

    }
}
</script>

<style>
div.container-cake{
    max-width: 1600px;
    height: 50px;
    margin: 0 auto;
}

div.container-cake div.grid-cake{
    display: grid;
}

div.container-cake div.grid-cake div.title{
    font-family: Poppins-Bold;
    font-size: 2rem;
    color: rgb(51, 51, 51);
}

div.container-cake div.grid-cake div.description{
    font-family: Poppins-Regular;
    font-size: 1rem;
    color: rgb(82, 82, 82);
}

div.container-cake div.grid-cake div.filling{
    display: flex;
    font-family: Poppins-Regular;
    font-size: 0.8rem;
}

div.container-cake div.grid-cake div.filling div.cook{
    margin: 0 0.5em 0 0;
    background: var(--primary);
    padding: 0.6em 0.7em;
    border-radius: 2em;
    color: white;
}
</style>