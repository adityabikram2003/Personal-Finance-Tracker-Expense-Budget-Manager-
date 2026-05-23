// State Management
let state = {
  transactions: [],
  monthlyBudget: 50000,
  theme: 'dark',
  filters: {
    search: '',
    category: 'All',
    sort: 'date-desc'
  }
};

// SVG Icons Lookup
const ICONS = {
  Food: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`,
  Travel: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>`,
  Shopping: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>`,
  Utilities: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`,
  Entertainment: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path></svg>`,
  Health: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>`,
  Others: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`
};

const CATEGORY_COLORS = {
  Food: '#f43f5e',
  Travel: '#3b82f6',
  Shopping: '#a855f7',
  Utilities: '#f59e0b',
  Entertainment: '#ec4899',
  Health: '#10b981',
  Others: '#64748b'
};

// DOM References
const elements = {
  txtMonthlyBudget: document.getElementById('txtMonthlyBudget'),
  txtTotalExpenses: document.getElementById('txtTotalExpenses'),
  txtRemainingBudget: document.getElementById('txtRemainingBudget'),
  budgetProgressBar: document.getElementById('budgetProgressBar'),
  txtBudgetPercent: document.getElementById('txtBudgetPercent'),
  txtBudgetTextSummary: document.getElementById('txtBudgetTextSummary'),
  balanceCard: document.getElementById('balanceCard'),
  txtBalanceStatus: document.getElementById('txtBalanceStatus'),
  
  expenseForm: document.getElementById('expenseForm'),
  editExpenseId: document.getElementById('editExpenseId'),
  expenseTitle: document.getElementById('expenseTitle'),
  expenseAmount: document.getElementById('expenseAmount'),
  expenseCategory: document.getElementById('expenseCategory'),
  expenseDate: document.getElementById('expenseDate'),
  formHeaderTitle: document.getElementById('formHeaderTitle'),
  btnSubmitExpense: document.getElementById('btnSubmitExpense'),
  submitBtnText: document.getElementById('submitBtnText'),
  submitBtnIcon: document.getElementById('submitBtnIcon'),
  btnCancelEdit: document.getElementById('btnCancelEdit'),
  
  tabCategory: document.getElementById('tabCategory'),
  tabTrend: document.getElementById('tabTrend'),
  chartCategoryView: document.getElementById('chartCategoryView'),
  chartTrendView: document.getElementById('chartTrendView'),
  
  searchTransactions: document.getElementById('searchTransactions'),
  sortTransactions: document.getElementById('sortTransactions'),
  categoryFilterPills: document.getElementById('categoryFilterPills'),
  transactionList: document.getElementById('transactionList'),
  txtTransactionCount: document.getElementById('txtTransactionCount'),
  emptyState: document.getElementById('emptyState'),
  
  // Budget Modal
  budgetModal: document.getElementById('budgetModal'),
  btnEditBudget: document.getElementById('btnEditBudget'),
  btnCloseBudgetModal: document.getElementById('btnCloseBudgetModal'),
  btnCancelBudgetModal: document.getElementById('btnCancelBudgetModal'),
  btnSaveBudgetModal: document.getElementById('btnSaveBudgetModal'),
  inputBudgetVal: document.getElementById('inputBudgetVal'),
  // Theme & Portability
  themeToggleBtn: document.getElementById('themeToggleBtn'),
  currentDateText: document.getElementById('currentDateText'),
  btnExportCSV: document.getElementById('btnExportCSV'),
  csvFileInput: document.getElementById('csvFileInput'),
  toastContainer: document.getElementById('toastContainer'),
  
  // Scroll to top
  scrollTopBtn: document.getElementById('scrollTopBtn')
};

// Chart instances
let categoryChartInstance = null;
let trendChartInstance = null;

// Helpers & Initializers
function init() {
  setDateDisplay();
  loadState();
  setupEventListeners();
  applyTheme();
  render();
}

function setDateDisplay() {
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-IN', options);
  
  if (elements.currentDateText) elements.currentDateText.textContent = dateStr;
  
  // Also set default date on form to today
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  elements.expenseDate.value = `${year}-${month}-${day}`;
}

// State Persistence
function loadState() {
  const storedTransactions = localStorage.getItem('apex_transactions');
  const storedBudget = localStorage.getItem('apex_budget');
  const storedTheme = localStorage.getItem('apex_theme');
  
  if (storedBudget) {
    state.monthlyBudget = parseFloat(storedBudget);
  }
  
  if (storedTheme) {
    state.theme = storedTheme;
  } else {
    // Media Query fallback
    state.theme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }
  
  if (storedTransactions) {
    state.transactions = JSON.parse(storedTransactions);
  } else {
    seedDefaultData();
  }
}

function saveState() {
  localStorage.setItem('apex_transactions', JSON.stringify(state.transactions));
  localStorage.setItem('apex_budget', state.monthlyBudget.toString());
  localStorage.setItem('apex_theme', state.theme);
}

function seedDefaultData() {
  const today = new Date();
  const getPastDateString = (daysAgo) => {
    const d = new Date();
    d.setDate(today.getDate() - daysAgo);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dayVal = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dayVal}`;
  };

  state.transactions = [
    { id: '1', title: 'Whole Foods Grocery Run', amount: 5400.00, category: 'Food', date: getPastDateString(0) },
    { id: '2', title: 'Monthly Electric Bill', amount: 3200.00, category: 'Utilities', date: getPastDateString(1) },
    { id: '3', title: 'Gasoline Fill-Up', amount: 2500.00, category: 'Travel', date: getPastDateString(2) },
    { id: '4', title: 'Wireless ANC Headphones', amount: 14999.00, category: 'Shopping', date: getPastDateString(3) },
    { id: '5', title: 'Cinema Movie & Refreshments', amount: 1200.00, category: 'Entertainment', date: getPastDateString(4) },
    { id: '6', title: 'Dental Cleaning Checkup', amount: 1500.00, category: 'Health', date: getPastDateString(5) },
    { id: '7', title: 'Weekly Dinner Out', amount: 2800.00, category: 'Food', date: getPastDateString(6) }
  ];
  saveState();
}

// Theme Manager
function applyTheme() {
  document.documentElement.setAttribute('data-theme', state.theme);
  // Re-render charts to adjust text color if charts exist
  if (categoryChartInstance || trendChartInstance) {
    renderCharts();
  }
}

// Event Listeners Setup
function setupEventListeners() {
  // ── Theme Toggle ──────────────────────────────────────
  const handleThemeToggle = () => {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    saveState();
    applyTheme();
    showToast(`Switched to ${state.theme} mode`, 'success');
  };
  if (elements.themeToggleBtn) elements.themeToggleBtn.addEventListener('click', handleThemeToggle);

  // ── Scroll-to-Top Button ──────────────────────────────
  if (elements.scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        elements.scrollTopBtn.classList.add('visible');
      } else {
        elements.scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    elements.scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Modal actions ─────────────────────────────────────
  elements.btnEditBudget.addEventListener('click', () => {
    elements.inputBudgetVal.value = state.monthlyBudget;
    elements.budgetModal.classList.add('active');
    elements.inputBudgetVal.focus();
  });
  
  const closeModal = () => elements.budgetModal.classList.remove('active');
  elements.btnCloseBudgetModal.addEventListener('click', closeModal);
  elements.btnCancelBudgetModal.addEventListener('click', closeModal);
  elements.budgetModal.addEventListener('click', (e) => {
    if (e.target === elements.budgetModal) closeModal();
  });
  
  elements.btnSaveBudgetModal.addEventListener('click', () => {
    const val = parseFloat(elements.inputBudgetVal.value);
    if (!isNaN(val) && val > 0) {
      state.monthlyBudget = Math.round(val);
      saveState();
      render();
      closeModal();
      showToast(`Monthly budget set to ₹${state.monthlyBudget.toLocaleString('en-IN')}`, 'success');
    } else {
      showToast('Please enter a valid budget amount', 'danger');
    }
  });

  // ── Expense Form Actions ──────────────────────────────
  elements.expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleFormSubmit();
  });

  elements.btnCancelEdit.addEventListener('click', resetForm);

  // ── Filters & Search ──────────────────────────────────
  elements.searchTransactions.addEventListener('input', (e) => {
    state.filters.search = e.target.value.trim();
    render();
  });

  elements.sortTransactions.addEventListener('change', (e) => {
    state.filters.sort = e.target.value;
    render();
  });

  elements.categoryFilterPills.addEventListener('click', (e) => {
    if (e.target.classList.contains('category-pill')) {
      const activePill = elements.categoryFilterPills.querySelector('.category-pill.active');
      if (activePill) activePill.classList.remove('active');
      e.target.classList.add('active');
      state.filters.category = e.target.getAttribute('data-category');
      render();
    }
  });

  // ── CSV Export/Import (Desktop) ───────────────────────
  elements.btnExportCSV.addEventListener('click', exportToCSV);
  elements.csvFileInput.addEventListener('change', importFromCSV);

  // ── Visualization Tabs Switching ──────────────────────
  const tabBtns = [elements.tabCategory, elements.tabTrend];
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      tabBtns.forEach(b => b.classList.remove('active'));
      const targetBtn = e.currentTarget;
      targetBtn.classList.add('active');
      
      const targetId = targetBtn.getAttribute('data-target');
      document.querySelectorAll('.chart-view').forEach(view => {
        view.classList.remove('active');
      });
      document.getElementById(targetId).classList.add('active');
      
      // Forces chart redraw to adjust sizing
      renderCharts();
    });
  });

  // ── Re-render charts on window resize ─────────────────
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderCharts();
    }, 150);
  });
}

// Toast Notifications
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let icon = '';
  if (type === 'success') {
    icon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
  } else if (type === 'danger') {
    icon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  } else if (type === 'warning') {
    icon = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
  }

  toast.innerHTML = `
    <span class="toast-icon">${icon}</span>
    <span>${message}</span>
  `;
  
  elements.toastContainer.appendChild(toast);
  
  // Slide out after 3 seconds
  setTimeout(() => {
    toast.classList.add('leaving');
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, 3200);
}

// Add / Edit Form Actions
function handleFormSubmit() {
  const title = elements.expenseTitle.value.trim();
  const amount = parseFloat(elements.expenseAmount.value);
  const category = elements.expenseCategory.value;
  const date = elements.expenseDate.value;
  const editId = elements.editExpenseId.value;

  if (!title || isNaN(amount) || amount <= 0 || !category || !date) {
    showToast('Invalid input data', 'danger');
    return;
  }

  if (editId) {
    // Edit transaction
    const index = state.transactions.findIndex(t => t.id === editId);
    if (index !== -1) {
      state.transactions[index] = { id: editId, title, amount, category, date };
      showToast('Expense updated successfully!', 'success');
    }
  } else {
    // Create transaction
    const newTransaction = {
      id: Date.now().toString(),
      title,
      amount,
      category,
      date
    };
    state.transactions.push(newTransaction);
    showToast('Expense added successfully!', 'success');
  }

  saveState();
  resetForm();
  render();
}

function startEditTransaction(id) {
  const transaction = state.transactions.find(t => t.id === id);
  if (!transaction) return;

  elements.editExpenseId.value = transaction.id;
  elements.expenseTitle.value = transaction.title;
  elements.expenseAmount.value = transaction.amount;
  elements.expenseCategory.value = transaction.category;
  elements.expenseDate.value = transaction.date;
  
  elements.formHeaderTitle.innerHTML = `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
    </svg>
    <span>Edit Expense</span>
  `;
  elements.submitBtnText.textContent = 'Save Changes';
  elements.submitBtnIcon.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`;
  elements.btnCancelEdit.style.display = 'flex';
  
  // Scroll to form on mobile view
  elements.expenseForm.scrollIntoView({ behavior: 'smooth' });
  elements.expenseTitle.focus();
}

function deleteTransaction(id) {
  const itemEl = document.querySelector(`.transaction-item[data-id="${id}"]`);
  if (itemEl) {
    itemEl.classList.add('deleting');
    // Wait for slide/fade out animation to complete
    itemEl.addEventListener('animationend', () => {
      state.transactions = state.transactions.filter(t => t.id !== id);
      saveState();
      render();
      showToast('Expense deleted', 'warning');
    });
  }
}

function resetForm() {
  elements.expenseForm.reset();
  elements.editExpenseId.value = '';
  
  elements.formHeaderTitle.innerHTML = `
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
    <span>Add New Expense</span>
  `;
  elements.submitBtnText.textContent = 'Add Expense';
  elements.submitBtnIcon.innerHTML = `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>`;
  elements.btnCancelEdit.style.display = 'none';
  
  // reset date to today
  setDateDisplay();
}

// CSV Export and Import Implementation
function exportToCSV() {
  if (state.transactions.length === 0) {
    showToast('No transaction data to export', 'danger');
    return;
  }

  // Create columns headers and rows
  const headers = ['Description', 'Amount', 'Category', 'Date'];
  const rows = state.transactions.map(t => [
    `"${t.title.replace(/"/g, '""')}"`, // escape quotes
    t.amount.toFixed(2),
    t.category,
    t.date
  ]);

  const csvContent = "\uFEFF" // Add UTF-8 BOM for proper excel encoding
    + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `ApexFinance_Backup_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  showToast('Backup exported successfully!', 'success');
}

function importFromCSV(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const csvData = evt.target.result;
      const lines = csvData.split(/\r\n|\n/);
      if (lines.length < 2) throw new Error('Empty CSV file');

      const parsedTransactions = [];
      
      // Parse header line to determine index map
      const headers = lines[0].replace(/^\uFEFF/, '').split(',').map(h => h.trim().toLowerCase());
      const descIdx = headers.indexOf('description');
      const amountIdx = headers.indexOf('amount');
      const catIdx = headers.indexOf('category');
      const dateIdx = headers.indexOf('date');

      if (descIdx === -1 || amountIdx === -1 || catIdx === -1 || dateIdx === -1) {
        throw new Error('Invalid CSV layout. Columns must include: Description, Amount, Category, Date');
      }

      // Valid categories
      const validCategories = Object.keys(ICONS);

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Custom regex parser for CSV to handle quotes correctly
        const cells = [];
        let insideQuotes = false;
        let cell = '';
        for (let charIndex = 0; charIndex < line.length; charIndex++) {
          const char = line[charIndex];
          if (char === '"') {
            insideQuotes = !insideQuotes;
          } else if (char === ',' && !insideQuotes) {
            cells.push(cell.trim());
            cell = '';
          } else {
            cell += char;
          }
        }
        cells.push(cell.trim());

        if (cells.length < 4) continue;

        const rawTitle = cells[descIdx];
        const rawAmount = parseFloat(cells[amountIdx]);
        const rawCat = cells[catIdx];
        const rawDate = cells[dateIdx];

        // Validation
        if (!rawTitle || isNaN(rawAmount) || rawAmount <= 0 || !rawDate) continue;
        
        // Clean category
        let cleanedCat = validCategories.find(c => c.toLowerCase() === rawCat.toLowerCase());
        if (!cleanedCat) cleanedCat = 'Others';

        // Check date format YYYY-MM-DD
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(rawDate)) continue;

        parsedTransactions.push({
          id: (Date.now() + i).toString(),
          title: rawTitle.replace(/^"|"$/g, '').replace(/""/g, '"'),
          amount: rawAmount,
          category: cleanedCat,
          date: rawDate
        });
      }

      if (parsedTransactions.length === 0) {
        throw new Error('No valid transactions parsed from CSV');
      }

      // Add to state and save
      state.transactions = [...state.transactions, ...parsedTransactions];
      saveState();
      render();
      showToast(`Imported ${parsedTransactions.length} transactions!`, 'success');
    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      // Clear value so the same file can be uploaded again
      elements.csvFileInput.value = '';
    }
  };
  reader.readAsText(file);
}

// Rendering Dashboards and Lists
function render() {
  // 1. Calculate Metrics
  const monthlyExpenses = state.transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const remainingBudget = state.monthlyBudget - monthlyExpenses;
  
  // Update HTML Text
  elements.txtMonthlyBudget.textContent = state.monthlyBudget.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  elements.txtTotalExpenses.textContent = monthlyExpenses.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  elements.txtRemainingBudget.textContent = remainingBudget.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  // Update budget progress bar
  let usagePercent = state.monthlyBudget > 0 ? (monthlyExpenses / state.monthlyBudget) * 100 : 0;
  elements.budgetProgressBar.style.width = `${Math.min(usagePercent, 100)}%`;
  elements.txtBudgetPercent.textContent = `${Math.round(usagePercent)}% Used`;
  
  // Progress Bar color and warnings
  elements.budgetProgressBar.className = 'budget-progress-bar';
  elements.balanceCard.className = 'metric-card balance-card';

  if (usagePercent < 85) {
    elements.budgetProgressBar.classList.add('success');
    elements.txtBudgetTextSummary.textContent = 'Within limits';
    elements.txtBudgetTextSummary.style.color = 'var(--success)';
    elements.txtBalanceStatus.textContent = 'Available funds';
    elements.txtBalanceStatus.style.color = 'var(--text-muted)';
  } else if (usagePercent >= 85 && usagePercent < 100) {
    elements.budgetProgressBar.classList.add('warning');
    elements.txtBudgetTextSummary.textContent = 'Approaching limit!';
    elements.txtBudgetTextSummary.style.color = 'var(--warning)';
    elements.txtBalanceStatus.textContent = 'Low balance warning';
    elements.txtBalanceStatus.style.color = 'var(--warning)';
    elements.balanceCard.classList.add('warning-glow');
  } else {
    elements.budgetProgressBar.classList.add('danger');
    elements.txtBudgetTextSummary.textContent = 'Budget exceeded!';
    elements.txtBudgetTextSummary.style.color = 'var(--danger)';
    elements.txtBalanceStatus.textContent = 'Limit exceeded!';
    elements.txtBalanceStatus.style.color = 'var(--danger)';
    elements.balanceCard.classList.add('danger-glow');
  }

  // 2. Filter and Sort Transactions
  let filtered = [...state.transactions];

  // Category filter
  if (state.filters.category !== 'All') {
    filtered = filtered.filter(t => t.category === state.filters.category);
  }

  // Search filter (description or category matches)
  if (state.filters.search) {
    const q = state.filters.search.toLowerCase();
    filtered = filtered.filter(t => 
      t.title.toLowerCase().includes(q) || 
      t.category.toLowerCase().includes(q)
    );
  }

  // Sorting
  filtered.sort((a, b) => {
    switch (state.filters.sort) {
      case 'date-desc':
        return new Date(b.date) - new Date(a.date);
      case 'date-asc':
        return new Date(a.date) - new Date(b.date);
      case 'amount-desc':
        return b.amount - a.amount;
      case 'amount-asc':
        return a.amount - b.amount;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Render Count
  elements.txtTransactionCount.textContent = `${filtered.length} entry${filtered.length !== 1 ? 's' : ''}`;

  // Render HTML list
  elements.transactionList.innerHTML = '';
  
  if (filtered.length === 0) {
    elements.emptyState.style.display = 'flex';
  } else {
    elements.emptyState.style.display = 'none';
    filtered.forEach(t => {
      const item = document.createElement('div');
      item.className = 'transaction-item';
      item.setAttribute('data-id', t.id);
      
      const catClass = t.category.toLowerCase();
      
      item.innerHTML = `
        <div class="transaction-details-left">
          <div class="category-icon-indicator ${catClass}">
            ${ICONS[t.category] || ICONS.Others}
          </div>
          <div class="transaction-text">
            <span class="transaction-title">${escapeHTML(t.title)}</span>
            <div class="transaction-meta">
              <span class="badge ${catClass}">${t.category}</span>
              <span>•</span>
              <span>${formatDateString(t.date)}</span>
            </div>
          </div>
        </div>
        <div class="transaction-right">
          <span class="transaction-amount-val">₹${t.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          <div class="transaction-actions">
            <button class="action-btn edit-btn" onclick="startEditTransaction('${t.id}')" title="Edit Transaction" aria-label="Edit transaction">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
              </svg>
            </button>
            <button class="action-btn delete-btn" onclick="deleteTransaction('${t.id}')" title="Delete Transaction" aria-label="Delete transaction">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>
      `;
      elements.transactionList.appendChild(item);
    });
  }

  // 3. Render Charts
  renderCharts();
}

// Charts Generation (Chart.js)
function renderCharts() {
  const isDark = state.theme === 'dark';
  const textColor = isDark ? '#94a3b8' : '#475569';
  const gridColor = isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
  const fontOptions = {
    family: 'Plus Jakarta Sans',
    size: 11
  };

  // --- Category Chart (Doughnut) ---
  const catData = {};
  // initialize categories
  Object.keys(ICONS).forEach(c => catData[c] = 0);
  state.transactions.forEach(t => {
    catData[t.category] = (catData[t.category] || 0) + t.amount;
  });

  const categories = Object.keys(catData).filter(c => catData[c] > 0);
  const amounts = categories.map(c => catData[c]);
  const colors = categories.map(c => CATEGORY_COLORS[c] || '#64748b');

  const canvasCategory = document.getElementById('categoryChart');
  if (canvasCategory) {
    if (categoryChartInstance) {
      categoryChartInstance.destroy();
    }
    
    if (categories.length === 0) {
      // draw empty state on chart
      const ctx = canvasCategory.getContext('2d');
      ctx.clearRect(0, 0, canvasCategory.width, canvasCategory.height);
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.font = '14px Plus Jakarta Sans';
      ctx.fillText('No transactions for distribution analysis', canvasCategory.width / 2, canvasCategory.height / 2);
    } else {
      categoryChartInstance = new Chart(canvasCategory, {
        type: 'doughnut',
        data: {
          labels: categories,
          datasets: [{
            data: amounts,
            backgroundColor: colors,
            borderWidth: isDark ? 2 : 1,
            borderColor: isDark ? '#0f172a' : '#ffffff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: window.innerWidth < 480 ? 'bottom' : 'right',
              labels: {
                color: textColor,
                font: fontOptions,
                boxWidth: 12,
                padding: 10
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return ` ₹${context.parsed.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
                }
              }
            }
          },
          cutout: '70%'
        }
      });
    }
  }

  // --- Trend Chart (Bar Chart for last 7 days) ---
  const dailyData = {};
  const today = new Date();
  
  // Generate labels for last 7 calendar days
  const dateLabels = [];
  const dateKeys = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    dateKeys.push(key);
    
    // Label as "May 20" or similar
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dateLabels.push(label);
    
    dailyData[key] = 0;
  }

  // Group transaction values by date
  state.transactions.forEach(t => {
    if (dailyData[t.date] !== undefined) {
      dailyData[t.date] += t.amount;
    }
  });

  const dailyAmounts = dateKeys.map(k => dailyData[k]);

  const canvasTrend = document.getElementById('trendChart');
  if (canvasTrend) {
    if (trendChartInstance) {
      trendChartInstance.destroy();
    }
    
    const ctx = canvasTrend.getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
    gradient.addColorStop(1, 'rgba(99, 102, 241, 0.01)');

    trendChartInstance = new Chart(canvasTrend, {
      type: 'bar',
      data: {
        labels: dateLabels,
        datasets: [{
          label: 'Spent',
          data: dailyAmounts,
          backgroundColor: isDark ? 'rgba(99, 102, 241, 0.55)' : 'rgba(79, 70, 229, 0.7)',
          hoverBackgroundColor: 'rgba(99, 102, 241, 0.8)',
          borderRadius: 6,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return ` Spent: ₹${context.parsed.y.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: textColor,
              font: fontOptions
            }
          },
          y: {
            grid: {
              color: gridColor
            },
            ticks: {
              color: textColor,
              font: fontOptions,
              callback: function(value) {
                return '₹' + value.toLocaleString('en-IN');
              }
            },
            border: {
              dash: [4, 4]
            }
          }
        }
      }
    });
  }
}

// Helpers
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function formatDateString(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  
  // Format to standard localized layout: "May 20, 2026"
  // Using Date.UTC to prevent timezone shift issues
  const dateObj = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  return dateObj.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
}

// Expose functions globally for dynamic elements (e.g. edit/delete buttons inline HTML)
window.startEditTransaction = startEditTransaction;
window.deleteTransaction = deleteTransaction;

// Run Init
window.addEventListener('DOMContentLoaded', init);
