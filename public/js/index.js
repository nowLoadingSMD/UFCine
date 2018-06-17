var aux2 = 0, aux4 = 0;
function image1() {  
    document.images["logo"].src = "../img/logo/logoAnimate01.png";  
    setTimeout(image2, 1500);
}
function image2() {  
    document.images["logo"].src = "../img/logo/logoAnimate02.png";
    aux2++;
    if(aux2 == 1 || aux2 == 3){
        setTimeout(image3, 1000);
    }
    else{
        setTimeout(image4, 1000);
    }
}
function image3() {  
    document.images["logo"].src = "../img/logo/logoAnimate03.png"; 
    setTimeout(image2, 1500); 
}
function image4() {  
    document.images["logo"].src = "../img/logo/logoAnimate04.png";  
    aux4++;
    if(aux4<2){
        setTimeout(image2, 1500);
    }
    else{
        setTimeout(image1, 1500);
        aux4 = 0;
    }
    
}

setTimeout(image1, 0);
