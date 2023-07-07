function showResult(result) {
  console.log(result);
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
}
