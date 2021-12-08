<template>
    <div class="container-product">
        <div class="product-grid">
            <div class="header">
            </div>
            <div class="main">
                <div class="card">
                    <div class="img">
                    </div>
                    <div class="cook">
                        <div class="c-title">
                            <p>Tres Leches</p>
                        </div>
                        <div class="c-cook">
                            <p>Chantilly</p>
                        </div>
                        <div class="c-cook">
                            <p>Mediano</p>
                        </div>
                        <div class="c-cook">
                            <p>Vainilla</p>
                        </div>
                        <div class="c-cook special" value="0">
                            <div class="c-cook-arrow left"></div>
                            <div class="c-cook-center">
                                <div class="cook-carousel">
                                    <p>Relleno</p>
                                </div>
                                <div class="cook-carousel">
                                    <p>Relleno1</p>
                                </div>
                                <div class="cook-carousel">
                                    <p>Relleno2</p>
                                </div>
                            </div>                            
                            <div class="c-cook-arrow right"></div>
                        </div>
                    </div>                    
                </div>
                <div class="card">
                    <div class="img">
                    </div>
                    <div class="cook">
                        <div class="c-title">
                            <p>Tres Leches</p>
                        </div>
                        <div class="c-cook">
                            <p>Chantilly</p>
                        </div>
                        <div class="c-cook">
                            <p>Mediano</p>
                        </div>
                        <div class="c-cook">
                            <p>Vainilla</p>
                        </div>
                        <div class="c-cook special" value="0">
                            <div class="c-cook-arrow left"></div>
                            <div class="c-cook-center">
                                <div class="cook-carousel">
                                    <p>Relleno</p>
                                </div>
                                <div class="cook-carousel">
                                    <p>Relleno1</p>
                                </div>
                                <div class="cook-carousel">
                                    <p>Relleno2</p>
                                </div>
                            </div>                            
                            <div class="c-cook-arrow right"></div>
                        </div>
                    </div>                    
                </div>
                <div class="card">
                    <div class="img">
                    </div>
                    <div class="cook">
                        <div class="c-title">
                            <p>Tres Leches</p>
                        </div>
                        <div class="c-cook">
                            <p>Chantilly</p>
                        </div>
                        <div class="c-cook">
                            <p>Mediano</p>
                        </div>
                        <div class="c-cook">
                            <p>Vainilla</p>
                        </div>
                        <div class="c-cook special" value="0">
                            <div class="c-cook-arrow left"></div>
                            <div class="c-cook-center">
                                <div class="cook-carousel">
                                    <p>Relleno</p>
                                </div>
                                <div class="cook-carousel">
                                    <p>Relleno1</p>
                                </div>
                                <div class="cook-carousel">
                                    <p>Relleno2</p>
                                </div>
                            </div>                            
                            <div class="c-cook-arrow right"></div>
                        </div>
                    </div>                    
                </div>
            </div>
            <div class="sidebar">
                <div class="filter-container">
                    <div class="filter">
                        <p>Empanadas</p>
                    </div>
                    <div class="filter">
                        <p>Tortas</p>
                    </div>
                    <div class="filter">
                        <p>Bocaditos</p>
                    </div>
                    <div class="filter">
                        <p>Tartas</p>
                    </div>
                    <div class="filter">
                        <p>Meriendas</p>
                    </div>
                    <div class="filter">
                        <p>Kekes</p>
                    </div>
                    <div class="filter">
                        <p>Panes</p>
                    </div>
                    <div class="filter">
                        <p>Butidos</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    
    name: 'Products',
    data() {
        return{
            id: Number
        }
    },
    methods: {
        
        getData(){
            this.id = 5;
        },
    },
    mounted() {
        this.getData();
    }
}
</script>

<style>
div.container-product{
    margin: 0 auto;
    width: 90%;
}

div.product-grid{
    display: grid;
    grid-template: 
    "header header" 0px
    "sidebar main" auto/
    250px auto;
}

div.product-grid div.header{
    grid-area: header;   
    background: lightblue;
}

div.product-grid div.main{
    grid-area: main;
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
}

div.product-grid div.main div.card{
    grid-column: span 2;
    font-family: Poppins-Regular;
    box-shadow: 0px 0px 2px var(--primary);
    display: flex;
    flex-direction: row;
}

div.product-grid div.main div.card div.c-title{
    margin: 0.6em 0;
    font-size: 1rem;
    text-align: center;
}

div.product-grid div.main div.card div.cook{
    flex: 1.8;
    height: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

div.product-grid div.main div.card div.c-cook{
    width: 70%;
    font-size: 0.8rem;
    background: rgb(237, 216, 255);
    border-radius: 0.5em;
    margin: 0.5em 0 0 0;
    padding: 0.5em 0.2em;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

div.product-grid div.main div.card div.c-cook.special{
    height: 50px;
    padding: 0;
}

div.product-grid div.main div.card div.c-cook div.c-cook-arrow{
    width: 20px;
    height: 100%;
    position: absolute;
    background: palegreen;
}

div.product-grid div.main div.card div.c-cook .left{
    left: 0;
}

div.product-grid div.main div.card div.c-cook .right{
    right: 0;
}

div.product-grid div.main div.card div.c-cook div.c-cook-center{
    width: 100%;
    height: 100%;
    display: inline-block;
    word-break: keep-all;
}

div.product-grid div.main div.card div.c-cook div.c-cook-center div{
    width: 100%;
    height: 100%;
    align-items: center;
    display: none;    
    justify-content: center;  
}

div.product-grid div.main div.card div.c-cook div.c-cook-center div p{
    width: 70%;
}

div.product-grid div.main div.card div.img{
    flex: 1;
    height: 100%;
    background: rgb(255, 218, 218);
}

div.product-grid div.sidebar{
    grid-area: sidebar;
    background: var(--background-opacity);
    display: flex;
    justify-content: center;
    margin: 0 20px 0 0; 
}

div.product-grid div.sidebar div.filter-container{
    width: 80%;
}

div.filter-container div.filter{
    cursor: pointer;
    font-family: Poppins-Regular;
    color: var(--title);
}

div.filter-container div.filter p{
    font-size: 1rem;
    padding: 0.8em 0;
}

div.filter-container div.filter:active{
   color: var(--primary);
}

div.filter-container div.filter::after{
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background: var(--background1);
}

div.filter-container div.filter:last-child::after{
    display: none;
}

@media (max-width: 900px) {
    
    div.product-grid{
        display: grid;
        grid-template: 
        "header" 0px
        "main" auto/
        auto;
    }

    div.product-grid div.sidebar{
        display: none;
    }

    
}

@media (max-width: 410px) {
    div.product-grid div.main{
        grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    }    
}

</style>