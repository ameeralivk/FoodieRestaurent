// helpe₹/invoice.ts
import jsPDF from "jspdf";
import type { IOrder } from "../../../types/order";

export const generateInvoicePDF = (order: IOrder) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // ----- Background Header -----
  doc.setFillColor(79, 70, 229); // Indigo
  doc.rect(0, 0, pageWidth, 50, "F");

  // ----- Header -----
  doc.setFontSize(28);
  doc.setTextColor(255, 255, 255);
  doc.text("INVOICE", pageWidth / 2, 25, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(`Order ID: ${order.orderId}`, pageWidth / 2, 38, {
    align: "center",
  });

  // ----- Order Details Box -----
  doc.setFillColor(249, 250, 251);
  doc.rect(20, 60, pageWidth - 40, 30, "F");

  doc.setFontSize(11);
  doc.setTextColor(55, 65, 81);
  doc.text(`Table: ${order.tableId}`, 30, 73);
  doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 30, 83);
  doc.text(
    `Currency: ${order.currency}`,
    pageWidth - 30 - doc.getTextWidth(`Currency: ${order.currency}`),
    73
  );

  // ----- Table Header -----
  const colX = { item: 30, qty: 120, price: 160 };
  let startY = 105;

  doc.setFillColor(79, 70, 229);
  doc.rect(20, startY - 8, pageWidth - 40, 12, "F");

  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text("Item", colX.item, startY);
  doc.text("Qty", colX.qty, startY);
  doc.text("Price", colX.price, startY);

  // ----- Table Rows -----
  doc.setFontSize(11);
  let y = startY + 12;

  order.items.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(20, y - 6, pageWidth - 40, 10, "F");
    }

    doc.setTextColor(55, 65, 81);
    doc.text(item.itemName, colX.item, y);
    doc.text(String(item.quantity), colX.qty, y);
    doc.text(`${String(item.price)}`, colX.price, y);
    y += 10;
  });

  // ----- Divider Line -----
  y += 5;
  doc.setDrawColor(209, 213, 219);
  doc.setLineWidth(0.5);
  doc.line(20, y, pageWidth - 20, y);

  // ----- Total Section -----
  y += 12;
  doc.setFontSize(11);
  doc.setTextColor(107, 114, 128);
  doc.text("Subtotal:", colX.item, y);
  doc.setTextColor(55, 65, 81);
  doc.text(`${String(order.subTotal)}`, colX.price, y);

  y += 10;
  doc.setFillColor(79, 70, 229);
  doc.rect(20, y - 6, pageWidth - 40, 12, "F");

  doc.setFontSize(13);
  doc.setTextColor(255, 255, 255);
  doc.text("Total:", colX.item, y + 2);
  doc.text(`Rs ${String(order.totalAmount)}`, colX.price, y + 2);

  // ----- Footer -----
  doc.setFillColor(243, 244, 246);
  doc.rect(0, pageHeight - 35, pageWidth, 35, "F");

  doc.setFontSize(11);
  doc.setTextColor(79, 70, 229);
  doc.text("Thank you for ordering with us!", pageWidth / 2, pageHeight - 20, {
    align: "center",
  });

  doc.setFontSize(9);
  doc.setTextColor(107, 114, 128);
  doc.text("We appreciate your business!", pageWidth / 2, pageHeight - 12, {
    align: "center",
  });

  // ----- Save PDF -----
  doc.save(`${order.orderId}_invoice.pdf`);
};
