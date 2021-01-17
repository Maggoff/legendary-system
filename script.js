let myCanvas1 = document.getElementById("myCanvas1");
myCanvas1.width = document.documentElement.clientWidth - 30;
myCanvas1.height = 800;

let myCanvas2 = document.getElementById("myCanvas2");
myCanvas2.width = document.documentElement.clientWidth - 30;
myCanvas2.height = 800;

let myCanvas3 = document.getElementById("myCanvas3");
myCanvas3.width = document.documentElement.clientWidth - 30;
myCanvas3.height = 800;
  
let ctx1 = myCanvas1.getContext("2d");
let ctx2 = myCanvas2.getContext("2d");
let ctx3 = myCanvas3.getContext("2d");

function drawLine(ctx, startX, startY, endX, endY,color){
  ctx.save();
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX,startY);
  ctx.lineTo(endX,endY);
  ctx.stroke();
  ctx.restore();
}

function drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height, color){
  ctx.save();
  ctx.fillStyle=color;
  ctx.fillRect(upperLeftCornerX,upperLeftCornerY,width,height);
  ctx.restore();
}



function getText(){
  let text = document.getElementById("enterText");
  text = text.value;
  console.log(text);
  return text;
}

let analizeArrayOne;
function oneSymbol(text){
  let analize = {};
    for(let i=0; i<text.length; i++){
      console.log("suckle i start");
      console.log("i = "+i);
      analizeArrayOne = Object.keys(analize);
      console.log(analizeArrayOne);
      console.log("analizeArrayOne.length = "+analizeArrayOne.length);
      if(analizeArrayOne.length==0){
        console.log("if 0 start")
        analize[text[i]] = 1;
      } else {
        for(let j=0; j<analizeArrayOne.length; j++){
          console.log("suckle j start");
          // console.log("analizeArray.length = "+analizeArray.length);
          console.log("j = "+j);
          console.log("text = "+text[i]);
          let pos = analizeArrayOne.indexOf(text[i]);
          console.log("pos = "+pos);
          if(pos == -1){
            console.log("false text start");
            analize[text[i]] = 1;
            console.log(analize);
            analizeArrayOne = Object.keys(analize);
            break;
          } else {
            console.log("true text start");
            analize[analizeArrayOne[pos]] += 1;
            console.log(analize);
            analizeArrayOne = Object.keys(analize);
            break;
          }
          // if(text[i]==analizeArray[j]){
          //   console.log("if text start");
          //   analize[analizeArray[j]] += 1;
          //   console.log(analize);
          //   break;
          // } else {
          //   console.log("else text start");
          //   analize[text[i]] = 1;
          //   console.log(analize);
          // }
        }
      }
    }
  console.log(analize);
  return analize;
}

let analizeArrayTwo;
function twoSymbol(text){
  let analize = {};
    for(let i=0; i<text.length-1; i++){
      console.log("suckle i start");
      console.log("i = "+i);
      analizeArrayTwo = Object.keys(analize);
      console.log(analizeArrayTwo);
      console.log("analizeArrayTwo.length = "+analizeArrayTwo.length);
      if(analizeArrayTwo.length==0){
        console.log("if 0 start")
        analize[text[i]+text[i+1]] = 1;
      } else {
        for(let j=0; j<analizeArrayTwo.length; j++){
          console.log("suckle j start");
          console.log("j = "+j);
          console.log("text = "+text[i]);
          let pos = analizeArrayTwo.indexOf(text[i]+text[i+1]);
          console.log("pos = "+pos);
          if(pos == -1){
            console.log("false text start");
            analize[text[i]+text[i+1]] = 1;
            console.log(analize);
            analizeArrayTwo = Object.keys(analize);
            break;
          } else {
            console.log("true text start");
            analize[analizeArrayTwo[pos]] += 1;
            console.log(analize);
            analizeArrayTwo = Object.keys(analize);
            break;
          }
        }
      }
    }
  console.log(analize);
  return analize;
}

let analizeArrayTree;
function treeSymbol(text){
  let analize = {};
    for(let i=0; i<text.length-2; i++){
      console.log("suckle i start");
      console.log("i = "+i);
      analizeArrayTree = Object.keys(analize);
      console.log(analizeArrayTree);
      console.log("analizeArrayTree.length = "+analizeArrayTree.length);
      if(analizeArrayTree.length==0){
        console.log("if 0 start")
        analize[text[i]+text[i+1]+text[i+2]] = 1;
      } else {
        for(let j=0; j<analizeArrayTree.length; j++){
          console.log("suckle j start");
          console.log("j = "+j);
          console.log("text = "+text[i]);
          let pos = analizeArrayTree.indexOf(text[i]+text[i+1]+text[i+2]);
          console.log("pos = "+pos);
          if(pos == -1){
            console.log("false text start");
            analize[text[i]+text[i+1]+text[i+2]] = 1;
            console.log(analize);
            analizeArrayTree = Object.keys(analize);
            break;
          } else {
            console.log("true text start");
            analize[analizeArrayTree[pos]] += 1;
            console.log(analize);
            analizeArrayTree = Object.keys(analize);
            break;
          }
        }
      }
    }
  console.log(analize);
  return analize;
}

// let myVinyls = {
//   "Classical music": 10,
//   "Alternative rock": 104,
//   Pop: 22,
//   "h music": 10,
//   "c rock": 104,
//   Popd: 22,
//   "l music": 10,
//   "c rock": 104,
//   "Pop": 22,
//   "jj music": 10,
//   "d rock": 104,
//   "Pop": 22,
//   "Classical music": 15,
//   "f rock": 104,
//   "Pop": 22,
//   "t music": 10,
//   "e rock": 104,
//   "Pop": 22,
//   "a music": 10,
//   "x rock": 104,
//   "Pop": 22,
//   "Jazz": 12
// };

let Barchart = function(options){
  this.options = options;
  this.canvas = options.canvas;
  this.ctx = this.canvas.getContext("2d");
  this.colors = options.colors;
  
  this.draw = function(){
    let maxValue = 0;
    for (let categ in this.options.data){
      maxValue = Math.max(maxValue,this.options.data[categ]);
    }
    let canvasActualHeight = this.canvas.height - this.options.padding * 2;
    let canvasActualWidth = this.canvas.width - this.options.padding * 2;
 
    //drawing the grid lines
    let gridValue = 0;
    while (gridValue <= maxValue){
      let gridY = canvasActualHeight * (1 - gridValue/maxValue) + this.options.padding;
      drawLine(
        this.ctx,
        0,
        gridY,
        this.canvas.width,
        gridY,
        this.options.gridColor
      );
             
      //writing grid markers
      this.ctx.save();
      this.ctx.fillStyle = this.options.gridColor;
      this.ctx.font = "bold 10px Arial";
      this.ctx.fillText(gridValue, 0,gridY - 2);
      this.ctx.restore();
 
      gridValue+=this.options.gridScale;
    }
  
    //drawing the bars
    let barIndex = 0;
    let numberOfBars = Object.keys(this.options.data).length;
    let barSize = (canvasActualWidth)/numberOfBars;
 
    for (categ in this.options.data){
      let val = this.options.data[categ];
      let barHeight = Math.round( canvasActualHeight * val/maxValue);
      drawBar(
        this.ctx,
        this.options.padding + barIndex * barSize,
        this.canvas.height - barHeight - this.options.padding,
        barSize,
        barHeight,
        this.colors[barIndex%this.colors.length]
      );

        console.log(this.options.analizeArray.length);
        console.log(this.options.analizeArray);
      //writing grid markers
      // for(let i=0; i<this.options.analizeArray.length; i++){
        console.log("for = "+barIndex)
        this.ctx.save();
        this.ctx.fillStyle = this.options.gridColor;
        this.ctx.font = "15px Arial";
        this.ctx.fillText(this.options.analizeArray[barIndex], (barSize/1.5)+(barSize*barIndex+1), 792);
        this.ctx.restore();
      // }
 
      barIndex++;
    }
  }
}

function drawCanvas1() {
  myCanvas1.style.display = "block";

  ctx1.clearRect(0, 0, myCanvas1.width, myCanvas1.height);

  text = getText();

  console.log(text.length);

  let scale;
  if(text.length>=2000){
    scale = 50;
  } else {
    if(text.length>=500){
      scale = 25;
    } else {
      if(text.length>=100){
        scale = 10;
      } else {
        if(text.length>=50){
          scale = 5;
        } else {
          scale = 1;
        }
      }
    }
  }

  myData1 = oneSymbol(text);

  let myBarchart1 = new Barchart(
    {
      canvas:myCanvas1,
      padding:25,
      gridScale:scale,
      gridColor:"#000",
      data:myData1,
      analizeArray:analizeArrayOne,
      colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
  );

  myBarchart1.draw();
}

function drawCanvas2() {
  myCanvas2.style.display = "block";

  ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);

  text = getText();

  console.log(text.length);

  let scale;
  if(text.length>=2000){
    scale = 50;
  } else {
    if(text.length>=500){
      scale = 25;
    } else {
      if(text.length>=100){
        scale = 10;
      } else {
        if(text.length>=50){
          scale = 5;
        } else {
          scale = 1;
        }
      }
    }
  }

  myData2 = twoSymbol(text);

  let myBarchart2 = new Barchart(
    {
      canvas:myCanvas2,
      padding:25,
      gridScale:scale,
      gridColor:"#000",
      data:myData2,
      analizeArray:analizeArrayTwo,
      colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
  );

  myBarchart2.draw();
}

function drawCanvas3() {
  myCanvas3.style.display = "block";

  ctx3.clearRect(0, 0, myCanvas3.width, myCanvas3.height);

  text = getText();

  console.log(text.length);

  let scale;
  if(text.length>=2000){
    scale = 50;
  } else {
    if(text.length>=500){
      scale = 25;
    } else {
      if(text.length>=100){
        scale = 10;
      } else {
        if(text.length>=50){
          scale = 5;
        } else {
          scale = 1;
        }
      }
    }
  }

  myData3 = treeSymbol(text);

  let myBarchart3 = new Barchart(
    {
      canvas:myCanvas3,
      padding:25,
      gridScale:scale,
      gridColor:"#000",
      data:myData3,
      analizeArray:analizeArrayTree,
      colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
  );

  myBarchart3.draw();
}