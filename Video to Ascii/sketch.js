// Image to ASCII
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/166-ascii-image.html
// https://youtu.be/55iwMYv8tGI

// ASCII video: https://editor.p5js.org/codingtrain/sketches/KTVfEcpWx
// ASCII image canvas: https://editor.p5js.org/codingtrain/sketches/r4ApYWpH_
// ASCII image DOM: https://editor.p5js.org/codingtrain/sketches/ytK7J7d5j
// ASCII image source text: https://editor.p5js.org/codingtrain/sketches/LNBpdYQHP
// ASCII image weather API: https://editor.p5js.org/codingtrain/sketches/DhdqcoWn4



     const density = "Ñ@#W$9876543210?!abc;:+=-,._          ";



//const density = '       .:-i|=+%O#@'
//const density = '        .:░▒▓█';

let video;
let asciiDiv;

        function setup() {
          asciiDiv = createDiv();
          noCanvas();
          video = createCapture(VIDEO);
          video.size(64, 48);
        }

        function draw() {
          video.loadPixels();
          let asciiImage = "";
          for (let j = 0; j < video.height; j++) {
            for (let i = 0; i < video.width; i++) {
              const pixelIndex = (i + j * video.width) * 4;
              const r = video.pixels[pixelIndex + 0];
              const g = video.pixels[pixelIndex + 1];
              const b = video.pixels[pixelIndex + 2];
              const avg = (r + g + b) / 3;
              const len = density.length;
              const charIndex = floor(map(avg, 0, 255, 0, len));
              const c = density.charAt(charIndex);
              if (c == " ") asciiImage += "&nbsp;";
              else asciiImage += c;
            }
            asciiImage += '<br/>';
          }
          asciiDiv.html(asciiImage);
        }
