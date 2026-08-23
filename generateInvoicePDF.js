/**
 * K.P. PARAMATHMAN & BROTHERS
 * EXACT MASTER PDF GENERATOR USING jsPDF
 *
 * ALL COORDINATES extracted directly from invoice_template.pdf content stream.
 * PDF Page: 596.52 x 843 pt (A4 Portrait)
 * Green Color: rgb(31, 107, 72) = #1F6B48
 *
 * jsPDF coordinate system: top-left origin (unlike PDF's bottom-left).
 * Conversion: jsPDF_y = PAGE_HEIGHT - pdf_y   (for text/lines)
 *             jsPDF_y = PAGE_HEIGHT - (pdf_y + pdf_h)  (for rect top-left)
 */

/* jsPDF is loaded globally from CDN as window.jspdf */

const PAGE_W = 595.28;   // A4 width in pt
const PAGE_H = 841.89;   // A4 height in pt

// Green color in 0-255
const G = { r: 31, g: 107, b: 72 };
// Black — used for every actual user-entered/per-invoice value (admin form
// input, product rows, computed totals derived from that input). Every
// static/boilerplate piece of text (labels, company letterhead, column
// headers, declarations, terms wording) stays the existing green — the
// finished bill uses only these two ink colors, nothing else.
const BLACK = { r: 0, g: 0, b: 0 };

// Convert PDF bottom-origin Y to jsPDF top-origin Y
function py(pdfY) {
  return PAGE_H - pdfY;
}

// Convert PDF rect (bottom-left origin) to jsPDF rect params (top-left origin)
function pRect(pdfX, pdfY, pdfW, pdfH) {
  return { x: pdfX, y: PAGE_H - (pdfY + pdfH), w: pdfW, h: pdfH };
}

// ============================================================
// MAIN GENERATOR FUNCTION
// ============================================================
function generateExactInvoicePDF(data) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    unit: 'pt',
    format: [PAGE_W, PAGE_H],
    orientation: 'portrait'
  });

  const GC = [G.r / 255, G.g / 255, G.b / 255];

  // Helper: set draw color green
  function setGreen() {
    doc.setDrawColor(G.r, G.g, G.b);
    doc.setTextColor(G.r, G.g, G.b);
  }
  function setFillGreen() {
    doc.setFillColor(G.r, G.g, G.b);
  }
  function setFillWhite() {
    doc.setFillColor(255, 255, 255);
  }
  function setTextGreen() {
    doc.setTextColor(G.r, G.g, G.b);
  }
  function setTextBlack() {
    doc.setTextColor(BLACK.r, BLACK.g, BLACK.b);
  }
  function setLineWidth(w) {
    doc.setLineWidth(w);
  }

  // Helper: draw text at PDF coordinates (converts y)
  function text(str, pdfX, pdfY, opts = {}) {
    if (!str && str !== 0) return;
    const jY = py(pdfY);
    const options = { baseline: 'alphabetic', ...opts };
    doc.text(String(str), pdfX, jY, options);
  }

  // Helper: draw right-aligned text ending at pdfX
  function textRight(str, rightPdfX, pdfY, fontSz, bold = false) {
    if (!str && str !== 0) return;
    doc.setFontSize(fontSz);
    bold ? doc.setFont('helvetica', 'bold') : doc.setFont('helvetica', 'normal');
    const w = doc.getTextWidth(String(str));
    text(str, rightPdfX - w, pdfY);
  }

  // Draw a right-aligned line with a font size that fits within the header.
  function textRightFitted(str, rightPdfX, pdfY, maxWidth, preferredSize, bold = false) {
    let size = preferredSize;
    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(size);
    while (doc.getTextWidth(String(str)) > maxWidth && size > 6.5) {
      size -= 0.25;
      doc.setFontSize(size);
    }
    textRight(str, rightPdfX, pdfY, size, bold);
  }

  // Helper: draw center-aligned text
  function textCenter(str, centerPdfX, pdfY, fontSz, bold = false) {
    if (!str && str !== 0) return;
    doc.setFontSize(fontSz);
    bold ? doc.setFont('helvetica', 'bold') : doc.setFont('helvetica', 'normal');
    const w = doc.getTextWidth(String(str));
    text(str, centerPdfX - w / 2, pdfY);
  }

  // Helper: draw filled rect (PDF coords)
  function fillRect(pdfX, pdfY, pdfW, pdfH, color = 'fill') {
    const r = pRect(pdfX, pdfY, pdfW, pdfH);
    doc.rect(r.x, r.y, r.w, r.h, color);
  }

  // Helper: stroke rect (PDF coords)
  function strokeRect(pdfX, pdfY, pdfW, pdfH) {
    const r = pRect(pdfX, pdfY, pdfW, pdfH);
    doc.rect(r.x, r.y, r.w, r.h, 'S');
  }

  // Helper: draw horizontal line (PDF coords)
  function hLine(pdfX1, pdfX2, pdfY) {
    const jY = py(pdfY);
    doc.line(pdfX1, jY, pdfX2, jY);
  }

  // Helper: draw vertical line (PDF coords)
  function vLine(pdfX, pdfY1, pdfY2) {
    doc.line(pdfX, py(pdfY1), pdfX, py(pdfY2));
  }

  // Helper: embed an <img> element, scaled to fit inside a maxW x maxH box
  // while preserving its natural aspect ratio, anchored at (centerX, bottomY)
  // in PDF (bottom-origin) coordinates. Used for the E-Seal & E-Signature
  // artwork so custom uploads of any shape still sit correctly in their slot.
  function drawFittedImage(img, centerPdfX, bottomPdfY, maxW, maxH) {
    if (!img || !img.complete || !img.naturalWidth) return;
    const ratio = img.naturalWidth / img.naturalHeight;
    let w = maxW, h = maxW / ratio;
    if (h > maxH) { h = maxH; w = maxH * ratio; }
    const r = pRect(centerPdfX - w / 2, bottomPdfY, w, h);
    try {
      doc.addImage(img, 'PNG', r.x, r.y, r.w, r.h, undefined, 'FAST');
    } catch (error) {
      console.warn('Image could not be added to the PDF.', error);
    }
  }

  // Same fitting logic, anchored to a right edge instead of a centre —
  // used for the E-Signature, which is right-aligned in the reference layout.
  function drawFittedImageRight(img, rightPdfX, bottomPdfY, maxW, maxH) {
    if (!img || !img.complete || !img.naturalWidth) return;
    const ratio = img.naturalWidth / img.naturalHeight;
    let w = maxW, h = maxW / ratio;
    if (h > maxH) { h = maxH; w = maxH * ratio; }
    const r = pRect(rightPdfX - w, bottomPdfY, w, h);
    try {
      doc.addImage(img, 'PNG', r.x, r.y, r.w, r.h, undefined, 'FAST');
    } catch (error) {
      console.warn('Image could not be added to the PDF.', error);
    }
  }

  // ============================================================
  // 0. BACKGROUND WATERMARK (drawn first so every line/text sits on top)
  // ============================================================
  // Exact size & centring extracted from the master invoice_template.pdf:
  // embedded KPP monogram spans x=12.53..583.99, y(top-origin)=173.78..669.22
  // of the 596.52 x 843 pt page — i.e. dead-centred, 571.47 x 495.45 pt.
  if (data.includeWatermark) {
    const watermarkImg = document.getElementById('sheet-watermark-img');
    if (watermarkImg && watermarkImg.complete && watermarkImg.naturalWidth) {
      try {
        const wRect = pRect(12.53, 173.78, 571.47, 495.45);
        doc.addImage(watermarkImg, 'PNG', wRect.x, wRect.y, wRect.w, wRect.h, undefined, 'FAST');
      } catch (error) {
        console.warn('Watermark image could not be added to the PDF.', error);
      }
    }
  }

  setGreen();
  // Uniform interior grid-line thickness measured directly from
  // invoice_template.pdf (0.96pt) — the outer frame is redrawn thicker
  // (1.44pt) once, on top, at the very end of this function.
  setLineWidth(0.96);

  // ============================================================
  // 2. TOP RIGHT: invoice copy label
  // ============================================================
  // The copy type sits a little inside the outer border now — it was
  // right up against the corner (flush right AND close to the top edge),
  // which read as too tight. Nudged down and left for breathing room.
  textRightFitted(data.copyType || 'Original for Recipient', 563.0, 805.5, 150, 9, false);

  // Vinayagar mark. The on-screen image has loaded before the user can
  // download, so jsPDF can embed that same asset in the vector PDF.
  const vinayagarImg = document.getElementById('sheet-vinayagar-img');
  if (vinayagarImg && vinayagarImg.complete && vinayagarImg.naturalWidth) {
    // Preserve the source artwork's proportions and make it the dominant
    // full-height mark shown in the reference header.
    const logo = pRect(29.0, 725.0, 88.0, 91.0);
    try {
      doc.addImage(vinayagarImg, 'PNG', logo.x, logo.y, logo.w, logo.h, undefined, 'FAST');
    } catch (error) {
      console.warn('Vinayagar image could not be added to the PDF.', error);
    }
  }

  // ============================================================
  // 3. COMPANY HEADER (Center block)
  // ============================================================
  // Company Name - bold, size 16
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  // Shift the complete company block right to the visual centre, balancing
  // the larger Vinayagar mark on the left.
  textCenter('K.P. PARAMATHMAN & BROTHERS', 283, 790.0, 16, true);

  // Subtitle
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  textCenter('High Class Hand-Loom Silk Saree Manufacturers', 283, 772.4, 11, false);

  // Address line
  textCenter('#97, Gangaiyamman Koil Street, KILPATTU-606 907', 283, 756.8, 11, false);

  // City line
  textCenter('Polur Tk. (Via) Arani (Tvm. Dt.)', 283, 742.4, 11, false);

  // ============================================================
  // 4. RIGHT SIDE CONTACT INFO (GSTIN, Cell)
  // ============================================================
  // Right-align complete strings so the GSTIN colon cannot disappear into
  // an overlapping text run. Was flush at 568.0 — right on the outer
  // border itself — so the last character of every line was touching or
  // crossing it. Pulled in a few points for breathing room.
  textRight('GSTIN : 33BMXPP5419A1ZX', 563.0, 780.5, 9, true);
  textRight('Cell : 9952446177', 563.0, 762.5, 9, false);
  textRight('Cell : 9600686854', 563.0, 747.5, 9, false);

  // ============================================================
  // 5. No horizontal line above TAX INVOICE
  // ============================================================
  // The reference has open space between the company header and the title.

  // ============================================================
  // 6. TAX INVOICE BANNER (Green filled rectangle)
  // ============================================================
  // Banner: x=197, y=702.6, w=190, h=21
  setFillGreen();
  fillRect(197, 702.6, 190, 21, 'F');

  // TAX INVOICE text (white inside green banner)
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  textCenter('TAX INVOICE', 292, 709.1, 14, true);
  setTextGreen();

  // ============================================================
  // 7. HORIZONTAL LINE BELOW TAX INVOICE BANNER
  // ============================================================
  // Bounds measured directly from invoice_template.pdf (its content lines sit
  // just inside the outer frame, at x 28.0..566.6 — NOT 22.8..573.2, which
  // overshot past the true border on both sides).
  hLine(28.0, 566.6, 702.5);

  // ============================================================
  // 8. INFO SECTION: LEFT (Billed to) and RIGHT (Invoice meta)
  // ============================================================
  // Vertical divider at x=345.8 between the two boxes
  vLine(345.8, 615.46, 702.5);

  // LEFT: "Details of Receiver Billed to:" label
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  text('Details of Receiver Billed to:', 32.2, 692.9);

  // Divider directly under the "Details of Receiver Billed to:" label —
  // present in the template (left box only; the meta box on the right has
  // no internal dividers at all).
  hLine(28.0, 345.8, 688.4);

  // "To :" — sized to match the customer name (per the admin's request that
  // "To" carry the same font size as the input text next to it). The label
  // itself is static (green); the customer name and address that follow are
  // admin-entered per-invoice values, so they switch to black.
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  text('To :', 32.2, 674.4);
  doc.setFont('helvetica', 'bold');
  setTextBlack();
  // Customer / firm name — same size as "To :" so both stand out together.
  text(data.billedToName || '', 55.0, 674.4);

  // Customer address (wrap) — small extra padding above, to match the
  // slightly-lower "To :" row.
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const addrLines = (data.billedToAddress || '').split('\n');
  let addrY = 661.5;
  addrLines.forEach(line => {
    if (line.trim()) {
      text(line.trim(), 32.2, addrY);
      addrY -= 12.0;
    }
  });
  setTextGreen();

  // RIGHT SIDE - Invoice meta fields
  const metaLabelX = 351.4;
  const metaValX = 567.0;      // right edge — used ONLY for State Code, which
                                // the admin specifically wants flush to the
                                // border (per the earlier "take State Code to
                                // the very end" request).
  // Single shared column for every OTHER value in this box, positioned just
  // past the widest label ("Transportation Mode :") so every input lines up
  // in one straight column — per the admin's marked-up screenshot.
  const metaValStartX = 438.0;

  // Row heights from PDF: each row ~10-11pt apart.
  // Invoice No. / Invoice Date are compulsory; Reverse Charge is optional —
  // it renders blank until the admin explicitly sets it.
  const metaRows = [
    { label: 'Invoice No. :', val: data.invoiceNo || '', y: 691.3, bold: true },
    { label: 'Invoice Date :', val: data.invoiceDate || '', y: 680.9 },
    { label: 'Reverse Charge :', val: data.reverseCharge || '', y: 670.4 },
  ];

  // Every label here is static (green); every value beside it is an
  // admin-entered per-invoice field (black).
  doc.setFontSize(7.6);
  metaRows.forEach(row => {
    doc.setFont('helvetica', 'bold');
    setTextGreen();
    text(row.label, metaLabelX, row.y);
    doc.setFont('helvetica', row.bold ? 'bold' : 'normal');
    setTextBlack();
    text(row.val, metaValStartX, row.y);
  });
  setTextGreen();

  // STATE row — State Code stays pushed flush to the right border (per the
  // admin's request — "take State Code to the very end"); the state name
  // itself now starts at the same shared column as every other value.
  doc.setFontSize(7.6);
  doc.setFont('helvetica', 'bold');
  text('STATE :', metaLabelX, 660.1);
  doc.setFont('helvetica', 'normal');
  setTextBlack();
  text(data.stateName || 'TAMIL NADU', metaValStartX, 660.1);
  setTextGreen();
  // "State Code : 33" is one right-aligned string with the label and the
  // value packed together — split it into two colored segments so the
  // number itself is black while "State Code :" stays green.
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.6);
  const stateCodeVal = String(data.stateCode || '33');
  const stateCodeLabel = 'State Code : ';
  const stateCodeValW = doc.getTextWidth(stateCodeVal);
  setTextBlack();
  text(stateCodeVal, metaValX - stateCodeValW, 660.1);
  setTextGreen();
  text(stateCodeLabel, metaValX - stateCodeValW - doc.getTextWidth(stateCodeLabel), 660.1);

  doc.setFont('helvetica', 'bold');
  text('Transportation Mode :', metaLabelX, 649.7);
  doc.setFont('helvetica', 'normal');
  setTextBlack();
  text(data.transportMode || '', metaValStartX, 649.7);
  setTextGreen();

  doc.setFont('helvetica', 'bold');
  text('Vehicle :', metaLabelX, 639.2);
  doc.setFont('helvetica', 'normal');
  setTextBlack();
  text(data.vehicleNo || '', metaValStartX, 639.2);
  setTextGreen();

  doc.setFont('helvetica', 'bold');
  text('Date of Supply :', metaLabelX, 628.8);
  doc.setFont('helvetica', 'normal');
  setTextBlack();
  text(data.supplyDate || '', metaValStartX, 628.8);
  setTextGreen();

  doc.setFont('helvetica', 'bold');
  text('Place of Supply :', metaLabelX, 620.1);
  doc.setFont('helvetica', 'normal');
  setTextBlack();
  text(data.placeOfSupply || '', metaValStartX, 620.1);
  setTextGreen();

  // NOTE: the meta box (Invoice No. through Place of Supply) has NO internal
  // divider lines in the template — confirmed directly against the PDF's own
  // content stream, which shows a single unbroken box there. The rows are
  // separated by line spacing only, never by ruled lines.

  // GSTIN row — its own full-width band between the Billed-to/meta info
  // box above (bottom edge measured at y=615.46) and the product table
  // header below (top edge measured at y=598.42).
  hLine(28.0, 566.6, 615.46);

  // LEFT GSTIN label — baseline measured at y≈602.0 within that band.
  // Label green, the receiver's actual GSTIN (admin-entered) black.
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  text('GSTIN :', 32.2, 602.0);
  doc.setFont('helvetica', 'bold');
  setTextBlack();
  text(data.receiverGstin || '', 75.0, 602.0);
  setTextGreen();

  // ============================================================
  // 9. PRODUCT TABLE HEADER
  // ============================================================
  setLineWidth(0.96);

  // Precise header-row boundaries measured directly from invoice_template.pdf:
  // GSTIN-row bottom / header-row top = 598.42, header-row bottom (where the
  // first product row begins) = 577.15.
  const TABLE_TOP = 577.15;   // top of product table (y in PDF coords)
  const TABLE_BTM = 215.5;    // bottom of product table rows
  const TABLE_LEFT = 26.5;    // outermost left — matches the outer frame exactly
  const TABLE_RIGHT = 566.6;  // used for TEXT alignment on the right side only
                               // (amount columns etc.) — kept at its own measured
                               // position so no text shifts.
  // The table's own right-edge BORDER, however, used to be drawn at
  // TABLE_RIGHT too — just 1.48pt inside the thick outer frame (568.08),
  // close enough to read as two parallel lines rather than one border, as
  // the admin found by checking an actual downloaded bill. Every vLine that
  // draws the invoice's actual right-hand border (not text) now uses this
  // instead, so it lands exactly on the outer frame and only one line shows.
  const OUTER_RIGHT = 568.08;

  // Table column x-positions re-measured directly from the template's own
  // vertical rule positions (previous values drifted ~1pt right of true):
  // Sr col:   x=26.5, right border at x=50.8
  // Prod col: right border at x=295.9
  // HSN col:  right border at x=345.8
  // Meter col:right border at x=381.8
  // Qty col:  right border at x=417.8
  // Rate col: right border at x=487.9
  // Amt col:  right border at x=566.6 (= TABLE_RIGHT)

  const COL_X = {
    srLeft: 26.5,
    srRight: 50.8,
    prodRight: 295.9,
    hsnRight: 345.8,
    meterRight: 381.8,
    qtyRight: 417.8,
    rateRight: 487.9,
    amtRight: 566.6
  };

  // Table header row height = 22 -> from y=569 to y=591 (in PDF)
  const HEADER_TOP = 577.15;  // header row's bottom edge = first product row's top
  const HEADER_BTM = 598.42;  // header row's top edge = GSTIN row's bottom
  const HEADER_MID_Y = (HEADER_TOP + HEADER_BTM) / 2 + 3.5; // text baseline

  // Draw horizontal lines for header
  hLine(TABLE_LEFT, TABLE_RIGHT, HEADER_TOP);
  hLine(TABLE_LEFT, TABLE_RIGHT, HEADER_BTM);

  // Draw vertical lines for header
  vLine(TABLE_LEFT, HEADER_TOP, HEADER_BTM);
  vLine(COL_X.srRight, HEADER_TOP, HEADER_BTM);
  vLine(COL_X.prodRight, HEADER_TOP, HEADER_BTM);
  vLine(COL_X.hsnRight, HEADER_TOP, HEADER_BTM);
  vLine(COL_X.meterRight, HEADER_TOP, HEADER_BTM);
  vLine(COL_X.qtyRight, HEADER_TOP, HEADER_BTM);
  vLine(COL_X.rateRight, HEADER_TOP, HEADER_BTM);
  vLine(OUTER_RIGHT, HEADER_TOP, HEADER_BTM);

  // Header text
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');

  // Sr. sits on the upper line of the two-line "Sr. / No." stack, No. below it
  // (baselines measured directly from the template: 587.6 and 579.0).
  textCenter('Sr.', (TABLE_LEFT + COL_X.srRight) / 2, HEADER_BTM - 10.8, 8.5, true);
  textCenter('No.', (TABLE_LEFT + COL_X.srRight) / 2, HEADER_BTM - 19.4, 8.5, true);
  const COL_HEADER_Y = HEADER_BTM - 16.4; // matches the measured column-title baseline (≈582.0)
  textCenter('Name of the Product', (COL_X.srRight + COL_X.prodRight) / 2, COL_HEADER_Y, 9, true);
  textCenter('HSN', (COL_X.prodRight + COL_X.hsnRight) / 2, COL_HEADER_Y, 9, true);
  textCenter('Meter', (COL_X.hsnRight + COL_X.meterRight) / 2, COL_HEADER_Y, 9, true);
  textCenter('Qty', (COL_X.meterRight + COL_X.qtyRight) / 2, COL_HEADER_Y, 9, true);
  textCenter('Rate', (COL_X.qtyRight + COL_X.rateRight) / 2, COL_HEADER_Y, 9, true);
  textCenter('Amount', (COL_X.rateRight + TABLE_RIGHT) / 2, COL_HEADER_Y, 9, true);

  // ============================================================
  // 10. PRODUCT ITEM ROWS (15 Rows)
  // ============================================================
  // BUG FIX: rows must move DOWN the page as i increases, which in this
  // bottom-up coordinate system means SUBTRACTING from HEADER_TOP (the
  // header's own bottom edge), not adding to HEADER_BTM (its top edge).
  // ROW_H is also now computed precisely so 15 rows exactly fill the
  // space between the header and TABLE_BTM (matches the template exactly,
  // instead of the previous flat guess of 22pt which left a 23.5pt gap
  // unaccounted for and, combined with the wrong direction, sent rows
  // climbing up off the top of the page).
  const MAX_ROWS = 15;
  const TOTAL_ROW_H = 18.0;
  // Item rows span from HEADER_TOP down to (TABLE_BTM + TOTAL_ROW_H) — leaving
  // exactly 18pt of room below them for the Total row, whose own bottom edge
  // is TABLE_BTM (215.5), matching the template exactly.
  const ROW_H = (HEADER_TOP - (TABLE_BTM + TOTAL_ROW_H)) / MAX_ROWS; // ≈ 22.367
  const items = data.items || [];

  let totalQty = 0;
  let subtotal = 0;

  for (let i = 0; i < MAX_ROWS; i++) {
    const rowTop = HEADER_TOP - i * ROW_H;
    const rowBtm = rowTop - ROW_H;
    const rowTextY = rowBtm + 7; // text baseline sits ~7pt above the row's bottom line

    const item = items[i] || null;
    const qty = item ? (parseFloat(item.qty) || 0) : 0;
    const rate = item ? (parseFloat(item.rate) || 0) : 0;
    const amount = qty * rate;
    if (item) {
      totalQty += qty;
      subtotal += amount;
    }

    // Row horizontal lines
    hLine(TABLE_LEFT, TABLE_RIGHT, rowBtm);

    // Vertical lines for this row
    vLine(TABLE_LEFT, rowTop, rowBtm);
    vLine(COL_X.srRight, rowTop, rowBtm);
    vLine(COL_X.prodRight, rowTop, rowBtm);
    vLine(COL_X.hsnRight, rowTop, rowBtm);
    vLine(COL_X.meterRight, rowTop, rowBtm);
    vLine(COL_X.qtyRight, rowTop, rowBtm);
    vLine(COL_X.rateRight, rowTop, rowBtm);
    vLine(OUTER_RIGHT, rowTop, rowBtm);

    if (item) {
      doc.setFontSize(8.5);
      doc.setFont('helvetica', 'normal');
      // Every cell in a product row is per-invoice admin-entered data — black.
      setTextBlack();

      // Sr. No.
      textCenter(String(i + 1), (TABLE_LEFT + COL_X.srRight) / 2, rowTextY, 8.5);

      // Product Name - left aligned with 3pt padding
      doc.setFontSize(8);
      // Truncate if too long for column
      const prodMaxW = COL_X.prodRight - COL_X.srRight - 6;
      let prodName = item.name || '';
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      // Simple truncation
      while (doc.getTextWidth(prodName) > prodMaxW && prodName.length > 3) {
        prodName = prodName.slice(0, -4) + '...';
      }
      text(prodName, COL_X.srRight + 3, rowTextY);

      // HSN
      doc.setFontSize(8.5);
      textCenter(item.hsn || '5007', (COL_X.prodRight + COL_X.hsnRight) / 2, rowTextY, 8.5);

      // Meter
      textCenter(item.meter ? parseFloat(item.meter).toFixed(2) : '', (COL_X.hsnRight + COL_X.meterRight) / 2, rowTextY, 8.5);

      // Qty
      textCenter(qty ? String(qty) : '', (COL_X.meterRight + COL_X.qtyRight) / 2, rowTextY, 8.5);

      // Rate (right aligned)
      textRight(rate ? rate.toFixed(2) : '', COL_X.rateRight - 3, rowTextY, 8.5);

      // Amount (right aligned)
      textRight(amount ? amount.toFixed(2) : '', TABLE_RIGHT - 3, rowTextY, 8.5);
    }
  }
  setTextGreen();

  // ============================================================
  // 11. TOTAL ROW
  // ============================================================
  const TOTAL_ROW_TOP = HEADER_TOP - MAX_ROWS * ROW_H; // == TABLE_BTM + TOTAL_ROW_H
  const TOTAL_ROW_BTM = TOTAL_ROW_TOP - TOTAL_ROW_H;   // == TABLE_BTM exactly
  const TOTAL_TEXT_Y = TOTAL_ROW_BTM + 6;

  // Total row borders — per the admin's latest request: the "Total :" label
  // moved into the cell that used to hold the quantity total, so the divider
  // that used to sit at qtyRight (right before that cell) is removed too —
  // leaving one wide blank cell (Sr./Product/HSN/Meter/Qty) followed by the
  // "Total :" cell, then the Amount cell.
  hLine(TABLE_LEFT, TABLE_RIGHT, TOTAL_ROW_BTM);
  vLine(TABLE_LEFT, TOTAL_ROW_TOP, TOTAL_ROW_BTM);
  vLine(COL_X.rateRight, TOTAL_ROW_TOP, TOTAL_ROW_BTM);
  vLine(OUTER_RIGHT, TOTAL_ROW_TOP, TOTAL_ROW_BTM);

  // "Total :" label — now centered in the cell that used to show the
  // quantity total (the qty number itself is no longer printed here).
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  textCenter('Total :', (COL_X.qtyRight + COL_X.rateRight) / 2, TOTAL_TEXT_Y, 10, true);

  // Total Amount — right-aligned in the last cell. Computed from the
  // per-invoice product data, so it's black like the rest of that data.
  setTextBlack();
  textRight(subtotal.toFixed(2), TABLE_RIGHT - 3, TOTAL_TEXT_Y, 10, true);
  setTextGreen();

  // ============================================================
  // 12. BOTTOM LEFT / RIGHT SPLIT SECTION
  // ============================================================
  const BOTTOM_TOP = TOTAL_ROW_BTM;
  // Was 23.1 — 1.51pt above the outer frame's true bottom edge (21.59),
  // which read as a second parallel line running the full width of the
  // page along the very bottom, same issue as the right edge above.
  // Aligning it exactly with the outer frame removes that duplicate.
  const BOTTOM_BTM = 21.59;
  const SPLIT_X = 345.8;  // same as info section divider

  // Bottom section outer borders
  hLine(TABLE_LEFT, OUTER_RIGHT, BOTTOM_BTM);
  vLine(TABLE_LEFT, BOTTOM_BTM, BOTTOM_TOP);
  vLine(OUTER_RIGHT, BOTTOM_BTM, BOTTOM_TOP);
  vLine(SPLIT_X, BOTTOM_BTM, BOTTOM_TOP);

  // ============================================================
  // 13. AMOUNT IN WORDS (LEFT SIDE)
  // ============================================================
  // Box top border is fixed at y=215.5 (matches the original template
  // exactly). The box's BOTTOM edge, however, was previously fixed at
  // y=143.9 — far below where the label + up to 3 lines of words text
  // ever reach, leaving a large dead gap the admin flagged. That edge is
  // now sized to the content instead, with the freed height handed to the
  // Bank Details box below (which gets more generous, evenly-spread line
  // spacing so the space doesn't just pile up as one gap somewhere else).
  const WORDS_BOX_TOP = 215.5;
  const WORDS_LABEL_Y = WORDS_BOX_TOP - 9.5;   // a bit more headroom under
                                                // the top border than before
  const WORDS_LINE_GAP = 11;
  // Much more breathing room between the label and the first line of the
  // amount-in-words text, per the admin's request — a clear, generous gap
  // rather than the small bump used before.
  const WORDS_LABEL_TO_TEXT_GAP = 20;
  const WORDS_MAX_LINES = 3;
  const WORDS_BOX_BOTTOM = WORDS_LABEL_Y - WORDS_LABEL_TO_TEXT_GAP - WORDS_LINE_GAP * (WORDS_MAX_LINES - 1) - 12;

  setLineWidth(0.96);
  hLine(TABLE_LEFT, SPLIT_X, WORDS_BOX_TOP);

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  text('Total Invoice Amount in Words :', 35.9, WORDS_LABEL_Y);

  // Words text - wrap to fit. Normal weight now, not bold, per the admin's
  // request. This is the admin-entered/derived amount-in-words value, so
  // it's black; the label above stays green.
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  const wordsStr = data.amountWords || numberToIndianWords(data.amountAfterTax || 0);
  const maxWordW = SPLIT_X - TABLE_LEFT - 15;
  const wordLines = doc.splitTextToSize(wordsStr, maxWordW);
  let wY = WORDS_LABEL_Y - WORDS_LABEL_TO_TEXT_GAP;
  setTextBlack();
  wordLines.slice(0, WORDS_MAX_LINES).forEach(wl => {
    text(wl, 35.9, wY);
    wY -= WORDS_LINE_GAP;
  });
  setTextGreen();

  // ============================================================
  // 14. BANK DETAILS (LEFT SIDE)
  // ============================================================
  // Horizontal line between words and bank details
  // Bank details area now spans y=73.9 to WORDS_BOX_BOTTOM (taller than
  // before, absorbing the space freed above) — content spacing below is
  // opened up to match, instead of leaving one large blank patch.
  // The words/bank divider spans the full width (the seal box's own top
  // edge sits right at this same line in the template). The bank/terms
  // divider just below it, however, only ever spans to the seal box's
  // left edge (243.5) in the original — confirmed directly against the
  // template's own rects — so it must stop there too, not cross the seal
  // box's vertical border.
  hLine(TABLE_LEFT, SPLIT_X, WORDS_BOX_BOTTOM);
  // The Bank Details / Terms divider is drawn once, below, at the boundary
  // shared by both sections — it used to be drawn here AND again down by
  // the Terms heading, 0.9pt apart, which overlapped into a visibly
  // thicker line than the rest of the 0.96pt grid. y=73.45 matches the
  // template's own measured line (its rect spans 72.98..73.94).

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  const BANK_LABEL_Y = WORDS_BOX_BOTTOM - 10;
  text('BANK DETAILS :', 32.2, BANK_LABEL_Y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const bankLines = (data.bankDetailsText || '').split('\n');
  // Bank Details box got a little shorter now that the words box gave less
  // of its freed space away (more of it went to the label/text gap above
  // instead) — 14pt keeps the lines evenly spread with comfortable
  // clearance above the Terms divider rather than crowding it.
  // The bank account content is admin-entered/selected per invoice — black.
  let bankY = BANK_LABEL_Y - 14;
  setTextBlack();
  bankLines.forEach(bl => {
    if (bl.trim()) {
      text(bl.trim(), 32.2, bankY);
      bankY -= 14;
    }
  });
  setTextGreen();

  // Terms and Conditions — this is the single Bank Details/Terms divider
  // (see the comment above where the box heights are set up). It stops at
  // the seal box's left edge (243.5), not SPLIT_X — confirmed directly
  // against the original template — otherwise it cuts straight across the
  // seal box's vertical border, producing a stray "+" crossing.
  hLine(TABLE_LEFT, 243.5, 73.45);
  // "Terms and Conditions :" title is always shown/constant. Only the
  // toggleable part is the numbered list beneath it — same on/off pattern
  // as the watermark / e-seal / e-signature toggles — when off, just the
  // 3 lines don't render, leaving that part of the box empty (the box
  // outline and the title itself stay either way).
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'bold');
  text('Terms and Conditions :', 32.2, 59.4);

  if (data.includeTerms !== false) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    const termsLines = [
      '1. Goods once sold will not be taken back or exchanged.',
      '2. All disputes are subject to Arani Jurisdiction only.',
      '3. Interest @ 18% p.a. if payment not made on due date.'
    ];
    let tY = 48.0;
    termsLines.forEach(tl => {
      text(tl, 32.2, tY);
      tY -= 10;
    });
  }

  // (seal)
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  text('(seal)', 287.2, 48.8);

  // Seal box — its own bordered column, exactly as in the original template
  // (a single tall box spanning the combined Bank Details + Terms height,
  // with no internal divider). Only the left edge was missing; the right
  // edge is the same SPLIT_X line already drawn for the rest of this
  // section, and the top edge is the words/bank divider line above, which
  // already spans the full width including this column.
  vLine(243.5, BOTTOM_BTM, WORDS_BOX_BOTTOM);

  // E-Seal artwork — the uploaded custom seal if the admin added one,
  // otherwise the canvas-generated round stamp. Sits just above the
  // "(seal)" label, centred in the seal column (x 243.5..345.8).
  if (data.includeSeal) {
    const customSealEl = document.getElementById('sheet-custom-seal-img');
    const defaultSealEl = document.getElementById('sheet-default-seal');
    const sealEl = (data.customSealUrl && customSealEl && customSealEl.complete && customSealEl.naturalWidth)
      ? customSealEl
      : defaultSealEl;
    drawFittedImage(sealEl, 294.65, 56, 68, 68);
  }

  // ============================================================
  // 15. RIGHT SIDE: TAX BREAKDOWN TABLE
  // ============================================================
  // Tax rows from template:
  // Discount:             y=202.6
  // Total Before Tax:     y=184.3
  // CGST %:               y=166.7
  // SGST %:               y=149.1
  // IGST %:               y=131.9
  // Tax Amount GST:       y=114.3
  // Total After Tax:      y=96.5   (grand total row)
  // GST Rev Charge:       y=78.9

  const amtRight = TABLE_RIGHT - 3;
  // CGST/SGST/IGST rows carry their admin-entered percentage inline inside
  // the label ("Add : CGST 2.5% :") — split into labelPrefix/pctVal/labelSuffix
  // so the percentage number itself can be drawn black while the rest of the
  // label stays green, same rule as every other label/value pair below.
  const taxRows = [
    { label: 'Discount', val: (data.discount || 0).toFixed(2), y: 202.6, bold: false },
    { label: 'Total Amount Before Tax', val: (data.amountBeforeTax || 0).toFixed(2), y: 184.3, bold: false },
    { labelPrefix: 'Add : CGST ', pctVal: String(data.cgstPct ?? ''), labelSuffix: '%', val: (data.cgstAmount || 0).toFixed(2), y: 166.7, bold: false },
    { labelPrefix: 'Add : SGST ', pctVal: String(data.sgstPct ?? ''), labelSuffix: '%', val: (data.sgstAmount || 0).toFixed(2), y: 149.1, bold: false },
    { labelPrefix: 'Add : IGST ', pctVal: String(data.igstPct ?? ''), labelSuffix: '%', val: (data.igstAmount || 0).toFixed(2), y: 131.9, bold: false },
    { label: 'Tax Amount : GST', val: (data.taxAmountGst || 0).toFixed(2), y: 114.3, bold: false },
    { label: 'GST Payable on Reverse Charge', val: (data.gstReverseCharge || 0).toFixed(2), y: 78.9, bold: false },
  ];

  // Draw row divider lines on the right side (same x as left)
  setLineWidth(0.96);
  [215.5, 197.0, 178.7, 160.9, 143.3, 125.8, 108.5, 91.0, 73.0].forEach(divY => {
    hLine(SPLIT_X, TABLE_RIGHT, divY);
  });

  // Right side vertical dividers within tax table
  vLine(487.9, 73.0, BOTTOM_TOP); // between label and value columns

  // Each row.y below was measured directly from the true template's own
  // text baselines. The "+6" that used to be added here doesn't correspond
  // to anything in the source — it just pushed every line ~6pt higher than
  // it should sit, which is exactly why the text was crowding (and in
  // places crossing) the divider line above it. Using row.y as the actual
  // baseline matches the template closely.
  taxRows.forEach(row => {
    doc.setFontSize(8.5);
    doc.setFont('helvetica', row.bold ? 'bold' : 'normal');
    setTextGreen();
    if (row.labelPrefix !== undefined) {
      // Three-part inline label: green prefix + black percentage + green "%".
      text(row.labelPrefix, SPLIT_X + 4, row.y);
      const prefixW = doc.getTextWidth(row.labelPrefix);
      setTextBlack();
      text(row.pctVal, SPLIT_X + 4 + prefixW, row.y);
      const pctW = doc.getTextWidth(row.pctVal);
      setTextGreen();
      text(row.labelSuffix, SPLIT_X + 4 + prefixW + pctW, row.y);
    } else {
      text(row.label, SPLIT_X + 4, row.y);
    }
    // Every row's amount is computed from admin-entered data — black.
    setTextBlack();
    textRight(row.val, amtRight, row.y, 8.5, row.bold);
    setTextGreen();
  });

  // Grand Total row — background is plain white now (per the admin's
  // request), not the light green tint used before.
  // Total Amount After Tax: y=96.5
  doc.setFillColor(255, 255, 255);
  fillRect(SPLIT_X, 91.0, TABLE_RIGHT - SPLIT_X, 17.5, 'F');

  // The fill above paints over whatever border lines already passed
  // through this row. Redraw the ones this row actually needs on top:
  //  - the left edge (SPLIT_X) and the label/value divider (487.9) at
  //    their full stroke weight — the fill was clipping the left edge to
  //    half its thickness, which is the "border thickness missing on the
  //    left" the admin spotted.
  //  - the top/bottom rules, so they stay one unbroken line (this is the
  //    same broken "L" fix from before, unaffected by the color change).
  //  - the RIGHT edge is deliberately NOT redrawn here: this row's right
  //    side was showing as two close parallel lines (the table's own
  //    content-line PLUS the page's outer frame, redrawn later on top of
  //    everything). Leaving the content-line erased here means only the
  //    single outer frame line shows through, giving this one row a clean
  //    single line instead of the double — exactly what was asked for.
  setGreen();
  setLineWidth(0.96);
  vLine(SPLIT_X, 91.0, 108.5);
  vLine(487.9, 91.0, 108.5);
  hLine(SPLIT_X, TABLE_RIGHT, 91.0);
  hLine(SPLIT_X, TABLE_RIGHT, 108.5);

  setTextGreen();

  // Normal weight now, not bold, per the admin's request. Label green,
  // the grand total figure itself black (computed from admin-entered data).
  doc.setFontSize(9.5);
  doc.setFont('helvetica', 'normal');
  text('Total Amount After Tax', SPLIT_X + 4, 96.5);
  setTextBlack();
  textRight(`Rs. ${(data.amountAfterTax || 0).toFixed(2)}`, amtRight, 96.5, 9.5, false);
  setTextGreen();

  // ============================================================
  // 16. DECLARATION + COMPANY SIGNATURE (Right side)
  // ============================================================
  // Bottom right from y=23.1 to y=73 (h=49.4)
  // Certified that...
  doc.setFontSize(6);
  doc.setFont('helvetica', 'normal');
  text('Certified that the Particulars given above are true and Correct', 352.6, 66.9);

  // For K.P. PARAMATHMAN & BROTHERS.
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  text('For K. P. PARAMATHMAN & BROTHERS.', 353.2, 57.7);

  // Authorized Signature
  doc.setFontSize(6.5);
  doc.setFont('helvetica', 'bold');
  text('Authorized Signature', 433.8, 25.3);

  // E-Signature artwork — the uploaded custom signature if the admin added
  // one, otherwise the canvas-generated cursive default. Right-aligned,
  // sitting between the "For K.P. ..." line and the "Authorized Signature" label.
  if (data.includeSign) {
    const customSignEl = document.getElementById('sheet-custom-signature-img');
    const defaultSignEl = document.getElementById('sheet-default-signature');
    const signEl = (data.customSignUrl && customSignEl && customSignEl.complete && customSignEl.naturalWidth)
      ? customSignEl
      : defaultSignEl;
    drawFittedImageRight(signEl, 562.0, 30.0, 120, 24);
  }

  // ============================================================
  // 17. HORIZONTAL LINE BELOW INFO SECTION (before table headers)
  // ============================================================
  // Already placed above. Need to confirm the line at ~603.0 exists.
  // Done above.

  // ============================================================
  // 18. TOP DIVIDER LINE (below company header)
  // ============================================================
  // Already drawn above at y=725.0.

  // ============================================================
  // 19. FOOTER LINE AT BOTTOM
  // ============================================================
  // Already outer border covers this.

  // ============================================================
  // 20. VERTICAL DIVIDER in INFO SECTION
  // ============================================================
  // Already drawn above at x=346.9 for y=603 to y=701.

  // ============================================================
  // 21. OUTER FRAME — redrawn last, on top, at its true measured thickness.
  //     invoice_template.pdf uses a uniform 0.96pt grid throughout, with
  //     only this single outermost rectangle drawn heavier at 1.44pt.
  //     Exact bounds measured from the template: x 26.52..568.08, y(top-
  //     origin) 24.36..818.64 → bottom-origin y 21.59..818.64.
  // ============================================================
  setLineWidth(1.44);
  setGreen();
  strokeRect(26.52, 21.59, 541.56, 797.05);

  return doc;
}

/**
 * Indian Number to Words
 */
function numberToIndianWords(num) {
  if (!num || isNaN(num) || num === 0) return 'Zero Rupees Only';

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
    'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function conv(n) {
    if (n === 0) return '';
    if (n < 20) return ones[n] + ' ';
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? ' ' + ones[n % 10] : '') + ' ';
    return ones[Math.floor(n / 100)] + ' Hundred ' + conv(n % 100);
  }

  const rounded = Math.round(num * 100) / 100;
  const [intStr, decStr = '00'] = rounded.toString().split('.');
  let n = parseInt(intStr, 10);
  const paise = parseInt(decStr.padEnd(2, '0').substring(0, 2), 10);

  let words = '';
  if (n >= 10000000) { words += conv(Math.floor(n / 10000000)) + 'Crore '; n %= 10000000; }
  if (n >= 100000) { words += conv(Math.floor(n / 100000)) + 'Lakh '; n %= 100000; }
  if (n >= 1000) { words += conv(Math.floor(n / 1000)) + 'Thousand '; n %= 1000; }
  words += conv(n);

  let result = 'Rupees ' + words.trim();
  if (paise > 0) result += ' and ' + conv(paise).trim() + ' Paise';
  return result + ' Only';
}
