# Apex Finance - Personal Expense & Budget Tracker

Apex Finance is a premium, highly interactive, and fully responsive Single Page Web Application (SPA) designed to help users take control of their personal finance. Users can manage daily expenses, set monthly budgets, and analyze spending patterns via modern visual charts.

---

## 🚀 Live Demo & Visuals

To open and run the project:
1. Clone or download this repository.
2. Double-click the `index.html` file in your directory to launch the app directly in any modern web browser.
3. Alternatively, run it using a local development server (such as VS Code's **Live Server** extension or `http-server` via Node).

---

## ✨ Features

### 1. Modern Premium Dashboard
- **Glassmorphic UI Design**: Sophisticated semi-transparent cards with smooth backdrop blur (`backdrop-filter`) and drop shadows.
- **Dynamic Indicators**: Real-time updates of Total Budget, Total Expenses, and Remaining Balance.
- **Dynamic Progress Bar**: Color-coded indicator that changes depending on budget usage:
  - 🟢 **Green** (`<85%`): Safely within limit.
  - 🟡 **Orange** (`85% - 99%`): Warning threshold.
  - 🔴 **Red** (`>=100%`): Alert indicating budget is exceeded (with visual container glow and toast warning).

### 2. Comprehensive Expense Management
- **Transaction Creation**: Add details like Description, Amount, Category, and Date.
- **Interactive Editing**: Click the Edit icon on any transaction to populate and transform the input form, saving updates instantly.
- **Fluid Deletes**: Click the Delete icon to trigger a fade-out animation before removal from the data store.

### 3. Categorization & Search
- **Category Filter Pills**: Quickly filter transactions with responsive buttons (All, Food, Travel, Shopping, Utilities, Entertainment, Health, Others).
- **Instant Search**: Reactive filtering that scans titles and categories instantly as you type.
- **Sorting Options**: Sort transactions dynamically by Newest, Oldest, Highest/Lowest Amount, or Alphabetically (A-Z).

### 4. Basic Data Visualization (Chart.js)
- **Category Distribution Chart**: Interactive doughnut chart showcasing budget share per category.
- **Daily Spending Trend**: Visual bar chart showing daily aggregate spend over the last 7 calendar days.
- **Theme Sync**: Colors, ticks, and legends adjust automatically when toggling between themes.

### 5. Portability & Backups
- **CSV Export**: Instantly download your full ledger as a spreadsheet-compatible `.csv` file.
- **CSV Import**: Upload previously exported CSV spreadsheets to restore or merge transaction logs.

### 6. Local Storage Persistence
- Saves budget config, theme preference, and transaction list in the browser's `localStorage` so data survives refreshes.
- Pre-seeds beautiful sample data on initial launch so the dashboard does not appear blank.

---

## 🛠️ Technology Stack

- **HTML5**: Structured markup.
- **CSS3 (Vanilla)**: Theme variables, glassmorphic layout, custom scrollbar, hover indicators, and keyframe animations.
- **JavaScript (ES6+)**: Custom State Controller, LocalStorage syncing, CSV compiler, DOM Renderer, and event listeners.
- **Chart.js (CDN)**: Smoothly animated Canvas rendering for data analytics.

---

## 📁 File Structure

```text
MOVIE LISTING/
├── index.html        # Main HTML entry skeleton
├── styles.css        # Theme variables and global styles
├── app.js            # Main JavaScript application controller
├── README.md         # Documentation and guide
└── Personal Finance... # Initial task description text
```
