/**
 * K.P. PARAMATHMAN & BROTHERS - GST TAX INVOICE PORTAL
 * Master Reference PDF (invoice_template(5).pdf) Generation Engine
 * Color: Deep Silk Green (#1F6B48 / rgb(31, 107, 72))
 */

// =============================================================================
// 1. PRE-DEFINED DATABASES
// =============================================================================

const CLIENTS_DB = [
  {
    id: "client-1",
    name: "M/s. Sri Lakshmi Silks & Sarees",
    address: "Door No. 45/12, Gandhi Bazaar Road,\nNear Flower Market, Kanchipuram - 631 501",
    gstin: "33AAAAA0000A1Z5",
    state: "TAMIL NADU",
    stateCode: "33",
    phone: "9840123456",
    placeOfSupply: "Kanchipuram"
  },
  {
    id: "client-2",
    name: "M/s. Kalanikethan Silk Emporium",
    address: "128, Usman Road, T. Nagar,\nChennai - 600 017, Tamil Nadu",
    gstin: "33AAACK1234F1Z8",
    state: "TAMIL NADU",
    stateCode: "33",
    phone: "9941234567",
    placeOfSupply: "Chennai"
  },
  {
    id: "client-3",
    name: "M/s. Mysore Saree Udyog",
    address: "Commercial Street, Tasker Town,\nBangalore - 560 001, Karnataka",
    gstin: "29AABCM5678D1Z2",
    state: "KARNATAKA",
    stateCode: "29",
    phone: "9880123456",
    placeOfSupply: "Bangalore"
  },
  {
    id: "client-4",
    name: "M/s. RMKV Silks Pvt. Ltd.",
    address: "South Car Street, Tirunelveli Town,\nTirunelveli - 627 006",
    gstin: "33AAACR7890K1Z4",
    state: "TAMIL NADU",
    stateCode: "33",
    phone: "9443123456",
    placeOfSupply: "Tirunelveli"
  },
  {
    id: "client-5",
    name: "M/s. Nalli Chinnasamy Chetty",
    address: "9, Nageswaran Road, Panagal Park,\nT. Nagar, Chennai - 600 017",
    gstin: "33AAACN4321B1Z9",
    state: "TAMIL NADU",
    stateCode: "33",
    phone: "9841098765",
    placeOfSupply: "Chennai"
  },
  {
    id: "client-6",
    name: "M/s. Pothys Silk Paradise",
    address: "Opp. VOC Park, Cross Cut Road,\nCoimbatore - 641 012",
    gstin: "33AAACP9876H1Z1",
    state: "TAMIL NADU",
    stateCode: "33",
    phone: "9894123456",
    placeOfSupply: "Coimbatore"
  },
  {
    id: "client-7",
    name: "M/s. Chennai Silks Heritage",
    address: "Kumaran Road, Near Railway Station,\nTirupur - 641 601",
    gstin: "33AAATC6543M1Z3",
    state: "TAMIL NADU",
    stateCode: "33",
    phone: "9789123456",
    placeOfSupply: "Tirupur"
  }
];

const PRODUCTS_DB = [
  { name: "Pure Silk Saree - Traditional Zari", hsn: "5007", meter: 6.20, defaultRate: 6500 },
  { name: "Handloom Silk Saree - Contrast Border", hsn: "5007", meter: 6.20, defaultRate: 4800 },
  { name: "Soft Silk Saree - Gold Butta", hsn: "5007", meter: 6.20, defaultRate: 3600 },
  { name: "Kanchi Pattu Bridal Silk Saree", hsn: "5007", meter: 6.20, defaultRate: 12500 },
  { name: "Kora Silk Handloom Saree", hsn: "5007", meter: 5.50, defaultRate: 2800 },
  { name: "Tussar Silk Handcrafted Saree", hsn: "5007", meter: 6.00, defaultRate: 4200 },
  { name: "Pure Handloom Silk Dhoti & Angavastram", hsn: "5208", meter: 4.00, defaultRate: 2200 },
  { name: "Hand-Loom Silk Cotton Saree", hsn: "5007", meter: 6.20, defaultRate: 1850 },
  { name: "Tissue Silk Designer Saree", hsn: "5007", meter: 6.20, defaultRate: 7800 },
  { name: "Organza Pure Silk Saree", hsn: "5007", meter: 6.20, defaultRate: 5400 }
];

const BANKS_DB = [
  {
    id: "bank-sbi",
    name: "State Bank of India - Kilpattu / Arani",
    text: "Bank : State Bank of India\nA/C No : 38291048291\nIFSC : SBIN0001234\nBranch : Arani / Kilpattu"
  },
  {
    id: "bank-indian",
    name: "Indian Bank - Arani Market",
    text: "Bank : Indian Bank\nA/C No : 60293847192\nIFSC : IDIB000A123\nBranch : Arani Market"
  },
  {
    id: "bank-hdfc",
    name: "HDFC Bank - Tiruvannamalai",
    text: "Bank : HDFC Bank\nA/C No : 50200039281726\nIFSC : HDFC0001423\nBranch : Tiruvannamalai"
  },
  {
    id: "bank-canara",
    name: "Canara Bank - Polur",
    text: "Bank : Canara Bank\nA/C No : 192837465019\nIFSC : CNRB0002837\nBranch : Polur Town"
  }
];

// =============================================================================
// 2. APPLICATION STATE
// =============================================================================

const AppState = {
  authenticated: false,
  copyType: "Original for Recipient",
  invoiceNo: "101",
  invoiceDate: getTodayDateString(),
  reverseCharge: "",
  billedToName: "M/s. Sri Lakshmi Silks & Sarees",
  billedToAddress: "Door No. 45/12, Gandhi Bazaar Road,\nNear Flower Market, Kanchipuram - 631 501",
  receiverGstin: "33AAAAA0000A1Z5",
  receiverPhone: "9840123456",
  stateName: "TAMIL NADU",
  stateCode: "33",
  transportMode: "",
  vehicleNo: "",
  supplyDate: getTodayDateString(),
  // Left blank by default — Place of Supply is invoice-specific and should
  // only ever be filled in by the admin typing it themselves, never
  // pre-filled or auto-derived from a customer record.
  placeOfSupply: "",
  
  // Product Items (Array of 1 to 15 items)
  items: [
    {
      id: 1,
      name: "Pure Silk Saree - Traditional Zari",
      hsn: "5007",
      meter: 6.20,
      qty: 10,
      rate: 6500,
      amount: 65000
    },
    {
      id: 2,
      name: "Handloom Silk Saree - Contrast Border",
      hsn: "5007",
      meter: 6.20,
      qty: 5,
      rate: 4800,
      amount: 24000
    }
  ],

  // Financials & Calculations
  discount: 0,
  amountBeforeTax: 89000,
  cgstPct: 2.5,
  sgstPct: 2.5,
  igstPct: 0,
  cgstAmount: 2225,
  sgstAmount: 2225,
  igstAmount: 0,
  taxAmountGst: 4450,
  amountAfterTax: 93450,
  gstReverseCharge: 0,
  amountWords: "",

  // Bank & E-Assets
  bankDetailsText: BANKS_DB[0].text,
  includeWatermark: true,
  includeTerms: true,
  includeSeal: true,
  customSealUrl: "",
  includeSign: true,
  customSignUrl: "",

  // Cached data-URLs for the canvas-generated default seal & signature —
  // generated once on load so the live preview and the downloaded PDF
  // always render the identical asset (true WYSIWYG).
  defaultSealDataUrl: "",
  defaultSignatureDataUrl: ""
};

// =============================================================================
// 3. INITIALIZATION ON DOM READY
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  initAuthentication();
  populateDropdowns();
  bindFormInputs();
  bindProductListEvents();
  bindActionButtons();
  bindUploadHandlers();
  initDefaultSealAndSignature();
  bindSectionNavigation();

  // Initial Calculation & UI Sync
  recalculateAllTotals();
  renderAllSheetElements();
  showSection(1);
  updateSectionNavStatus();
});

function getTodayDateString() {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDateForDisplay(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
}

// =============================================================================
// 4. ADMIN AUTHENTICATION
// =============================================================================

function initAuthentication() {
  const loginView = document.getElementById("login-view");
  const portalView = document.getElementById("portal-view");
  const loginForm = document.getElementById("login-form");
  const loginErrorMsg = document.getElementById("login-error-msg");
  const togglePwdBtn = document.getElementById("toggle-pwd-btn");
  const pwdInput = document.getElementById("admin-password");
  const logoutBtn = document.getElementById("btn-logout");

  const isAuth = sessionStorage.getItem("kpp_admin_auth") === "true" || localStorage.getItem("kpp_admin_auth") === "true";
  if (isAuth) {
    AppState.authenticated = true;
    showPortalView();
  }

  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.addEventListener("click", () => {
      if (pwdInput.type === "password") {
        pwdInput.type = "text";
        togglePwdBtn.textContent = "ðŸ™ˆ";
      } else {
        pwdInput.type = "password";
        togglePwdBtn.textContent = "ðŸ‘ï¸";
      }
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("admin-username").value.trim();
      const password = document.getElementById("admin-password").value;
      const remember = document.getElementById("remember-me").checked;

      if (username.toLowerCase() === "admin" && (password === "admin123" || password === "kpp2026" || password === "admin")) {
        AppState.authenticated = true;
        loginErrorMsg.style.display = "none";

        if (remember) {
          localStorage.setItem("kpp_admin_auth", "true");
        }
        sessionStorage.setItem("kpp_admin_auth", "true");

        showToast("Welcome back, Admin! Invoice Portal Ready.", "success");
        showPortalView();
      } else {
        loginErrorMsg.style.display = "block";
        loginErrorMsg.textContent = "âš ï¸ Invalid credentials. Use admin / admin123.";
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      AppState.authenticated = false;
      sessionStorage.removeItem("kpp_admin_auth");
      localStorage.removeItem("kpp_admin_auth");
      portalView.style.display = "none";
      loginView.style.display = "flex";
      showToast("Logged out successfully.", "info");
    });
  }
}

function showPortalView() {
  const loginView = document.getElementById("login-view");
  const portalView = document.getElementById("portal-view");
  loginView.style.display = "none";
  portalView.style.display = "block";
}

// =============================================================================
// 5. POPULATE DROPDOWNS & SELECTORS
// =============================================================================

function populateDropdowns() {
  const clientSelect = document.getElementById("select-client-db");
  if (clientSelect) {
    clientSelect.innerHTML = `<option value="">-- Choose Client from DB (Auto-Fill) --</option>`;
    CLIENTS_DB.forEach(client => {
      const opt = document.createElement("option");
      opt.value = client.id;
      opt.textContent = `${client.name} (${client.state})`;
      clientSelect.appendChild(opt);
    });
  }

  const bankSelect = document.getElementById("select-bank-details");
  if (bankSelect) {
    bankSelect.innerHTML = "";
    BANKS_DB.forEach((bank, idx) => {
      const opt = document.createElement("option");
      opt.value = bank.id;
      opt.textContent = bank.name;
      if (idx === 0) opt.selected = true;
      bankSelect.appendChild(opt);
    });
  }

  const today = getTodayDateString();
  const dateInput = document.getElementById("input-invoice-date");
  const supplyInput = document.getElementById("input-supply-date");
  if (dateInput) dateInput.value = today;
  if (supplyInput) supplyInput.value = today;
  
  const bankTextarea = document.getElementById("input-custom-bank");
  if (bankTextarea) bankTextarea.value = BANKS_DB[0].text;
}

// =============================================================================
// 6. FORM BINDINGS & REAL-TIME EVENT HANDLERS
// =============================================================================

// Fills the receiver fields (name, address, GSTIN, phone, state & GST %)
// from a CLIENTS_DB record. Used both by the "Select Customer from
// Database" dropdown and by typing in a matching GSTIN directly — the
// address textarea is only ever given a .value, never made readonly, so
// it's always left fully editable after the auto-fill.
function applyClientAutoFill(found) {
  if (!found) return;

  document.getElementById("input-billed-to-name").value = found.name;
  document.getElementById("input-billed-to-address").value = found.address;
  document.getElementById("input-receiver-gstin").value = found.gstin;
  document.getElementById("input-receiver-phone").value = found.phone || "";
  document.getElementById("input-state-name").value = found.state;
  document.getElementById("input-state-code").value = found.stateCode;
  // Place of Supply is intentionally NOT auto-filled here — it's
  // invoice-specific (where the goods are actually delivered, which can
  // differ from the customer's saved address) and should only ever be
  // typed in directly by the admin.

  AppState.billedToName = found.name;
  AppState.billedToAddress = found.address;
  AppState.receiverGstin = found.gstin;
  AppState.receiverPhone = found.phone;
  AppState.stateName = found.state;
  AppState.stateCode = found.stateCode;

  if (found.stateCode !== "33") {
    document.getElementById("input-cgst-pct").value = "0";
    document.getElementById("input-sgst-pct").value = "0";
    document.getElementById("input-igst-pct").value = "5";
    AppState.cgstPct = 0;
    AppState.sgstPct = 0;
    AppState.igstPct = 5;
  } else {
    document.getElementById("input-cgst-pct").value = "2.5";
    document.getElementById("input-sgst-pct").value = "2.5";
    document.getElementById("input-igst-pct").value = "0";
    AppState.cgstPct = 2.5;
    AppState.sgstPct = 2.5;
    AppState.igstPct = 0;
  }

  recalculateAllTotals();
  renderAllSheetElements();
}

function bindFormInputs() {
  bindInput("input-copy-type", (val) => {
    AppState.copyType = val;
    document.getElementById("sheet-copy-type").textContent = val;
    const footerCopy = document.getElementById("sheet-footer-copy");
    if (footerCopy) footerCopy.textContent = val;
  });

  bindInput("input-invoice-no", (val) => {
    AppState.invoiceNo = val || "101";
    document.getElementById("sheet-invoice-no").textContent = AppState.invoiceNo;
    const activeBillEl = document.getElementById("active-bill-indicator");
    if (activeBillEl) activeBillEl.innerHTML = `Active Invoice: <b>${AppState.invoiceNo}</b>`;
  });

  bindInput("input-invoice-date", (val) => {
    AppState.invoiceDate = val;
    document.getElementById("sheet-invoice-date").textContent = formatDateForDisplay(val);
  });

  bindInput("input-reverse-charge", (val) => {
    AppState.reverseCharge = val;
    document.getElementById("sheet-reverse-charge").textContent = val;
  });

  const clientSelect = document.getElementById("select-client-db");
  if (clientSelect) {
    clientSelect.addEventListener("change", (e) => {
      const selectedId = e.target.value;
      const found = CLIENTS_DB.find(c => c.id === selectedId);
      if (found) {
        applyClientAutoFill(found);
        AppState._lastGstinAutoFillValue = found.gstin.toUpperCase();
        showToast(`Auto-filled details for ${found.name}`, "info");
      }
    });
  }

  bindInput("input-billed-to-name", (val) => {
    AppState.billedToName = val;
    document.getElementById("sheet-billed-name").textContent = val;
  });

  bindInput("input-billed-to-address", (val) => {
    AppState.billedToAddress = val;
    document.getElementById("sheet-billed-address").innerHTML = (val || "").replace(/\n/g, "<br>");
  });

  bindInput("input-receiver-gstin", (val) => {
    const upper = (val || "").toUpperCase();
    AppState.receiverGstin = upper;
    document.getElementById("sheet-billed-gstin").textContent = AppState.receiverGstin;

    // Once a full 15-character GSTIN is typed in, auto-fill the matching
    // saved customer's name & address — the address field stays a normal
    // editable textarea throughout, so it can still be adjusted afterward.
    if (upper.length === 15) {
      if (upper !== AppState._lastGstinAutoFillValue) {
        const match = CLIENTS_DB.find(c => c.gstin.toUpperCase() === upper);
        if (match) {
          AppState._lastGstinAutoFillValue = upper;
          applyClientAutoFill(match);
          showToast(`Matched saved customer: ${match.name}`, "info");
        }
      }
    } else {
      AppState._lastGstinAutoFillValue = null;
    }
  });

  bindInput("input-state-name", (val) => {
    AppState.stateName = val;
    document.getElementById("sheet-state-name").textContent = val;
  });

  bindInput("input-state-code", (val) => {
    AppState.stateCode = val;
    document.getElementById("sheet-state-code").textContent = val;
  });

  bindInput("input-transport-mode", (val) => {
    AppState.transportMode = val;
    document.getElementById("sheet-transport-mode").textContent = val;
  });

  bindInput("input-vehicle-no", (val) => {
    AppState.vehicleNo = val.toUpperCase();
    document.getElementById("sheet-vehicle-no").textContent = AppState.vehicleNo;
  });

  bindInput("input-supply-date", (val) => {
    AppState.supplyDate = val;
    document.getElementById("sheet-supply-date").textContent = formatDateForDisplay(val);
  });

  bindInput("input-place-supply", (val) => {
    AppState.placeOfSupply = val;
    document.getElementById("sheet-place-supply").textContent = val;
  });

  bindInput("input-discount", (val) => {
    AppState.discount = parseFloat(val) || 0;
    recalculateAllTotals();
  });

  bindInput("input-amount-before-tax", (val) => {
    AppState.amountBeforeTax = parseFloat(val) || 0;
    recalculateTaxesOnly();
    renderFinancialSheet();
  });

  bindInput("input-cgst-pct", (val) => {
    AppState.cgstPct = parseFloat(val) || 0;
    recalculateTaxesOnly();
    renderFinancialSheet();
  });

  bindInput("input-sgst-pct", (val) => {
    AppState.sgstPct = parseFloat(val) || 0;
    recalculateTaxesOnly();
    renderFinancialSheet();
  });

  bindInput("input-igst-pct", (val) => {
    AppState.igstPct = parseFloat(val) || 0;
    recalculateTaxesOnly();
    renderFinancialSheet();
  });

  bindInput("input-tax-amount-gst", (val) => {
    AppState.taxAmountGst = parseFloat(val) || 0;
    AppState.amountAfterTax = AppState.amountBeforeTax + AppState.taxAmountGst;
    document.getElementById("input-amount-after-tax").value = AppState.amountAfterTax.toFixed(2);
    AppState.amountWords = numberToIndianWords(AppState.amountAfterTax);
    document.getElementById("input-amount-words").value = AppState.amountWords;
    renderFinancialSheet();
  });

  bindInput("input-amount-after-tax", (val) => {
    AppState.amountAfterTax = parseFloat(val) || 0;
    AppState.amountWords = numberToIndianWords(AppState.amountAfterTax);
    document.getElementById("input-amount-words").value = AppState.amountWords;
    renderFinancialSheet();
  });

  bindInput("input-gst-reverse-charge", (val) => {
    AppState.gstReverseCharge = parseFloat(val) || 0;
    document.getElementById("sheet-reverse-charge-val").textContent = AppState.gstReverseCharge.toFixed(2);
  });

  bindInput("input-amount-words", (val) => {
    AppState.amountWords = val;
    document.getElementById("sheet-amount-words").textContent = val;
  });

  const bankSelect = document.getElementById("select-bank-details");
  if (bankSelect) {
    bankSelect.addEventListener("change", (e) => {
      const selectedId = e.target.value;
      const found = BANKS_DB.find(b => b.id === selectedId);
      if (found) {
        AppState.bankDetailsText = found.text;
        document.getElementById("input-custom-bank").value = found.text;
        document.getElementById("sheet-bank-content").innerHTML = found.text.replace(/\n/g, "<br>");
      }
    });
  }

  bindInput("input-custom-bank", (val) => {
    AppState.bankDetailsText = val;
    document.getElementById("sheet-bank-content").innerHTML = (val || "").replace(/\n/g, "<br>");
  });
}

function bindInput(elementId, callback) {
  const el = document.getElementById(elementId);
  if (!el) return;
  el.addEventListener("input", (e) => callback(e.target.value));
  el.addEventListener("change", (e) => callback(e.target.value));
}

// =============================================================================
// 7. DYNAMIC PRODUCT ITEMS (MIN 1, MAX 15)
// =============================================================================

function bindProductListEvents() {
  const addBtn = document.getElementById("btn-add-product-row");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      addProductRow();
    });
  }
  renderProductFormCards();
}

function addProductRow(presetData = null) {
  if (AppState.items.length >= 15) {
    showToast("Maximum 15 product items reached for single A4 page fit.", "error");
    return;
  }

  const newItem = presetData || {
    id: Date.now() + Math.random(),
    name: "Pure Silk Saree - Traditional Zari",
    hsn: "5007",
    meter: 6.20,
    qty: 1,
    rate: 5000,
    amount: 5000
  };

  AppState.items.push(newItem);
  renderProductFormCards();
  recalculateAllTotals();
  showToast(`Added product item #${AppState.items.length}`, "success");
}

function removeProductRow(index) {
  if (AppState.items.length <= 1) {
    showToast("Invoice must contain at least 1 product item.", "error");
    return;
  }
  AppState.items.splice(index, 1);
  renderProductFormCards();
  recalculateAllTotals();
  showToast("Product row removed.", "info");
}

function renderProductFormCards() {
  const listContainer = document.getElementById("product-items-form-list");
  const countBadge = document.getElementById("items-count-badge");
  if (!listContainer) return;

  if (countBadge) {
    countBadge.textContent = `${AppState.items.length} / 15`;
  }

  listContainer.innerHTML = "";

  AppState.items.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "product-row-card";
    card.innerHTML = `
      <div class="row-card-top">
        <span class="row-index-pill">Item #${idx + 1}</span>
        <div class="flex-align">
          <span class="row-calc-preview">₹ ${(item.amount || 0).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
          ${AppState.items.length > 1 ? `<button type="button" class="btn-danger-sm" onclick="removeProductRow(${idx})" title="Remove item">&times; Remove</button>` : ''}
        </div>
      </div>

      <div class="form-group quick-select-product">
        <select class="form-control" onchange="onSelectProductPreset(${idx}, this.value)">
          <option value="">-- Choose from Silk Saree Variety DB --</option>
          ${PRODUCTS_DB.map(p => `<option value="${p.name}" ${p.name === item.name ? 'selected' : ''}>${p.name} (HSN: ${p.hsn})</option>`).join('')}
        </select>
      </div>

      <div class="form-group">
        <label class="form-label" style="font-size: 0.78rem;">Product Name / Description</label>
        <input type="text" class="form-control font-bold" value="${escapeHtml(item.name)}" 
          placeholder="Enter product description" oninput="onItemFieldChange(${idx}, 'name', this.value)">
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label" style="font-size: 0.78rem;">HSN Code</label>
          <input type="text" class="form-control" value="${escapeHtml(item.hsn || '5007')}" 
            placeholder="5007" oninput="onItemFieldChange(${idx}, 'hsn', this.value)">
        </div>

        <div class="form-group">
          <label class="form-label" style="font-size: 0.78rem;">Meter</label>
          <input type="number" step="any" class="form-control" value="${item.meter || ''}" 
            placeholder="e.g. 6.20" oninput="onItemFieldChange(${idx}, 'meter', this.value)">
        </div>
      </div>

      <div class="form-grid-2">
        <div class="form-group">
          <label class="form-label" style="font-size: 0.78rem;">Quantity (Qty) <span class="req">*</span></label>
          <input type="number" step="any" min="1" class="form-control font-bold" value="${item.qty || 1}" 
            placeholder="Qty" oninput="onItemFieldChange(${idx}, 'qty', this.value)">
        </div>

        <div class="form-group">
          <label class="form-label" style="font-size: 0.78rem;">Rate per unit (₹) <span class="req">*</span></label>
          <input type="number" step="any" min="0" class="form-control font-bold" value="${item.rate || 0}" 
            placeholder="Rate" oninput="onItemFieldChange(${idx}, 'rate', this.value)">
        </div>
      </div>
    `;
    listContainer.appendChild(card);
  });
}

window.removeProductRow = removeProductRow;

window.onSelectProductPreset = function(index, productName) {
  const preset = PRODUCTS_DB.find(p => p.name === productName);
  if (preset && AppState.items[index]) {
    AppState.items[index].name = preset.name;
    AppState.items[index].hsn = preset.hsn;
    AppState.items[index].meter = preset.meter;
    if (!AppState.items[index].rate || AppState.items[index].rate === 0) {
      AppState.items[index].rate = preset.defaultRate;
    }
    AppState.items[index].amount = (parseFloat(AppState.items[index].qty) || 1) * (parseFloat(AppState.items[index].rate) || 0);
    renderProductFormCards();
    recalculateAllTotals();
  }
};

window.onItemFieldChange = function(index, field, value) {
  if (!AppState.items[index]) return;
  
  if (field === 'qty') {
    AppState.items[index].qty = parseFloat(value) || 0;
  } else if (field === 'rate') {
    AppState.items[index].rate = parseFloat(value) || 0;
  } else if (field === 'meter') {
    AppState.items[index].meter = parseFloat(value) || 0;
  } else {
    AppState.items[index][field] = value;
  }

  AppState.items[index].amount = (parseFloat(AppState.items[index].qty) || 0) * (parseFloat(AppState.items[index].rate) || 0);
  recalculateAllTotals();
};

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// =============================================================================
// 8. TOTALS, TAXES & FINANCIAL CALCULATIONS
// =============================================================================

function recalculateAllTotals() {
  let subtotal = 0;
  let totalQty = 0;

  AppState.items.forEach(item => {
    const qty = parseFloat(item.qty) || 0;
    const rate = parseFloat(item.rate) || 0;
    item.amount = qty * rate;
    subtotal += item.amount;
    totalQty += qty;
  });

  const discount = parseFloat(AppState.discount) || 0;
  AppState.amountBeforeTax = Math.max(0, subtotal - discount);

  recalculateTaxesOnly();

  const elSubtotalInput = document.getElementById("input-amount-before-tax");
  if (elSubtotalInput && document.activeElement !== elSubtotalInput) {
    elSubtotalInput.value = AppState.amountBeforeTax.toFixed(2);
  }

  const elTaxGstInput = document.getElementById("input-tax-amount-gst");
  if (elTaxGstInput && document.activeElement !== elTaxGstInput) {
    elTaxGstInput.value = AppState.taxAmountGst.toFixed(2);
  }

  const elFinalPayable = document.getElementById("input-amount-after-tax");
  if (elFinalPayable && document.activeElement !== elFinalPayable) {
    elFinalPayable.value = AppState.amountAfterTax.toFixed(2);
  }

  AppState.amountWords = numberToIndianWords(AppState.amountAfterTax);
  const elWordsInput = document.getElementById("input-amount-words");
  if (elWordsInput) {
    elWordsInput.value = AppState.amountWords;
  }

  renderSheetTableItems(totalQty, subtotal);
  renderFinancialSheet();
}

function recalculateTaxesOnly() {
  const base = AppState.amountBeforeTax || 0;
  AppState.cgstAmount = (base * (parseFloat(AppState.cgstPct) || 0)) / 100;
  AppState.sgstAmount = (base * (parseFloat(AppState.sgstPct) || 0)) / 100;
  AppState.igstAmount = (base * (parseFloat(AppState.igstPct) || 0)) / 100;

  AppState.taxAmountGst = AppState.cgstAmount + AppState.sgstAmount + AppState.igstAmount;
  AppState.amountAfterTax = base + AppState.taxAmountGst;
}

// =============================================================================
// 9. SHEET RENDERING (LIVE A4 INVOICE SHEET PREVIEW)
// =============================================================================

function renderAllSheetElements() {
  document.getElementById("sheet-copy-type").textContent = AppState.copyType;
  const footerCopy = document.getElementById("sheet-footer-copy");
  if (footerCopy) footerCopy.textContent = AppState.copyType;

  document.getElementById("sheet-invoice-no").textContent = AppState.invoiceNo;
  document.getElementById("sheet-invoice-date").textContent = formatDateForDisplay(AppState.invoiceDate);
  document.getElementById("sheet-reverse-charge").textContent = AppState.reverseCharge;
  
  document.getElementById("sheet-billed-name").textContent = AppState.billedToName;
  document.getElementById("sheet-billed-address").innerHTML = (AppState.billedToAddress || "").replace(/\n/g, "<br>");
  document.getElementById("sheet-billed-gstin").textContent = AppState.receiverGstin;
  document.getElementById("sheet-state-name").textContent = AppState.stateName;
  document.getElementById("sheet-state-code").textContent = AppState.stateCode;
  document.getElementById("sheet-transport-mode").textContent = AppState.transportMode;
  document.getElementById("sheet-vehicle-no").textContent = AppState.vehicleNo;
  document.getElementById("sheet-supply-date").textContent = formatDateForDisplay(AppState.supplyDate);
  document.getElementById("sheet-place-supply").textContent = AppState.placeOfSupply;

  document.getElementById("sheet-bank-content").innerHTML = (AppState.bankDetailsText || "").replace(/\n/g, "<br>");
  document.getElementById("sheet-amount-words").textContent = AppState.amountWords;

  renderSealAndSignatures();
}

function renderSheetTableItems(totalQty, subtotal) {
  const tbody = document.getElementById("sheet-items-tbody");
  if (!tbody) return;

  tbody.innerHTML = "";
  const MAX_ROWS = 15;

  for (let i = 0; i < MAX_ROWS; i++) {
    const tr = document.createElement("tr");
    const item = AppState.items[i];

    if (item) {
      tr.className = "active-item-row";
      tr.innerHTML = `
        <td class="cell-sr">${i + 1}</td>
        <td class="cell-product">${escapeHtml(item.name)}</td>
        <td class="cell-hsn">${escapeHtml(item.hsn || '')}</td>
        <td class="cell-meter">${item.meter ? parseFloat(item.meter).toFixed(2) : ''}</td>
        <td class="cell-qty">${item.qty || ''}</td>
        <td class="cell-rate">${item.rate ? parseFloat(item.rate).toFixed(2) : ''}</td>
        <td class="cell-amount">${item.amount ? parseFloat(item.amount).toFixed(2) : ''}</td>
      `;
    } else {
      tr.className = "blank-item-row";
      tr.innerHTML = `
        <td class="cell-sr">&nbsp;</td>
        <td class="cell-product">&nbsp;</td>
        <td class="cell-hsn">&nbsp;</td>
        <td class="cell-meter">&nbsp;</td>
        <td class="cell-qty">&nbsp;</td>
        <td class="cell-rate">&nbsp;</td>
        <td class="cell-amount">&nbsp;</td>
      `;
    }

    tbody.appendChild(tr);
  }

  document.getElementById("sheet-total-qty").textContent = totalQty;
  document.getElementById("sheet-items-subtotal").textContent = subtotal.toFixed(2);
}

function renderFinancialSheet() {
  document.getElementById("sheet-discount-val").textContent = (AppState.discount || 0).toFixed(2);
  document.getElementById("sheet-before-tax-val").textContent = (AppState.amountBeforeTax || 0).toFixed(2);
  
  document.getElementById("sheet-cgst-pct-label").textContent = AppState.cgstPct;
  document.getElementById("sheet-cgst-val").textContent = (AppState.cgstAmount || 0).toFixed(2);
  
  document.getElementById("sheet-sgst-pct-label").textContent = AppState.sgstPct;
  document.getElementById("sheet-sgst-val").textContent = (AppState.sgstAmount || 0).toFixed(2);
  
  document.getElementById("sheet-igst-pct-label").textContent = AppState.igstPct;
  document.getElementById("sheet-igst-val").textContent = (AppState.igstAmount || 0).toFixed(2);
  
  document.getElementById("sheet-tax-amount-val").textContent = (AppState.taxAmountGst || 0).toFixed(2);
  document.getElementById("sheet-after-tax-val").textContent = `₹ ${(AppState.amountAfterTax || 0).toFixed(2)}`;
  document.getElementById("sheet-reverse-charge-val").textContent = (AppState.gstReverseCharge || 0).toFixed(2);

  document.getElementById("sheet-amount-words").textContent = AppState.amountWords;
}

function renderSealAndSignatures() {
  const sealContainer = document.getElementById("sheet-seal-container");
  const defaultSeal = document.getElementById("sheet-default-seal");
  const customSealImg = document.getElementById("sheet-custom-seal-img");

  if (sealContainer) {
    sealContainer.style.visibility = AppState.includeSeal ? "visible" : "hidden";
  }

  if (AppState.customSealUrl) {
    if (defaultSeal) defaultSeal.style.display = "none";
    if (customSealImg) {
      customSealImg.src = AppState.customSealUrl;
      customSealImg.style.display = "block";
    }
  } else {
    if (defaultSeal) defaultSeal.style.display = "block";
    if (customSealImg) customSealImg.style.display = "none";
  }

  const signContainer = document.getElementById("sheet-signature-container");
  const defaultSign = document.getElementById("sheet-default-signature");
  const customSignImg = document.getElementById("sheet-custom-signature-img");

  if (signContainer) {
    signContainer.style.visibility = AppState.includeSign ? "visible" : "hidden";
  }

  if (AppState.customSignUrl) {
    if (defaultSign) defaultSign.style.display = "none";
    if (customSignImg) {
      customSignImg.src = AppState.customSignUrl;
      customSignImg.style.display = "block";
    }
  } else {
    if (defaultSign) defaultSign.style.display = "block";
    if (customSignImg) customSignImg.style.display = "none";
  }

  renderWatermark();
  renderTermsConditions();
}

function renderWatermark() {
  const layer = document.getElementById("sheet-watermark-layer");
  if (!layer) return;
  layer.classList.toggle("watermark-off", !AppState.includeWatermark);
}

function renderTermsConditions() {
  // Only the numbered list toggles off — the "Terms and Conditions :" title
  // stays visible/constant at all times.
  const termsList = document.getElementById("sheet-terms-list");
  if (!termsList) return;
  termsList.classList.toggle("terms-off", !AppState.includeTerms);
}

// =============================================================================
// 9b. DEFAULT E-SEAL & E-SIGNATURE — GENERATED ONCE TO <canvas>
//     The exact same data-URL asset is used both in the live A4 preview and
//     embedded straight into the downloaded PDF, so what the admin sees is
//     always exactly what gets exported (no drift between preview & export).
// =============================================================================

function initDefaultSealAndSignature() {
  // Default E-Seal: round stamp, drawn synchronously (system font only).
  AppState.defaultSealDataUrl = generateDefaultSealDataUrl();
  const sealImgEl = document.getElementById("sheet-default-seal");
  if (sealImgEl) sealImgEl.src = AppState.defaultSealDataUrl;

  // Default E-Signature: cursive script, waits for the webfont to be ready.
  generateDefaultSignatureDataUrl(function (dataUrl) {
    AppState.defaultSignatureDataUrl = dataUrl;
    const signImgEl = document.getElementById("sheet-default-signature");
    if (signImgEl) signImgEl.src = dataUrl;
  });
}

function drawArcText(ctx, text, cx, cy, radius, startDeg, endDeg, font, color, flip) {
  ctx.save();
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const n = text.length;
  if (n === 0) { ctx.restore(); return; }
  const total = endDeg - startDeg;
  for (let i = 0; i < n; i++) {
    const frac = (i + 0.5) / n;
    const deg = startDeg + total * frac;
    const rad = (deg * Math.PI) / 180;
    const x = cx + radius * Math.sin(rad);
    const y = cy - radius * Math.cos(rad);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(flip ? rad + Math.PI : rad);
    ctx.fillText(text[i], 0, 0);
    ctx.restore();
  }
  ctx.restore();
}

function generateDefaultSealDataUrl() {
  const SIZE = 320;
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  const cx = SIZE / 2, cy = SIZE / 2;
  const GREEN = "#1F6B48";

  ctx.clearRect(0, 0, SIZE, SIZE);

  // Double-ring classic stamp border
  ctx.strokeStyle = GREEN;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cy, 148, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 1.6;
  ctx.beginPath();
  ctx.arc(cx, cy, 128, 0, Math.PI * 2);
  ctx.stroke();

  // Curved company name (top arc) & product line (bottom arc)
  drawArcText(ctx, "K.P. PARAMATHMAN  &  BROTHERS", cx, cy, 138, -100, 100, "bold 15px Arial, sans-serif", GREEN, false);
  drawArcText(ctx, "HANDLOOM  SILK  SAREES", cx, cy, 138, 260, 100, "bold 15px Arial, sans-serif", GREEN, true);

  // Center monogram
  ctx.fillStyle = GREEN;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = '700 27px Georgia, "Times New Roman", serif';
  ctx.fillText("KPP", cx, cy - 6);
  ctx.font = "bold 12px Arial, sans-serif";
  ctx.fillText("KILPATTU", cx, cy + 19);

  return canvas.toDataURL("image/png");
}

function generateDefaultSignatureDataUrl(callback) {
  const text = "K.P. Paramathman";
  const fontFamily = "'Dancing Script', 'Brush Script MT', 'Segoe Script', cursive";

  const draw = function () {
    const fontSize = 58;
    const measureCanvas = document.createElement("canvas");
    const mctx = measureCanvas.getContext("2d");
    mctx.font = "700 " + fontSize + "px " + fontFamily;
    const textWidth = mctx.measureText(text).width;

    const PAD_X = 16, PAD_Y = 26;
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(textWidth + PAD_X * 2);
    canvas.height = Math.ceil(fontSize * 1.35 + PAD_Y);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#1F6B48";
    ctx.textBaseline = "alphabetic";
    ctx.font = "700 " + fontSize + "px " + fontFamily;
    ctx.fillText(text, PAD_X, canvas.height - PAD_Y);

    // Flourish underline
    ctx.strokeStyle = "#1F6B48";
    ctx.lineWidth = 1.6;
    const baseY = canvas.height - PAD_Y + 10;
    ctx.beginPath();
    ctx.moveTo(PAD_X + 2, baseY);
    ctx.bezierCurveTo(
      canvas.width * 0.32, baseY + 12,
      canvas.width * 0.68, baseY - 10,
      canvas.width - PAD_X, baseY + 4
    );
    ctx.stroke();

    callback(canvas.toDataURL("image/png"));
  };

  if (document.fonts && document.fonts.load) {
    document.fonts.load("700 58px 'Dancing Script'").then(draw).catch(draw);
  } else {
    draw();
  }
}

// =============================================================================
// 10. E-SEAL & E-SIGNATURE UPLOAD HANDLERS
// =============================================================================

function bindUploadHandlers() {
  const watermarkToggle = document.getElementById("toggle-include-watermark");
  if (watermarkToggle) {
    watermarkToggle.addEventListener("change", (e) => {
      AppState.includeWatermark = e.target.checked;
      renderWatermark();
      showToast(AppState.includeWatermark ? "Watermark enabled." : "Watermark hidden.", "info");
    });
  }

  const termsToggle = document.getElementById("toggle-include-terms");
  if (termsToggle) {
    termsToggle.addEventListener("change", (e) => {
      AppState.includeTerms = e.target.checked;
      renderTermsConditions();
      showToast(AppState.includeTerms ? "Terms & Conditions enabled." : "Terms & Conditions hidden.", "info");
    });
  }

  const sealToggle = document.getElementById("toggle-include-seal");
  if (sealToggle) {
    sealToggle.addEventListener("change", (e) => {
      AppState.includeSeal = e.target.checked;
      renderSealAndSignatures();
      showToast(AppState.includeSeal ? "E-Seal enabled." : "E-Seal hidden.", "info");
    });
  }

  const sealFileInput = document.getElementById("upload-seal-file");
  if (sealFileInput) {
    sealFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          AppState.customSealUrl = event.target.result;
          renderSealAndSignatures();
          showToast("Custom E-Seal uploaded.", "success");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const resetSealBtn = document.getElementById("btn-reset-seal");
  if (resetSealBtn) {
    resetSealBtn.addEventListener("click", () => {
      AppState.customSealUrl = "";
      renderSealAndSignatures();
      showToast("Reset to default seal.", "info");
    });
  }

  const signToggle = document.getElementById("toggle-include-sign");
  if (signToggle) {
    signToggle.addEventListener("change", (e) => {
      AppState.includeSign = e.target.checked;
      renderSealAndSignatures();
      showToast(AppState.includeSign ? "Signature enabled." : "Signature hidden.", "info");
    });
  }

  const signFileInput = document.getElementById("upload-sign-file");
  if (signFileInput) {
    signFileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          AppState.customSignUrl = event.target.result;
          renderSealAndSignatures();
          showToast("Custom signature uploaded.", "success");
        };
        reader.readAsDataURL(file);
      }
    });
  }

  const resetSignBtn = document.getElementById("btn-reset-sign");
  if (resetSignBtn) {
    resetSignBtn.addEventListener("click", () => {
      AppState.customSignUrl = "";
      renderSealAndSignatures();
      showToast("Reset to default signature.", "info");
    });
  }
}

// =============================================================================
// 11. INDIAN NUMBER TO WORDS CONVERTER (INDIAN RUPEES SYSTEM)
// =============================================================================

function numberToIndianWords(num) {
  if (num === null || num === undefined || isNaN(num) || num === 0) {
    return "Zero Rupees Only";
  }

  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];

  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  function convertHundreds(n) {
    let str = "";
    if (n > 99) {
      str += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n > 0) {
      if (str !== "") str += "and ";
      if (n < 20) {
        str += ones[n] + " ";
      } else {
        str += tens[Math.floor(n / 10)] + " ";
        if (n % 10 > 0) {
          str += ones[n % 10] + " ";
        }
      }
    }
    return str.trim();
  }

  const rounded = Math.round(num * 100) / 100;
  const parts = rounded.toString().split(".");
  let integerPart = parseInt(parts[0], 10);
  const decimalPart = parts.length > 1 ? parseInt(parts[1].padEnd(2, "0").substring(0, 2), 10) : 0;

  if (integerPart === 0 && decimalPart === 0) {
    return "Zero Rupees Only";
  }

  let words = "";

  if (integerPart >= 10000000) {
    const crores = Math.floor(integerPart / 10000000);
    words += convertHundreds(crores) + " Crore ";
    integerPart %= 10000000;
  }

  if (integerPart >= 100000) {
    const lakhs = Math.floor(integerPart / 100000);
    words += convertHundreds(lakhs) + " Lakh ";
    integerPart %= 100000;
  }

  if (integerPart >= 1000) {
    const thousands = Math.floor(integerPart / 1000);
    words += convertHundreds(thousands) + " Thousand ";
    integerPart %= 1000;
  }

  if (integerPart > 0) {
    words += convertHundreds(integerPart) + " ";
  }

  words = words.trim();
  let result = "Rupees " + words;

  if (decimalPart > 0) {
    result += " and " + convertHundreds(decimalPart) + " Paise";
  }

  result += " Only";
  return result;
}

// =============================================================================
// 12. PDF GENERATION - jsPDF EXACT MASTER TEMPLATE REPLICA
// =============================================================================

function generateAndDownloadPDF() {
  var billNo = (AppState.invoiceNo || '101').replace(/[/\\?%*:|"<>]/g, '-');
  var presentDate = formatDateForDisplay(getTodayDateString());
  var filename = 'bill no ' + billNo + ' - ' + presentDate + '.pdf';

  showToast('Generating exact Master PDF: ' + filename + '...', 'info');

  try {
    if (typeof generateExactInvoicePDF === 'function' && window.jspdf) {
      var data = {
        copyType: AppState.copyType || 'Original for Recipient',
        invoiceNo: AppState.invoiceNo || '101',
        invoiceDate: formatDateForDisplay(AppState.invoiceDate),
        reverseCharge: AppState.reverseCharge || '',
        billedToName: AppState.billedToName || '',
        billedToAddress: AppState.billedToAddress || '',
        receiverGstin: AppState.receiverGstin || '',
        stateName: AppState.stateName || 'TAMIL NADU',
        stateCode: AppState.stateCode || '33',
        transportMode: AppState.transportMode || '',
        vehicleNo: AppState.vehicleNo || '',
        supplyDate: formatDateForDisplay(AppState.supplyDate),
        placeOfSupply: AppState.placeOfSupply || '',
        items: AppState.items || [],
        discount: AppState.discount || 0,
        amountBeforeTax: AppState.amountBeforeTax || 0,
        cgstPct: AppState.cgstPct || 0,
        cgstAmount: AppState.cgstAmount || 0,
        sgstPct: AppState.sgstPct || 0,
        sgstAmount: AppState.sgstAmount || 0,
        igstPct: AppState.igstPct || 0,
        igstAmount: AppState.igstAmount || 0,
        taxAmountGst: AppState.taxAmountGst || 0,
        amountAfterTax: AppState.amountAfterTax || 0,
        gstReverseCharge: AppState.gstReverseCharge || 0,
        amountWords: AppState.amountWords || numberToIndianWords(AppState.amountAfterTax || 0),
        bankDetailsText: AppState.bankDetailsText || '',
        includeWatermark: AppState.includeWatermark,
        includeTerms: AppState.includeTerms,
        includeSeal: AppState.includeSeal,
        customSealUrl: AppState.customSealUrl || '',
        includeSign: AppState.includeSign,
        customSignUrl: AppState.customSignUrl || ''
      };

      var doc = generateExactInvoicePDF(data);
      doc.save(filename);
      showToast('Exact Master Invoice PDF downloaded: ' + filename, 'success');
      return;
    }
  } catch (err) {
    console.warn('jsPDF generation error, falling back:', err);
  }

  generateHtml2PdfFallback(filename);
}

function generateHtml2PdfFallback(filename) {
  var element = document.getElementById('invoice-printable-sheet');
  if (!element) { window.print(); return; }

  var opt = {
    margin: [6, 6, 6, 6],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2.5, useCORS: true, letterRendering: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  if (window.html2pdf) {
    window.html2pdf().set(opt).from(element).save()
      .then(function() { showToast('Invoice PDF saved: ' + filename, 'success'); })
      .catch(function() { window.print(); });
  } else {
    window.print();
  }
}

// =============================================================================
// 13. ACTION BUTTONS & SHORTCUTS
// =============================================================================

function bindActionButtons() {
  var processButtons = [
    document.getElementById('btn-process-top'),
    document.getElementById('btn-process-bottom'),
    document.getElementById('btn-process-calculations')
  ];

  processButtons.forEach(function(btn) {
    if (btn) {
      btn.addEventListener('click', function() {
        recalculateAllTotals();
        renderAllSheetElements();
        showToast('All totals, taxes, and words calculated successfully!', 'success');
      });
    }
  });

  var downloadButtons = [
    document.getElementById('btn-download-pdf'),
    document.getElementById('btn-download-pdf-bottom'),
    document.getElementById('btn-download-pdf-sheet')
  ];

  downloadButtons.forEach(function(btn) {
    if (btn) {
      btn.addEventListener('click', function() {
        recalculateAllTotals();
        generateAndDownloadPDF();
      });
    }
  });

  var printButtons = [
    document.getElementById('btn-print-bill'),
    document.getElementById('btn-print-sheet')
  ];

  printButtons.forEach(function(btn) {
    if (btn) {
      btn.addEventListener('click', function() {
        recalculateAllTotals();
        window.print();
      });
    }
  });

  var sampleBtn = document.getElementById('btn-fill-sample');
  if (sampleBtn) {
    sampleBtn.addEventListener('click', function() { loadSampleInvoiceData(); });
  }

  var clearBtn = document.getElementById('btn-clear-form');
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      if (confirm('Are you sure you want to reset all invoice fields?')) {
        resetInvoiceForm();
      }
    });
  }
}

function loadSampleInvoiceData() {
  AppState.invoiceNo = '101';
  document.getElementById('input-invoice-no').value = AppState.invoiceNo;

  var client = CLIENTS_DB[0];
  document.getElementById('input-billed-to-name').value = client.name;
  document.getElementById('input-billed-to-address').value = client.address;
  document.getElementById('input-receiver-gstin').value = client.gstin;
  document.getElementById('input-receiver-phone').value = client.phone;
  document.getElementById('input-state-name').value = client.state;
  document.getElementById('input-state-code').value = client.stateCode;
  document.getElementById('input-reverse-charge').value = 'NO';
  document.getElementById('input-transport-mode').value = 'Road';
  document.getElementById('input-vehicle-no').value = 'TN 25 AB 1234';
  // Place of Supply is left blank by sample data too — it's always a
  // manual, invoice-specific entry, never auto-filled.

  AppState.billedToName = client.name;
  AppState.billedToAddress = client.address;
  AppState.receiverGstin = client.gstin;
  AppState.receiverPhone = client.phone;
  AppState.stateName = client.state;
  AppState.stateCode = client.stateCode;
  AppState.reverseCharge = 'NO';
  AppState.transportMode = 'Road';
  AppState.vehicleNo = 'TN 25 AB 1234';

  AppState.items = [
    { id: 1, name: 'Pure Silk Saree - Traditional Zari', hsn: '5007', meter: 6.20, qty: 10, rate: 6500, amount: 65000 },
    { id: 2, name: 'Handloom Silk Saree - Contrast Border', hsn: '5007', meter: 6.20, qty: 5, rate: 4800, amount: 24000 }
  ];

  AppState.discount = 0;
  document.getElementById('input-discount').value = '0';
  document.getElementById('input-cgst-pct').value = '2.5';
  document.getElementById('input-sgst-pct').value = '2.5';
  document.getElementById('input-igst-pct').value = '0';
  AppState.cgstPct = 2.5;
  AppState.sgstPct = 2.5;
  AppState.igstPct = 0;

  renderProductFormCards();
  recalculateAllTotals();
  renderAllSheetElements();
  showToast('Loaded sample invoice data.', 'success');
}

function resetInvoiceForm() {
  AppState.items = [
    { id: 1, name: 'Pure Silk Saree', hsn: '5007', meter: 6.20, qty: 1, rate: 5000, amount: 5000 }
  ];
  AppState.discount = 0;
  document.getElementById('input-discount').value = '0';
  renderProductFormCards();
  recalculateAllTotals();
  renderAllSheetElements();
  showToast('Form reset to blank draft.', 'info');
}

// =============================================================================
// 14. TOAST NOTIFICATIONS
// =============================================================================

function showToast(message, type) {
  type = type || 'info';
  var container = document.getElementById('toast-container');
  if (!container) return;

  var toast = document.createElement('div');
  toast.className = 'toast toast-' + type;

  var icon = type === 'success' ? '\u2705' : (type === 'error' ? '\u274C' : '\u2139\uFE0F');
  toast.innerHTML = '<span>' + icon + '</span> <span>' + message + '</span>';

  container.appendChild(toast);

  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(function() {
      if (toast.parentNode) toast.parentNode.removeChild(toast);
    }, 300);
  }, 3500);
}

// =============================================================================
// 14. SECTION NAVIGATION, MANDATORY-FIELD GATING & PREVIEW MODE
// =============================================================================

var PortalUIState = { activeSection: 1 };

var MANDATORY_FIELD_IDS = [
  { id: 'input-invoice-no', label: 'Invoice No.', section: 1 },
  { id: 'input-invoice-date', label: 'Invoice Date', section: 1 },
  { id: 'input-billed-to-name', label: 'Customer / Firm Name', section: 2 },
  { id: 'input-receiver-gstin', label: 'Receiver GSTIN', section: 2 },
  { id: 'input-state-name', label: 'STATE', section: 3 },
  { id: 'input-supply-date', label: 'Date of Supply', section: 3 }
];

function validateMandatoryFields() {
  var missing = [];
  MANDATORY_FIELD_IDS.forEach(function(f) {
    var el = document.getElementById(f.id);
    var val = el ? String(el.value || '').trim() : '';
    if (!val) missing.push(f);
  });

  var hasValidItems = AppState.items.length >= 1 && AppState.items.every(function(it) {
    return String(it.name || '').trim() && Number(it.qty) > 0;
  });
  if (!hasValidItems) {
    missing.push({ id: null, label: 'At least one valid Product Item (name & qty)', section: 4 });
  }

  return missing;
}

function updateSectionNavStatus() {
  var missing = validateMandatoryFields();
  var missingBySection = {};
  missing.forEach(function(f) {
    missingBySection[f.section] = (missingBySection[f.section] || 0) + 1;
  });

  for (var s = 1; s <= 6; s++) {
    var statusEl = document.querySelector('.nav-item-status[data-status-for="' + s + '"]');
    if (!statusEl) continue;
    if (missingBySection[s]) {
      statusEl.textContent = '';
      statusEl.className = 'nav-item-status is-incomplete';
    } else {
      statusEl.textContent = '✓';
      statusEl.className = 'nav-item-status is-complete';
    }
  }

  var previewBtn = document.getElementById('btn-open-preview');
  var hint = document.getElementById('preview-cta-hint');
  if (previewBtn) {
    if (missing.length === 0) {
      previewBtn.disabled = false;
      if (hint) hint.textContent = 'All set — review your invoice before downloading.';
    } else {
      previewBtn.disabled = true;
      if (hint) {
        var names = missing.slice(0, 3).map(function(f) { return f.label; }).join(', ');
        var extra = missing.length > 3 ? (' +' + (missing.length - 3) + ' more') : '';
        hint.textContent = 'Missing: ' + names + extra;
      }
    }
  }
  return missing;
}

function showSection(n) {
  n = String(n);
  document.querySelectorAll('.form-section-card[data-section-panel]').forEach(function(card) {
    var isActive = card.getAttribute('data-section-panel') === n;
    card.classList.toggle('panel-active', isActive);
  });
  document.querySelectorAll('.section-nav-item').forEach(function(btn) {
    btn.classList.toggle('is-active', btn.getAttribute('data-section') === n);
  });
  var panel = document.getElementById('editor-main-panel');
  if (panel) panel.scrollTop = 0;

  var posEl = document.getElementById('panel-footer-position');
  if (posEl) posEl.textContent = 'Section ' + n + ' of 6';
  var prevBtn = document.getElementById('btn-panel-prev');
  var nextBtn = document.getElementById('btn-panel-next');
  if (prevBtn) prevBtn.disabled = (n === '1');
  if (nextBtn) nextBtn.disabled = (n === '6');

  PortalUIState.activeSection = Number(n);
}

function openInvoicePreview() {
  var missing = updateSectionNavStatus();
  if (missing.length > 0) {
    showToast('Please complete all required fields before previewing.', 'error');
    return;
  }
  recalculateAllTotals();
  renderAllSheetElements();
  var layout = document.getElementById('portal-main-layout');
  if (layout) layout.classList.add('mode-preview');
  // Wait one frame so the (now-visible) container has real dimensions
  // before we measure it for the fit-to-screen scale calculation.
  requestAnimationFrame(function() { fitInvoicePreview(); });
}

function closeInvoicePreview() {
  var layout = document.getElementById('portal-main-layout');
  if (layout) layout.classList.remove('mode-preview');
}

// Scales the fixed-size A4 sheet (210mm) down to fit narrow screens —
// phones and small tablets — so the whole invoice width is visible
// without side-scrolling. Never scales UP past 100% (true size / print
// fidelity is never exceeded). The PDF download always uses the exact
// vector generator in generateInvoicePDF.js, completely unaffected by
// this on-screen visual scale.
function fitInvoicePreview() {
  var viewport = document.querySelector('.invoice-sheet-viewport');
  var sheet = document.getElementById('invoice-printable-sheet');
  var box = document.getElementById('invoice-sheet-scale-box');
  if (!viewport || !sheet || !box) return;

  sheet.style.transform = 'none';
  box.style.width = '';
  box.style.height = '';

  var sheetRect = sheet.getBoundingClientRect();
  var naturalWidth = sheetRect.width;
  var naturalHeight = sheetRect.height;
  if (!naturalWidth || !naturalHeight) return;

  var vpStyles = window.getComputedStyle(viewport);
  var horizontalPadding = parseFloat(vpStyles.paddingLeft || 0) + parseFloat(vpStyles.paddingRight || 0);
  var availableWidth = viewport.clientWidth - horizontalPadding;

  var scale = 1;
  if (availableWidth > 0 && availableWidth < naturalWidth) {
    scale = availableWidth / naturalWidth;
  }

  if (scale < 1) {
    sheet.style.transform = 'scale(' + scale + ')';
    box.style.width = (naturalWidth * scale) + 'px';
    box.style.height = (naturalHeight * scale) + 'px';
  } else {
    sheet.style.transform = 'none';
    box.style.width = naturalWidth + 'px';
    box.style.height = naturalHeight + 'px';
  }
}

var _fitPreviewResizeTimer = null;
function scheduleFitInvoicePreview() {
  if (_fitPreviewResizeTimer) clearTimeout(_fitPreviewResizeTimer);
  _fitPreviewResizeTimer = setTimeout(function() {
    var layout = document.getElementById('portal-main-layout');
    if (layout && layout.classList.contains('mode-preview')) {
      fitInvoicePreview();
    }
  }, 150);
}

function bindSectionNavigation() {
  document.querySelectorAll('.section-nav-item').forEach(function(btn) {
    btn.addEventListener('click', function() {
      showSection(btn.getAttribute('data-section'));
    });
  });

  var prevBtn = document.getElementById('btn-panel-prev');
  var nextBtn = document.getElementById('btn-panel-next');
  if (prevBtn) {
    prevBtn.addEventListener('click', function() {
      showSection(Math.max(1, PortalUIState.activeSection - 1));
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', function() {
      showSection(Math.min(6, PortalUIState.activeSection + 1));
    });
  }

  var previewBtn = document.getElementById('btn-open-preview');
  if (previewBtn) previewBtn.addEventListener('click', openInvoicePreview);

  var backBtn = document.getElementById('btn-back-to-edit');
  if (backBtn) backBtn.addEventListener('click', closeInvoicePreview);

  var fitBtn = document.getElementById('btn-zoom-fit');
  if (fitBtn) fitBtn.addEventListener('click', fitInvoicePreview);

  window.addEventListener('resize', scheduleFitInvoicePreview);
  window.addEventListener('orientationchange', scheduleFitInvoicePreview);

  var form = document.getElementById('invoice-editor-form');
  if (form) {
    form.addEventListener('input', function() { updateSectionNavStatus(); });
    form.addEventListener('change', function() { updateSectionNavStatus(); });
    form.addEventListener('click', function() { updateSectionNavStatus(); });
  }
}