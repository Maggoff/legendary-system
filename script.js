let myCanvas1 = document.getElementById("myCanvas1");
myCanvas1.width = document.documentElement.clientWidth - 30;
myCanvas1.height = document.documentElement.clientHeight / 3;

let myCanvas2 = document.getElementById("myCanvas2");
myCanvas2.width = document.documentElement.clientWidth - 30;
myCanvas2.height = document.documentElement.clientHeight / 3;

let myCanvas3 = document.getElementById("myCanvas3");
myCanvas3.width = document.documentElement.clientWidth - 30;
myCanvas3.height = document.documentElement.clientHeight / 3;
  
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
  return text;
}

let analizeArrayOne;
function oneSymbol(text){
  let analize = {};
    for(let i=0; i<text.length; i++){
      //console.log("suckle i start");
      //console.log("i = "+i);
      analizeArrayOne = Object.keys(analize);
      //console.log(analizeArrayOne);
      //console.log("analizeArrayOne.length = "+analizeArrayOne.length);
      if(analizeArrayOne.length==0){
        //console.log("if 0 start")
        analize[text[i]] = 1;
      } else {
        for(let j=0; j<analizeArrayOne.length; j++){
          //console.log("suckle j start");
          //console.log("analizeArrayOne.length = "+analizeArrayOne.length);
          //console.log("j = "+j);
          //console.log("text = "+text[i]);
          let pos = analizeArrayOne.indexOf(text[i]);
          //console.log("pos = "+pos);
          if(pos == -1){
            //console.log("false text start");
            analize[text[i]] = 1;
            //console.log(analize);
            analizeArrayOne = Object.keys(analize);
            break;
          } else {
            //console.log("true text start");
            analize[analizeArrayOne[pos]] += 1;
            //console.log(analize);
            analizeArrayOne = Object.keys(analize);
            break;
          }
        }
      }
    }
  //console.log(analize);
  return analize;
}

let analizeArrayTwo;
function twoSymbol(text){
  let analize = {};
    for(let i=0; i<text.length-1; i++){
      //console.log("suckle i start");
      //console.log("i = "+i);
      analizeArrayTwo = Object.keys(analize);
      //console.log(analizeArrayTwo);
      //console.log("analizeArrayTwo.length = "+analizeArrayTwo.length);
      if(analizeArrayTwo.length==0){
        //console.log("if 0 start")
        analize[text[i]+text[i+1]] = 1;
      } else {
        for(let j=0; j<analizeArrayTwo.length; j++){
          //console.log("suckle j start");
          //console.log("j = "+j);
          //console.log("text = "+text[i]);
          let pos = analizeArrayTwo.indexOf(text[i]+text[i+1]);
          //console.log("pos = "+pos);
          if(pos == -1){
            //console.log("false text start");
            analize[text[i]+text[i+1]] = 1;
            //console.log(analize);
            analizeArrayTwo = Object.keys(analize);
            break;
          } else {
            //console.log("true text start");
            analize[analizeArrayTwo[pos]] += 1;
            //console.log(analize);
            analizeArrayTwo = Object.keys(analize);
            break;
          }
        }
      }
    }
  //console.log(analize);
  return analize;
}

let analizeArrayTree;
function treeSymbol(text){
  let analize = {};
    for(let i=0; i<text.length-2; i++){
      //console.log("suckle i start");
      //console.log("i = "+i);
      analizeArrayTree = Object.keys(analize);
      //console.log(analizeArrayTree);
      //console.log("analizeArrayTree.length = "+analizeArrayTree.length);
      if(analizeArrayTree.length==0){
        //console.log("if 0 start")
        analize[text[i]+text[i+1]+text[i+2]] = 1;
      } else {
        for(let j=0; j<analizeArrayTree.length; j++){
          //console.log("suckle j start");
          //console.log("j = "+j);
          //console.log("text = "+text[i]);
          let pos = analizeArrayTree.indexOf(text[i]+text[i+1]+text[i+2]);
          //console.log("pos = "+pos);
          if(pos == -1){
            //console.log("false text start");
            analize[text[i]+text[i+1]+text[i+2]] = 1;
            //console.log(analize);
            analizeArrayTree = Object.keys(analize);
            break;
          } else {
            //console.log("true text start");
            analize[analizeArrayTree[pos]] += 1;
            //console.log(analize);
            analizeArrayTree = Object.keys(analize);
            break;
          }
        }
      }
    }
  //console.log(analize);
  return analize;
}

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

    if(barSize<40){
      this.canvas.width = numberOfBars * 40;
      canvasActualWidth = this.canvas.width - this.options.padding * 2;
      barSize = (canvasActualWidth)/numberOfBars;

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
    }
  
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

        //console.log(this.options.analizeArray.length);
        //console.log(this.options.analizeArray);
      //writing grid markers
        //console.log("for = "+barIndex)
        this.ctx.save();
        this.ctx.fillStyle = this.options.gridColor;
        this.ctx.font = "15px Arial";
        this.ctx.fillText(this.options.analizeArray[barIndex], (barSize/1.5)+(barSize*barIndex+1), (document.documentElement.clientHeight / 3)-5);
        this.ctx.restore();
 
      barIndex++;
    }
  }
}

function drawCanvas1() {
  myCanvas1.style.display = "block";
  document.getElementById("divMyCanvas1").style.display = "block";

  ctx1.clearRect(0, 0, myCanvas1.width, myCanvas1.height);

  text = getText();
  myData1 = oneSymbol(text);
  
  max = 0;
  for(let i=0; i<analizeArrayOne.length; i++){
    if(myData1[analizeArrayOne[i]]>max){
      max = myData1[analizeArrayOne[i]]
    }
  }

  if(max>=500){
    scale = 50;
  } else {
    if(max>=250){
      scale = 25;
    } else {
      if(max>=100){
        scale = 15;
      } else {
        if(max>=50){
          scale = 10;
        } else {
          scale = 1;
        }
      }
    }
  }

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

  let table = document.getElementById("table1");
  table.innerHTML = '<table><tbody id="tableBody1"><tr><th>Буква</th><th>Кількість входжень</th>';
  let tableBody = document.getElementById("tableBody1");
  for(let i=0; i<analizeArrayOne.length; i++){
    tableBody.innerHTML += "<tr><td>" + analizeArrayOne[i] + "</td><td>" + myData1[analizeArrayOne[i]] + "</td></tr>";
  }
  table1.innerHTML += "</tbody></table>";
}

function drawCanvas2() {
  myCanvas2.style.display = "block";
  document.getElementById("divMyCanvas2").style.display = "block";

  ctx2.clearRect(0, 0, myCanvas2.width, myCanvas2.height);

  text = getText();
  myData = twoSymbol(text);

  //console.log(text.length);

  max = 0;
  for(let i=0; i<analizeArrayTwo.length; i++){
    if(myData[analizeArrayTwo[i]]>max){
      max = myData[analizeArrayTwo[i]]
    }
  }

  if(max>=500){
    scale = 50;
  } else {
    if(max>=250){
      scale = 25;
    } else {
      if(max>=100){
        scale = 15;
      } else {
        if(max>=50){
          scale = 10;
        } else {
          scale = 1;
        }
      }
    }
  }

  let myBarchart2 = new Barchart(
    {
      canvas:myCanvas2,
      padding:25,
      gridScale:scale,
      gridColor:"#000",
      data:myData,
      analizeArray:analizeArrayTwo,
      colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
  );

  myBarchart2.draw();

  let table = document.getElementById("table2");
  table.innerHTML = '<table><tbody id="tableBody2"><tr><th>Букви</th><th>Кількість входжень</th>';
  let tableBody = document.getElementById("tableBody2");
  for(let i=0; i<analizeArrayTwo.length; i++){
    tableBody.innerHTML += "<tr><td>" + analizeArrayTwo[i] + "</td><td>" + myData[analizeArrayTwo[i]] + "</td></tr>";
  }
  table.innerHTML += "</tbody></table>";
}

function drawCanvas3() {
  myCanvas3.style.display = "block";
  document.getElementById("divMyCanvas3").style.display = "block";

  ctx3.clearRect(0, 0, myCanvas3.width, myCanvas3.height);

  text = getText();
  myData = treeSymbol(text);

  //console.log(text.length);

  max = 0;
  for(let i=0; i<analizeArrayTree.length; i++){
    if(myData[analizeArrayTree[i]]>max){
      max = myData[analizeArrayTree[i]]
    }
  }

  if(max>=500){
    scale = 50;
  } else {
    if(max>=250){
      scale = 25;
    } else {
      if(max>=100){
        scale = 15;
      } else {
        if(max>=50){
          scale = 10;
        } else {
          if(max>=25){
            scale = 5;
          } else {
            scale = 1;
          }
        }
      }
    }
  }

  let myBarchart3 = new Barchart(
    {
      canvas:myCanvas3,
      padding:25,
      gridScale:scale,
      gridColor:"#000",
      data:myData,
      analizeArray:analizeArrayTree,
      colors:["#a55ca5","#67b6c7", "#bccd7a","#eb9743"]
    }
  );

  myBarchart3.draw();

  let table = document.getElementById("table3");
  table.innerHTML = '<table><tbody id="tableBody3"><tr><th>Букви</th><th>Кількість входжень</th>';
  let tableBody = document.getElementById("tableBody3");
  for(let i=0; i<analizeArrayTree.length; i++){
    tableBody.innerHTML += "<tr><td>" + analizeArrayTree[i] + "</td><td>" + myData[analizeArrayTree[i]] + "</td></tr>";
  }
  table.innerHTML += "</tbody></table>";
}