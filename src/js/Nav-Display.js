var nav = document.getElementById("nav");
var card_menu = document.getElementsByClassName("menu")
var space = document.getElementsByClassName("space");

var active = false;
var height;

cal_height(60,3);

function active_nav(){
    if(active == false){
        var animation = setInterval(start, 1);
        var tem_height = 0;
        nav.style.display = "flex";
        function start(){
            if(tem_height >= height){
                nav.style.height = height + "px";
                active = true;
                clearInterval(animation);
            }else{
                tem_height = tem_height + 2;
                nav.style.height = tem_height + "px";
            }
        }
    }

    else{
        var animation = setInterval(start, 1);
        var tem_height = height;
        function start(){
            if(tem_height <= 0){
                nav.style.display = "none";
                nav.style.height = "0px";
                active = false;
                clearInterval(animation);
            }else{
                tem_height = tem_height - 2;
                nav.style.height = tem_height + "px";
            }
        }
    }
}

function cal_height(height_menu, height_space){
    height = card_menu.length * height_menu + space.length * height_space;
}