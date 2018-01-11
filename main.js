$(function(){

    var canvas = document.getElementById("paint");
    var ctx = canvas.getContext("2d");
    var paint = false;
    var paint_erase= "paint";
    var container =  $("#container");
    var mouse = {x:0 , y:0};
    ctx.lineWidth =3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    //click inside container
    container.mouseover(function(e){
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x,mouse.y);
    }); 

    //move mouse while holding mouse key
    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;

        if(paint == true){
                if(paint_erase == "paint"){
                   //get color
                    ctx.strokeStyle =$("#paintcolor").val();
                   }else{
                       ctx.strokeStyle= "white";
                   } 
                ctx.lineTo(mouse.x , mouse.y);
                ctx.stroke();
           }
    }); 

    container.mouseup(function(){
        paint = false;
    });
    container.mouseleave(function(){
        paint = false;
    });
    
    // when click on erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase"; 
           }else{
               paint_erase == "paint";
           }
        $(this).toggleClass("eraseMode");
    });
    
    //when click on resst button
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    
    //ON load saved work from local storage
    if(localStorage.getItem("imgCanvas") != null){
       var img = new Image();
        img.onload = function(){
            ctx.drawImage(img, 0, 0);
        }
        img.src= localStorage.getItem("imgCanvas");
       };
    //when click on save button
    $("#save").click(function(){
        if(typeof(localStorage) != null){
            localStorage.setItem("imgCanvas",canvas.toDataURL());
//            window.alert(localStorage.getItem("imgCanvas"));
           }else{
               window.alert("Your browser does not support local storage!");
           }
    });
    
    //change color
    $("#paintcolor").change(function(){
        $("#circle").css("background-color",$(this).val());
    });
    //change linewidth
      $("#slider").slider({
        min:3,
        max:30,
        slide:function(event,ui){
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);   
            ctx.lineWidth = ui.value;
        }
    });
    
    
});