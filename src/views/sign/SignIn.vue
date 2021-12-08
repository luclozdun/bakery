<template>
    <div>
    <div class="signup">
        <div class="signup-social">
            <div class="singup-center">
                <div class="signup-social-title">
                    <h3>Bienvenido al Registro</h3>
                </div>
                <div class="signup-social-desc">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis condimentum velit. Praesent sed mauris a ipsum interdum aliquam ut vel tortor.</p>
                </div>
                <div class="signup-social-action">
                    <button class="facebook">Facebook</button>
                </div>
                <div class="signup-social-action">
                    <button class="google">Google</button>
                </div>   
                <div class="signup-social-action">
                    <button class="outlook">Outlook</button>
                </div>                    
            </div>                    
        </div>
        <div class="signup-normal" id="signup-normal">
            <div class="signup-action">
                <h1>Register</h1>
            </div>
            <div class="signup-action">
                <input placeholder="Nombre">
            </div>
            <div class="signup-action">
                <input placeholder="Apellido">
            </div>
            <div class="signup-action">
                <input placeholder="Usuario">
            </div>
            <div class="signup-action">
                <input placeholder="Correo">
            </div>
            <div class="signup-action">
                <input placeholder="Contraseña">
            </div>
            <div class="signup-action">
                <div class="date">
                    <input class="year" placeholder="Año">
                    <input class="month" placeholder="Mes">
                    <input class="day" placeholder="Dia">
                </div>
            </div>
            <div class="signup-action">
                <button class="signup">Crear Cuenta</button>
            </div>
        </div>                
    </div>
</div>
</template>

<script>
export default{
    name: 'SignIn'
}
</script>

    
<style>
    div.signup{
    width: 1000px;
    margin: 100px auto 100px auto;
    border-radius: 20px;
    display: flex;
}

div.singup-center{
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

div.signup-social-title{
    width: 90%;
    display: flex;
    justify-content: center;
    font-size: 2.3rem;
    margin: 1em 0px;
    font-family: Poppins-Bold;
    text-align: center;
    color: var(--primary-inten);
}

div.signup-social-desc{
    margin: 1.4rem 0;
    display: flex;
    text-align: justify;
    font-family: Poppins-Regular;
    color: var(--primary-subinten);
    font-size: 1.1rem;
}

div.signup-social{
    flex: 1;
    align-items: center;
    display: flex;
    margin: 0px 20px;
}

div.signup-social > div.singup-center > div.signup-social-action{
    width: 100%;
}

div.signup-social > div.singup-center > div.signup-social-action > button{
    font-size: 1rem;
    padding: 0.8em 0;
    margin-top: 1.2em;
    color: var(--default);
    border: none;
    cursor: pointer;
    border-radius: 7px;
    width: 90%;
}

div.signup-social > div.singup-center > div.signup-social-action > button.facebook{
    background: #3B5998;
}

div.signup-social > div.singup-center > div.signup-social-action > button.google{
    color: #1778F2;
    background: white;
    border: 2px solid #1778F2;
}

div.signup-social > div.singup-center > div.signup-social-action > button.outlook{
    background: #1778F2;
}

div.signup-social > div.singup-center > div.signup-social-action > button.facebook:active{
    background: #5473b6;
}

div.signup-social > div.singup-center > div.signup-social-action > button.google:active{
    background: #1778F2;
    color: white;
}

div.signup-social > div.singup-center > div.signup-social-action > button.outlook:active{
    background: #60a7ff;
}

div.signup-normal{
    flex: 1;
    background: var(--background-opacity-aux);
    border-radius: 20px;
}

div.signup-normal > div.signup-action, div.signup-social > div.singup-center > div.signup-social-action{
    display: flex;
    justify-content: center;
    flex: 1;
}

div.signup-normal > div.signup-action > h1{
    font-size: 2.3rem;
    margin: 1em 0;
    font-family: Poppins-Medium;
    color: var(--primary-inten);
}

div.signup-normal > div.signup-action > input::placeholder,
div.signup-normal > div.signup-action > div.date > input::placeholder{
  color: var(--placeholder-second);
}

div.signup-normal > div.signup-action > input{
    border: 1px solid var(--input-box);
    color: var(--second);
    flex: 0.8;
    margin: 0.8em 0;
    padding: 0.6em 0.5em;
    border-radius: 5px;
    font-size: 1.1rem;
    font-family: Poppins-Bold;
}

div.signup-normal > div.signup-action > div.date{
    flex: 0.8;
    display: flex;
    justify-content: space-between;
}

div.signup-normal > div.signup-action > div.date > input{
    border: 1px solid var(--input-box);
    margin: 0.5em 0;
    padding: 0.5em;
    border-radius: 5px;
    width: 60px;
    color: #FF6767;
    font-size: 1rem;
    font-family: Poppins-Bold;
}

div.signup-normal > div.signup-action > input:focus, div.signup-normal > div.signup-action > div.date > input:focus   {
    box-shadow: 0px 0px 2px var(--input-box);
}

div.signup-normal > div.signup-action > button.signup{
    padding: 0.6em 0.4em;
    margin: 0.8em 0 0.9em 0;
    font-size: 1.2rem;
    background: var(--succesful);
    border: none;
    color: white;
    cursor: pointer;
    flex: 0.8;
    border-radius: 10px;
}

div.signup-normal > div.signup-action > button.signup:active{
    background: var(--succesful-active);
}

@media screen and (max-width: 1024px) {
    div.signup{
        width: 90%;
        flex-direction: column;
    }

    div.signup-social-title{
        display: flex;
        justify-content: center;
        font-size: 35px;
        margin: 5px 0px;
    }

    div.signup-social-desc{
        text-align: center;
        margin: 25px 0px;
        font-size: 18px;
    }

    div.signup > div.signup-action > div.date > input{
        width: 35px;
    }

    div.signup-normal{
        margin: 20px 0px;        
    }

    div.signup-normal > div.signup-action > h1{
    font-size: 30px;
    }

    div.signup-normal > div.signup-action > div.date > input{
        width: 50px;
    }

    div.signup-social > div.singup-center > div.signup-social-action > button{
    width: 100%;
}
}
</style>