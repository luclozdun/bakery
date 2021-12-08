var Animation = {
    ScrollDown: function(cName, cAnimation) {
        const objects = document.getElementsByClassName(cName);
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    entry.target.classList.add(cAnimation);
                }
            });
        });
        objects.forEach(object => {
            observer.observe(object)
        });
    },
    LeftRightDisplay: function(cName1, cName2, param) {
        const objects = document.getElementsByClassName(cName1);
        const objectsNone = document.getElementsByClassName(cName2);
        if(param === true){
            objects[0].style.left = "-100%";
            objectsNone[0].style.display = "block";
            return false;
        }
        objects[0].style.left = "0";
        objectsNone[0].style.display = "none";
        return true;
    },
    LeftRight: (cName1, cName2, param) => {
        const objects = document.getElementsByClassName(cName1);
        const objectNav = document.getElementsByClassName(cName2);
        if(param === true){
            objects[0].style.left = "-100%";
            objectNav[0].style.position = "relative";
            return false;
        }
        objects[0].style.left = "0";
        objectNav[0].style.position = "fixed";
        objectNav[0].style.top = "0";
        return true;
    }
}

export default Animation
