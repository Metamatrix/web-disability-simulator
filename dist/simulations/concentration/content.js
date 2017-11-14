console.log('this is the concentration script!'); 


(function(){

  const circle = document.createElement('div'); 

  circle.setAttribute('id', 'wds-concentrationCircle');
    
  document.body.appendChild(circle); 

  var leftposition = 0

  function moveCircle(timestamp){
      leftposition += 5
      circle.style.bottom = leftposition + 'px'
      requestAnimationFrame(moveCircle); 
  }

  requestAnimationFrame(moveCircle);

})()