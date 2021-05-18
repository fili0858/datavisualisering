// hvad vil vi lave:
// leaderboard med top 10 lande med flest smittede.
// prikker (der vises over pågældende lande) med størrelse, der afhænger af vækstrate
// vækstrate er givet over 3 dage, ved = (forskellen mellem dag 3 og 2) divideret med (forskellen på dag 2 og 1).

//variable introduceres globalt:
let table;
let img;
let count = 5


function preload() {
  //antal cases og kortet hentes fra gibhub:
  table = loadTable('https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv', 'csv', 'header');
  img = createImg('https://github.com/mpsteenstrup/Covid19DatabaseTutorial/blob/master/images/map.jpg?raw=true');
  img.hide();
}
// her er imagesearchen https://www.google.com/search?tbs=sbi:AMhZZivyG_17npB7rrUM829UG1JV07I0epI9njkAOgtl9hMQCkBFCLej1M_14KV6X7kalAeAwYXYDzy5iQDmOUh9VdxBGmIJhTgs44IhkfJbz_16f3DxxY24gXc7PhUN5FXG06-ua2fAe7Lyc9n2WC69V1jgDfBjDlXQxECwaw58v6WeqzLFDFCCbmxBJpDnqW7riyoV59NuSnISEcGx0gOP5dCUsxAwFH_15VpWW6VTj_1kF4N1Q2g7g2rIFy19I1FgWy85xaqSVhiTcZhixoCQ_11Ul9sVoQUNjpSithif3CvnE1vJYt-vSAGoxXzp9EQXWJDUg5DdVmAH7oq1kZr5FWenYURSO-QJxUYw&btnG=Search%20by%20image&hl=en
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(100, 100, 100);
  fill(230);
  frameRate(1);
  noStroke();
}

function draw() {
  frameRate(10);
  background(0, 100, 200);
  image(img, 400 - 360, 400 - 360 * 0.84, 360 * 2, 440);
  fill(255, 255, 255);
  textSize(60);
  text(table.columns[count], 550, 600);
  lat = table.getColumn('Lat');
  long = table.getColumn('Long');
  confirmed = table.getColumn(count);

  textSize(20)
  text("Totalt smittetal:",windowWidth/5-150,windowHeight-785)
  text(">10.000.000",(windowWidth/5)+20, windowHeight-785)
  text(">1.000.000",2*(windowWidth/5)+20, windowHeight-785)
  text(">100.000",3*(windowWidth/5)+20, windowHeight-785)
  text("<100.000",4*(windowWidth/5)+20, windowHeight-785)

  text("Klik for at begynde forfra...",windowWidth/5-150,90)
  text("Lande og smittetal:",windowWidth/5-138,windowHeight-279)


  fill(204, 0, 0, 230)
  ellipse((windowWidth/5), windowHeight-790,25,25)


  fill(255,105,104,190)
  ellipse((2*windowWidth/5), windowHeight-790,25,25)

  fill(255,179,179,190)
  ellipse((3*windowWidth/5), windowHeight-790,25,25)

  fill(255,255,255,190)
  ellipse((4*windowWidth/5), windowHeight-790,25,25)

  for (i = 0; i < table.getRowCount(); i++) {
    if (confirmed[i]>10000000) {
      fill(204, 0, 0, 230);
    }
      else if (confirmed[i]>1000000){
        fill(255,105,104,190);
      }
      else if (confirmed[i]>100000){
        fill(255,179,179,190);
      }
      else {
        fill(255,255,255,190)
      }

    ellipse(400 + long[i] * 2, 400 - lat[i] * 2, log(confirmed[i]), log(confirmed[i]));
  }

  textSize(20);
  fill(255);

  maksimum = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  lande = ["", "", "", "", "", "", "", "", "", ""];

  for (let j = 0; j < 10; j++) {

    for (let i = 0; i < table.getColumnCount(); i++) {
      if (parseInt(table.getColumn(count)[i]) >= maksimum[0]) {
        maksimum[0] = parseInt(table.getColumn(count)[i]);
        lande[0] = table.getColumn(1)[i];
      }
      if (parseInt(table.getColumn(count)[i]) > maksimum[j] && parseInt(table.getColumn(count)[i]) < maksimum[j - 1]) {
        maksimum[j] = parseInt(table.getColumn(count)[i]);
        lande[j] = table.getColumn(1)[i];
      }
    }
  }

  for (let i = 0; i < 10; i++) {

    if (maksimum[i]>10000000) {
      fill(204, 0, 0, 230);
    }
      else if (maksimum[i]>1000000){
        fill(255,105,104,190);
      }
      else if (maksimum[i]>100000){
        fill(255,179,179,190);
      }
      else {
        fill(255,255,255,190)
      }


    text(i + 1 + ".   " + lande[i], 50, 580 + i * 30);
    text(maksimum[i], 350, 580 + i * 30);
  }

  count += 1;
  if (count > table.getColumnCount() - 1) {
    count = table.getColumnCount() - 1;
  }
}

function mousePressed() {
  count = 5;
}
