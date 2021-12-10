import kaboom from "kaboom";

// initialize context
kaboom();

// load assets
loadSprite("3", "sprites/3.png");
loadSprite("ek","sprites/ek1.png");


scene("game",()=>{
  gravity(2400);

  // add a character to screen
  const amu = add([
    // list of components
    sprite("3"),
    pos(80, 40),
    area(),
    body(),
  ]);

  const ek = add([
    // list of components
    sprite("ek"),
    pos(width(), height() - 48),
    area(),
    body(),
  ]);
  
  //add platform
  add ([
    rect(width(), 48),
    pos(0, height() - 48),
    outline(4),
    area(),
    solid(),
    color(127,200,255),
  ])

  function jump() {
		if (amu.grounded()) {
			amu.jump(800);
		}
	}
  
  onKeyPress("space", jump);
	onClick(jump);

  function spawnTree(){
    add([
      sprite("ek"),
      scale(0.5, rand(0.1, 1)),
      // rect(48, rand(24, 64)),
      area(),
      outline(4),
      pos(width(), height() - 48),
      origin("botleft"),
      // color(255, 180, 255),
      move(LEFT, 120),
      "tree",
    ]);
    
    wait(rand(0.5,1.5), spawnTree);

  }
  spawnTree();
  
  amu.onCollide("tree", () =>{
    go("lose",score);    
    burp();
    addKaboom(amu.pos);    
  });

  let score = 0;
  const scoreLabel = add([
    text(score),
    pos(24, 24)
  ])

  // increment score every frame
  onUpdate(() => {
    score++;
    scoreLabel.text = score;
  });

});

scene("lose", (score) => {
  	add([
      sprite("3", { anim: "burst", }),
      pos(width() / 2, height() / 2 - 80),
      scale(2),
      origin("center"),
	]);
 
 // display score
	add([
		text(score),
		pos(width() / 2, height() / 2 + 80),
		scale(2),
		origin("center"),
	]);

// go back to game with space is pressed
	onKeyPress("space", () => go("game"));
	onClick(() => go("game"));
});

go("game");

