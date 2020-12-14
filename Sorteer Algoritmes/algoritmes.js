function brickSort(array) {
  let n = array.length;
  even(array, n);
  oneven(array, n);
}

function even(array, n) {
  let tijdelijk = 0;

  for (let i = 0; i <= n - 2; i += 2) {
    if (waardes[i] > waardes[i + 1]) {
      tijdelijk = waardes[i];
      waardes[i] = waardes[i+1];
      waardes[i+1] = tijdelijk;
    }
  }
}

function oneven(array, n) {
  let tijdelijk = 0;

  for (let i = 1; i <= n - 2; i += 2) {
    if (waardes[i] > waardes[i + 1]) {
      tijdelijk = waardes[i];
      waardes[i] = waardes[i + 1];
      waardes[i + 1] = tijdelijk;
    }
  }
}

function bubbleSort(array) {
  let a = waardes[bubbelJ];
  let b = waardes[bubbelJ + 1];

  if (a > b) { //wissel de 2 van plaats
    let tijdelijk = waardes[bubbelJ];
    waardes[bubbelJ] = waardes[bubbelJ + 1];
    waardes[bubbelJ + 1] = tijdelijk;
  }

  if (bubbelI < waardes.length) {
    bubbelJ++;
    if (bubbelJ >= waardes.length - bubbelI -1) {
      bubbelJ = 0;
      bubbelI++;
    }
  }

  if (bubbelI >= waardes.length) {
    gaan = false;
    bubbelI = 0;
    bubbelJ = 0;
  }
}

function cocktailSort(array) {
  links(array);
  rechts(array);
}

function links(array) {
  let a = array[cocktailN];
  let b = array[cocktailN + 1];
  if (a > b) { //wissel de 2 van plaats
    let tijdelijk = array[cocktailN];
    array[cocktailN] = array[cocktailN + 1];
    array[cocktailN + 1] = tijdelijk;
  }

  if (cocktailM > 0) {
    cocktailN--;
    if (cocktailN < 0) {
      cocktailN = array.length - 2;
      cocktailM--;
    }
  }
}

function rechts(array) {
  let a = array[cocktailJ];
  let b = array[cocktailJ + 1];
  if (a > b) { //wissel de 2 van plaats
    let tijdelijk = array[cocktailJ];
    array[cocktailJ] = array[cocktailJ + 1];
    array[cocktailJ + 1] = tijdelijk;
  }
  if (cocktailI < array.length) {
    cocktailJ++;
    if (cocktailJ >= array.length - cocktailI - 1) {
      cocktailJ = 0;
      cocktailI++;
    }
  }
}

async function combSort(array) {
  if(kammen) {
    let stop = 0;
    let interval = floor(waardes.length/1.3);
    while (interval > 0) {
      for(let i = 0; i + interval < waardes.length; i++) {
        if (waardes[i] > waardes[i + interval]) {
          let tijdelijk = waardes[i + interval];
          waardes[i + interval] = waardes[i];
          waardes[i] = tijdelijk;
          if(stop % 25 == 0) await slaap(0);
          stop++;
        }
      }
      interval = floor(interval / 1.3);
    }
  }
}

async function cycleSort(array) {
  if(cyclus) {
    let stop = 0;
    let n = array.length;

    for (let beginCyclus = 0; beginCyclus <= n - 2; beginCyclus++) {
      let getal = array[beginCyclus];
      let positieGetal = beginCyclus;

      for (let i = beginCyclus + 1; i < n; i++) {
        if (array[i] < getal) {
          positieGetal++;
        }
      }

      if (positieGetal == beginCyclus) {//skip uit de cyclus als het getal al op de juiste plaats staat
        continue;
      }

      while (getal == array[positieGetal]) {
        positieGetal++; //skip meerdere elementen die identiek zijn
      }

      if (positieGetal != beginCyclus) {
        let tijdelijk = getal;
        getal = array[positieGetal];
        array[positieGetal] = tijdelijk;//zet het getal op de juiste plaats
        if(stop % 10 == 0) await slaap(1);
        stop++;
      }

      while (positieGetal != beginCyclus) {
        positieGetal = beginCyclus;

        for (let i = beginCyclus + 1; i < n; i++) {
          if (array[i] < getal) {
            positieGetal += 1;
          }
        }
        while (getal == array[positieGetal]) {
          positieGetal += 1;
        }
        //zet het getal op de juiste positie
        if (getal != array[positieGetal]) {
          let tijdelijk = getal;
          getal = array[positieGetal];
          array[positieGetal] = tijdelijk;
          if(stop % 10 == 0) await slaap(1);
          stop++;
        }
      }
    }
  }
}

async function gnomeSort(array) {
  if(kabouter) {
    let stop = 0;
    let n = array.length;

    let index = 1;

    while (index < n) {
      if (index == 0) {
        index++;
      }

      if (array[index] >= array[index - 1]) {
        index++;
      } else {
        if(stop % 10 == 0) await slaap(1);
        stop++;
        let tijdelijk = array[index];
        array[index] = array[index - 1];
        array[index - 1] = tijdelijk;
        index--;
      }
    }
  }
}

function insertionSort(array) {
  let waarde = waardes[insertionI];
  let j = insertionI - 1;
  while ((j > -1) && (waardes[j] > waarde ) ) {
    waardes[j + 1] = waardes[j];
    j--;
  }
  waardes[j + 1] = waarde;
  if (insertionI < array.length) insertionI++;
  if (insertionI >= array.length) {
    insertionI = 0;
    gaan = false;
  }
}

function mergeSort(array) {
  //creer een kopie van de array
  kopie = array.slice()
  merge(kopie, 0, kopie.length);
}

async function merge(array, start, einde) {
  if(samenvoegen) {
    let stop = 0;
    if (einde - start <= 1) {
      return;
    }

    let midden = round((einde + start) / 2);

    await merge(array, start, midden);
    await merge(array, midden, einde);

    let i = start, j = midden;
    while (i < einde && j < einde) {
      if (array[i] > array[j]) {
        let tijdelijk = array[j];
        array.splice(j, 1);
        array.splice(i, 0, tijdelijk);
        if(stop % 1000000 == 0) await slaap(1);
        stop++;
        j ++;
      }
      i ++;
      if (i == j) {
        j ++;
      }
      if(stop % 1000000 == 0) await slaap(1);
      stop++;
      waardes = array.slice();
    }
  }
}

async function quickSort(array, start, einde) {
  if(snel) {
    if (start >= einde) {
      return;
    }
    let index = await verdelen(array, start, einde);

    await Promise.all([
      quickSort(array, start, index - 1),
      quickSort(array, index + 1, einde)
    ]);

    if(isGesorteerd(waardes)) snel = false;
  }
}

async function verdelen(array, start, einde) {
  let rotatieWaarde = array[einde];
  let rotatieIndex = start;
  for (let i = start; i < einde; i++) {
    if (array[i] < rotatieWaarde) {
      await wissel(array, i, rotatieIndex);
      rotatieIndex++;
    }
  }
  await wissel(array, rotatieIndex, einde);
  return rotatieIndex;
}

function selectionSort(array) {
  let n = waardes.length;
  let minimum = selectionI;
  for (let j = selectionI + 1; j < n; j++) {//als de waarde kleiner is dan de kleinste, wissel ze
    if (waardes[j] < waardes[minimum]) {
      minimum = j;
    }
  }

  let tijdelijk = waardes[selectionI];
  waardes[selectionI] = waardes[minimum];
  waardes[minimum] = tijdelijk;
  selectionI++;
  if(selectionI >= n) {
    selectionI = 0;
    gaan = false;
  }
}

async function shellSort(array){
  if(schild) {
    let lengte  = array.length;
    let grootteGat =  floor(lengte / 2);

    while(grootteGat > 0){
      for(let i = grootteGat; i < lengte; i++) {
        let tijdelijk = array[i];
        let j = i;

        while(j >= grootteGat && array[j - grootteGat] > tijdelijk) {
          array[j] = array[j - grootteGat];
          await slaap(1);
          j -= grootteGat;
        }
        array[j] = tijdelijk;
        await slaap(1);
      }
      grootteGat = floor(grootteGat / 2);
    }
    if(isGesorteerd(waardes)) schild = false;
  }
}

async function shotgunSort(array) {
  if(shotgun) {
    while(isGesorteerd(waardes) == false) {
      randomizer(waardes);
      await slaap(75);
    }
    shotgun = false;
  }
}

function isGesorteerd(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
}

async function timSort(array) {
  if(tim) {
    let n = array.length;

    for(let grootte = n; grootte > 1; grootte--) {
      let maxI = vindMaximum(array, grootte);
      if(maxI != grootte - 1) {
        await draaiOm(array, maxI);
        await draaiOm(array, grootte - 1);
      }
    }
    tim = false;
  }
}

async function draaiOm(array, i) {
  let stop = 0;
  let tijdelijk = 0;
  let start = 0;
  while(start < i) {
    tijdelijk = array[start];
    array[start] = array[i];
    array[i] = tijdelijk;
    stop++;
    if(stop % 100 == 0) await slaap(1);
    start++;
    i--;
  }
}

function vindMaximum(array,n) {
  let maxI;
  let i;
  for(maxI = 0, i = 0; i < n; i++) {
    if(array[i] > array[maxI]) {
      maxI = i;
    }
  }
  return maxI;
}

function slaap(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function wissel(array, i, j) {
  let tijdelijk = array[i];
  array[i] = array[j];
  array[j] = tijdelijk;
}

async function wissel(array, i, j) {
  await slaap(0);
  let tijdelijk = array[i];
  array[i] = array[j];
  array[j] = tijdelijk;
}
