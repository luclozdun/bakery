<template>
    <div class="container-product">
        <div class="product-grid">
            <div class="header">
            </div>
            <div class="main">
                <div class="food">
                    <div class="title">Tortas</div>
                    <div class="products">
                        <div class="card">
                        <div class="img">
                        </div>
                        <div class="cook">
                            <div class="c-title">
                                <p>Tres Leche</p>
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
                            <div class="c-cook special">
                                <div class="c-cook-view">
                                    <div class="cook-carousel">
                                        <div class="cook-img"></div>
                                        <p>Relleno Manjar</p>
                                    </div>
                                    <div class="cook-carousel">
                                        <div class="cook-img"></div>
                                        <p>Mermelada fresa</p>
                                    </div>
                                    <div class="cook-carousel">
                                        <div class="cook-img"></div>
                                        <p>Relleno asdas</p>
                                    </div>
                                    <div class="cook-carousel">
                                        <div class="cook-img"></div>
                                        <p>Relleno asdas</p>
                                    </div>
                                    <div class="cook-carousel">
                                        <div class="cook-img"></div>
                                        <p>Relleno asdas</p>
                                    </div>                                                
                                </div>
                            </div>
                            <div class="c-cook green">
                                <p>S/ 85.00</p>
                            </div>
                        </div>                    
                    </div>
                    </div>
                </div>
                <div class="food">
                    <div class="title">Pie</div>
                    <div class="products">
                        <div class="card">
                        <div class="img">
                        </div>
                        <div class="cook">
                            <div class="c-title">
                                <p>Pie</p>
                            </div>
                            <div class="c-cook">
                                <p>Manzana</p>
                            </div>
                            <div class="c-cook">
                                <p>Mediano</p>
                            </div>
                            <div class="c-cook">
                                <p>Circular</p>
                            </div>
                            <div class="c-cook green">
                                <p>S/ 85.00</p>
                            </div>
                        </div>                    
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
}

div.product-grid div.main div.food div.title{
    font-size: 2em;
    font-family: Poppins-Bold;
    color: var(--second);
    
}

div.product-grid div.main div.products{
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
}

div.product-grid div.main div.card{
    padding: 0.5rem 0;
    grid-column: span 2;
    font-family: Poppins-Regular;
    box-shadow: 0px 0px 2px 0px var(--primary);
    display: flex;
    flex-direction: row;
    position: relative;
    border-radius: 5px;
}

div.product-grid div.main div.card div.c-title{
    margin: 0 0 0.6em 0;
    font-size: 1.3rem;
    font-family: Poppins-Bold;
    text-align: center;
}

div.product-grid div.main div.card div.cook{
    width: 100%;
    height: auto;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

div.product-grid div.main div.card div.c-cook{
    width: 80%;
    font-size: 0.8rem;
    background: #f9f1ff;
    border-radius: 0.5em;
    margin: 0.5em 0 0 0;
    padding: 0.5em 0.2em;
    text-align: center;
    margin: 10px auto 0 auto;
    position: relative;
}

div.product-grid div.main div.card div.c-cook.special{
    padding: 0;
    overflow:auto;
}

div.product-grid div.main div.card div.c-cook.special div.c-cook-view{
    white-space: nowrap;
    padding: 1.3em 0;
}

div.product-grid div.main div.card div.c-cook.special div.cook-carousel{
    display: inline-flex;
    flex-direction: column;
    width: 72px;
    font-size: 0.65rem;
    
}

div.product-grid div.main div.card div.c-cook.special div.cook-carousel div.cook-img{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--primary);
    margin: 0 auto;
}

div.product-grid div.main div.card div.c-cook.special div.cook-carousel p{
    display: inline;
    white-space:normal;
}

div.product-grid div.main div.card div.c-cook.green{
    background: rgb(18, 221, 18);
    color: rgb(255, 255, 255);
    font-size: 0.9em;
    font-family: Poppins-Bold;
}

/* width */
div.product-grid div.main div.card div.c-cook.special::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
div.product-grid div.main div.card div.c-cook.special::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
div.product-grid div.main div.card div.c-cook.special::-webkit-scrollbar-thumb {
  background: var(--primary); 
  border-radius: 10px;
}

/* Handle on hover */
div.product-grid div.main div.card div.c-cook.special::-webkit-scrollbar-thumb:hover {
  background: var(--second); 
}

div.product-grid div.main div.card div.img{
    width: 40%;
    height: 100%;
    display: none;
    background: rgb(192, 171, 207);
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

    div.product-grid div.main div.card div.img{
        width: 100%;
        position: absolute;
    }

    
}

</style>