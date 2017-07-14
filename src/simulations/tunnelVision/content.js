    var span = document.createElement('span');
    span.setAttribute('id', 'circle'); 
    document.body.appendChild(span); 

      document.onmousemove = moveCircle; 
      function moveCircle(e) {
        var circle = document.getElementById('circle'); 
        console.log(circle); 
        circle.style.left = e.pageX;
        circle.style.top = e.pageY;
      }

//circle.style.top = '100px' funkar. Hur göra med e.pageX? 

//jquery: 
/*    $(this).mousemove(function(e){
      console.log('fredag'); 
      $(".circle").css({left:e.pageX, top:e.pageY});
    });*/