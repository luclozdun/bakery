<template>
    <div class="container-privacy">
        <div class="privacy">
            <div class="profile-title">
                <p>Informacion Personal</p>
            </div>
            <div class="privacy-data">
                <table>
                    <tr>
                        <th><p>Nombre</p></th>
                        <td><p>Luciano Mardonio</p></td>
                        <td><div class="icon icon-edit"></div></td>
                    </tr>
                    <tr>
                        <th><p>Apellido</p></th>
                        <td><p>Lopez Duran</p></td>
                        <td><div class="icon icon-edit"></div></td>
                    </tr>
                    <tr>
                        <th>Contraseña</th>
                        <td>Polerro</td>
                        <td><div class="icon icon-edit"></div></td>
                    </tr>
                    <tr>
                        <th><p>Numero Celular</p></th>
                        <td><p>920002664</p></td>
                        <td><div class="icon icon-edit"></div></td>
                    </tr>
                    <tr>
                        <th><p>Correo</p></th>
                        <td><p>lucianolopez4asdasdsa000@hotmail.com</p></td>
                        <td><div class="icon icon-edit"></div></td>
                    </tr>                    
                    <tr>
                        <th>Fecha de Nacimiento</th>
                        <td><p>3 de junio del 2020</p></td>
                        <td><div class="icon icon-edit"></div></td>
                    </tr>
                </table>
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
div.privacy-data{
    margin: 20px 0px;
    display: flex;
    justify-content: center;
}

div.privacy-data table{
    border-spacing: 0px 15px;
}

div.privacy-data tr{
    margin-top: 20px;
    background: var(--background-opacity);
}

div.privacy-data th,
div.privacy-data td{
    padding: 0px 20px;
    color: var(--title);
}

div.privacy-data th{
    text-align: end;
    padding-right: 5px;
    border-start-start-radius: 15px;
    font-family: Poppins-Bold;
    font-size: 18px;
}

div.privacy-data td:last-child{
    border-end-end-radius: 15px;
}

div.privacy-data td{
    font-family: Poppins-Light;
    font-size: 18px;
}

div.privacy-data td div{
    cursor: pointer;
    height: 30px;
    padding: 10px 0px;
    width: 30px;
}

div.privacy-data td p{
    display: inline-block;
}

@media (max-width: 750px){
    
    div.privacy-data table{
        display: block;
        width: 100%;
    }

    div.privacy-data tr{
        
        width: 100%;
        margin-top: 20px;
        display: block;
    }

    div.privacy-data th{
        display: block;
        text-align: center;
        font-size: 16px;
        padding: 0;
    }

    div.privacy-data td{
        padding: 0px 5px;
        overflow: auto;
        font-size: 16px;
        text-align: center;
        display: block;
    }

    div.privacy-data td:last-child{
        display: none;
    }
}
</style>