function besteZet() {
  if(bezig) {
    let besteScore = -Infinity;
    let zet;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (bord[i][j] == '') {
          bord[i][j] = AI;
          let score = minimax(bord, 0, false, -99999, 99999);
          bord[i][j] = '';
          if (score > besteScore) {
            besteScore = score;
            zet = {i, j};
          }
        }
      }
    }
    if(zet != null) {
      bord[zet.i][zet.j] = AI;
      huidigeSpeler = mens;
    }

  }
}

//zoGrootMogelijk = true --> speler X false --> speler O
function minimax(bord, diepte, zoGrootMogelijk, alfa, beta) {
  let resultaat = checkVoorWinnaar();
  if (resultaat !== null) {
    return scores[resultaat];
  }

  if (zoGrootMogelijk) {
    let besteScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (bord[i][j] == '') {
          bord[i][j] = AI;
          let score = minimax(bord, diepte + 1, false, alfa, beta);
          bord[i][j] = '';
          besteScore = max(score, besteScore);
          alfa = max(alfa, besteScore);
          if (beta <= alfa) {
            break;
          }
        }
      }
    }
    return besteScore;
  } else {
    let besteScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (bord[i][j] == '') {
          bord[i][j] = mens;
          let score = minimax(bord, diepte + 1, true, alfa ,beta);
          bord[i][j] = '';
          besteScore = min(score, besteScore);
          beta = min(beta, besteScore);
          if (beta <= alfa) {
            break;
          }
        }
      }
    }
    return besteScore;
  }
}
