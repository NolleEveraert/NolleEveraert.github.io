const { jsPDF } = window.jspdf;

export function downloadPDF(result) {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("Vervoersplanning", 105, 25, null, null, "center");
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(20, 35, result, { maxWidth: 160 });
  doc.save("Vervoersplanning.pdf");
}
