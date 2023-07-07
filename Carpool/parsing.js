function parsing(table) {
  const rows = table.getElementsByTagName("tr");
  const columns = [];
  for (let i = 1; i < rows.length; i++) {
    const cells = Array.from(rows[i].getElementsByTagName("td"));
    const rowValues = [];

    for (const cell of cells) {
      rowValues.push(cell.innerText.trim());
    }

    if (rowValues.length > 0) {
      columns.push(rowValues);
    }
  }
  console.log(arrangeSeats(columns));
}
