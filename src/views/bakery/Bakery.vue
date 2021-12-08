<template>
    <div>
    <div class="search-location">
            <input placeholder="buscar por locacion">
    </div>
    <div class="bakeries" v-for="bakery in bakeries" :key="bakery.id">
        <div class="card-bakery">
            <div class="card-bakery-icon">
                <div>

                </div>
            </div>
            <div class="card-bakery-desc">
                <p class="title">{{ bakery.name }}</p>
                <p class="desc">{{ bakery.desc }}</p>
                <p class="desc">Costo: {{ bakery.cost }}</p>
                <p class="desc">Ubicacion: {{ bakery.location }}</p>
                <div class="option">
                    <router-link :to="{name: 'Product', params: { id: bakery.id }}">
                        <button class="first">Visualizar Carta</button>
                    </router-link>
                    <router-link :to="{name: 'Product', params: { id: bakery.id }}">
                        <button class="second">Reservar pedido</button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default{
    name: 'Bakery',
    data(){
        return{
            bakeries: Array
        }
    },
    methods: {
        values(){
            let localdata = this;
            localdata.bakeries = [
                {id: 1, name: 'San Benito', desc: 'Somos una pasteleria con productos naturales', cost: '$$', location: 'Jr. Asamblea 475'},
                {id: 2, name: 'Veganito', desc: 'Pasteleria vegana', cost: '$$$', location: 'Av. Acapulco 354'}
            ]
        }
    },
    mounted() {
        this.values();
    }
}
</script>


<style>
div.search-location{
    width: 100%;
    height: 70px;
    background: hsl(249, 100%, 80%);
    display: flex;
    align-items: center;
}

div.search-location > input{
    padding: 10px 8px 10px 8px;
    border-radius: 25px;
    margin-left: 50px;
}

div.bakeries{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 0px 0px 0px;
}

div.card-bakery{
    width: 900px;
    height: 100%;
    box-shadow: 0px 0px 2px var(--box1);
    background: white;
    border-radius: 30px;
    padding: 10px 0px;
    display: flex;
}

div.card-bakery-icon{
    display: flex;
    flex: 0.25;
    justify-content: center;
}

div.card-bakery-icon > div{
    margin-top: 50px;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: rgb(255, 182, 182);
}

div.card-bakery-desc{
    display: flex;
    flex: 1;
    flex-direction: column;
}

div.card-bakery-desc p.title{
    font-size: 30px;
    color: var(--title);
    font-family: Poppins-Bold;
    margin: 5px 0px;
}

div.card-bakery-desc p.desc{
    color: var(--subtitle);
    margin: 6px 0px 0px 8px;
    font-size: 16px;
    font-family: Poppins-Regular;
}

div.card-bakery-desc div.option{
    width: 100%;
    margin-top: 40px;
    display: flex;
    justify-content: space-evenly;
}

div.card-bakery-desc div.option a{
    width: 29%;
    z-index: 5;
}

div.card-bakery-desc div.option a button{
    border: none;
    border-radius: 5px;
    width: 100%;
    font-size: 20px;
    padding: 12px 0px;
    color: white;
    font-weight: bold;
    cursor: pointer;
}

div.card-bakery-desc div.option button.first{
    background: var(--special1-btn);
}

div.card-bakery-desc div.option button.second{
    background: var(--special2-btn);
}

div.card-bakery-desc div.option a:active button.first{
    background: var(--special1-btn-active);
}

div.card-bakery-desc div.option a:active button.second{
    background: var(--special2-btn-active);
}

div.card-bakery-desc > div.point{
    display: flex;
    justify-content: center;
    height: 50px;
    margin-top: 15px;
}

@media screen and (max-width: 900px) {
    div.card-bakery{
        width: 90%;
        height: 100%;
        padding-bottom: 25px;
    }
    div.card-bakery-icon{
        width: 90%;
        position: absolute;
        margin-top: 15px;
    }
    div.card-bakery-desc p.title{
        text-align: center;
        margin-bottom: 150px;
        font-size: 35px;
    }
    div.card-bakery-desc{
        width: 50%;
    }
    div.card-bakery-desc p.desc{
        text-align: center;
        font-size: 16px;
        margin: 0px 15px;
    }
}

@media (max-width: 650px) and (min-width: 0px){
    div.search-location{
        display: flex;
        justify-content: center;
    }

    div.search-location input{
        margin: 0;
    }

    div.card-bakery-desc > div.option{
        flex-direction: column;
        align-items: center;
    }

    div.card-bakery-desc div.option a{
        width: 80%;
        margin: 10px 0px;
    }
}

</style>