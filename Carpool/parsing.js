import { arrangeSeats } from "./arrangement.js";
import { showResult } from "./showResult.js";

export default function parsing(table) {
  const rows = table.getElementsByTagName("tr");
  const columns = [];
  for (let i = 1; i < rows.length; i++) {
    const cells = Array.from(rows[i].getElementsByTagName("td"));
    const rowValues = [];

    for (const cell of cells) {
      rowValues.push(cell.innerText.trim());
    }

    if (rowValues[0] !== "" && rowValues[1] !== "" && rowValues.length === 2) {
      columns.push(rowValues);
    }
  }
  showResult(arrangeSeats(columns));
}
