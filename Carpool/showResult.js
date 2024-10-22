import { downloadPDF } from "./downloadPDF.js";

export function showResult(result) {
  const downloadButton = document.getElementById("downloadButton");
  downloadButton.removeAttribute("hidden");
  downloadButton.addEventListener("click", () => {
    downloadPDF(result);
  });

  const resultVar = document.getElementById("result");
  resultVar.textContent = result;

  const table = document.createElement("table");
  const tbody = document.createElement("tbody");
  const data = result.split("\n");

  for (let i = 0; i < data.length; i++) {
    if (data[i] !== "") {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.textContent = data[i];

      row.appendChild(cell);

      tbody.appendChild(row);
    }
  }

  table.appendChild(tbody);

  // Add line above the table
  const tableCaption = document.createElement("caption");
  tableCaption.textContent = "Mogelijke verdeling:";
  table.appendChild(tableCaption);

  tableContainer.appendChild(table);

  const canvas = document.createElement("div");
  canvas.id = "myCanvas";
  tableContainer.appendChild(canvas);

  const canvasCreated = document.getElementById("canvasCreated");
  canvasCreated.textContent = "true";
  setup();
}
