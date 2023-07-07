document.addEventListener("DOMContentLoaded", function () {
  let tableContainer = document.getElementById("tableContainer");
  let fileInput = document.getElementById("fileInput");

  // Function to clear the existing table
  function clearTable() {
    while (tableContainer.firstChild) {
      tableContainer.firstChild.remove();
    }
  }

  // Function to extract data from locally uploaded Excel file
  function extractData(event) {
    clearTable(); // Clear existing table

    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      const table = document.createElement("table");
      const tbody = document.createElement("tbody");

      for (let i = 0; i < jsonData.length; i++) {
        const row = document.createElement("tr");

        for (let j = 0; j < jsonData[i].length; j++) {
          const cellValue = jsonData[i][j];
          const cell = document.createElement("td");
          cell.textContent = cellValue;

          // Add CSS class to the first cell of each column
          if (i === 0) {
            cell.classList.add("bold-first-word");
          }

          row.appendChild(cell);
        }

        tbody.appendChild(row);
      }

      table.appendChild(tbody);

      // Add line above the table
      const tableCaption = document.createElement("caption");
      tableCaption.textContent = "Geuploade tabel";
      table.appendChild(tableCaption);

      tableContainer.appendChild(table);

      // Reset file input value to allow selecting the same file again
      fileInput.value = "";
    };

    reader.readAsArrayBuffer(file);
  }

  function setTableContainerHeight() {
    const screenHeight = window.innerHeight;
    const containerTopOffset = tableContainer.offsetTop;
    const containerBottomMargin = 20; // Adjust the margin as needed

    const maxHeight = screenHeight - containerTopOffset - containerBottomMargin;
    tableContainer.style.maxHeight = `${maxHeight}px`;
  }

  window.addEventListener("resize", setTableContainerHeight);
  fileInput.addEventListener("change", extractData);

  setTableContainerHeight(); // Set initial table container height
});
