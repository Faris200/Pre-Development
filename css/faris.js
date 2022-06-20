var grid = document.querySelector('.grid');
var special = document.querySelector('.special');
var items = document.querySelectorAll('.grid>div');


// we mix
for (var i = grid.children.length; i >= 0; i--) {
    grid.appendChild(grid.children[Math.random() * i | 0]);
}

// we place in x and y
TweenMax.set('.grid>div',{
  x:function(i){return i%4 * 100},
  y:function(i){return Math.floor(i/4) * 100}
})

// pythagoras theorem
function distance(r1,r2){
  var a = r1.x - r2.x;
  var b = r1.y - r2.y;
  return Math.sqrt( a*a + b*b );
}

// Add the click
grid.addEventListener('click',function(e){
  // if its an item
  if(e.target.className === 'item'){
    let sRect = special._gsTransform; // recuperate the x and y of the gsap of special
    let tRect = e.target._gsTransform; // x, y… of the block click
    if(distance(sRect,tRect)<=100){
      // the empty will go to the box
      TweenMax.to('.special',.2,{
        x:tRect.x,
        y:tRect.y
      });
      // the inverse
      TweenMax.to(e.target,.2,{
        x:sRect.x,
        y:sRect.y, 
        onComplete : checkLaWin // To test whether the puzzle is finish
      });
    } // end of if distance
  } // end of if target
});

function checkLaWin(){
  var score = 0
  for(var i = 0;i<items.length;i++){
    if(
   items[i]._gsTransform.x === i%4 * 100 &&
   items[i]._gsTransform.y === Math.floor(i/4) * 100
    ){ 
      score++; 
    }
  }
  if(score===16){
     var tl = new TimelineMax();
     tl.fromTo('.win',.4,{opacity:0,scale:0},{opacity:1,scale:1});
      tl.staggerTo('.grid>div', 2, {
    opacity:0,
    rotation:function(){return Math.random()*720},
    x: function(){ return Math.random()*1000+1000*((Math.random()>0.5)?-1:1) },
    y: function(){ return Math.random()*1000+1000*((Math.random()>0.5)?-1:1)},
    ease: Power4.easeOut
  },0.01); 
  }
}