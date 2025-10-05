# 📦 POSME – React + Firebase Cloud POS  
> **Complete, production-ready point-of-sale system** for small-medium retail / café / restaurant.  
> **Zero server maintenance** – runs entirely on Google Cloud (Firestore, Functions, Hosting).

---

## 🧩 Features at a Glance

| Module | Description |
|--------|-------------|
| 🔐 **Auth** | Email + password with role-based access (admin / manager / cashier) |
| 🛍️ **Sales** | Touch-friendly UI, cart, discount, tax, multi-payment (cash / QR / card) |
| 📦 **Products** | SKU, category, cost, price, image, active toggle |
| 📊 **Inventory** | Real-time stock per branch, low-stock alert (Cloud Function) |
| 📈 **Reports** | Daily sales, top products, CSV export (callable function) |
| 🏪 **Multi-Branch** | Separate stock & sales per branch, central dashboard |
| 🖨️ **Receipt** | 58 mm thermal printer via Web-USB or cloud print |
| 📱 **PWA** | Install on tablet / mobile, works offline (cache-first) |
| 🔒 **Security** | Firestore Rules + App Check + API key restrictions |

---

## 🏗️ Architecture

```
┌─ Hosting (Vite + React)  ––  PWA, Tailwind, DaisyUI
├─ Functions (TypeScript)  ––  Reports, Stock Alert, Print Queue
├─ Firestore (NoSQL)       ––  Products, Orders, Inventory, Users
└─ Firebase Auth           ––  Email/Pass, Custom Claims (role & branch)
```

---

## 📁 Project Structure

```
my-pos/
├─ hosting/               – React + Vite source code
│  ├─ src/
│  │  ├─ router/         – React Router v6, ProtectedRoute, RoleRoute
│  │  ├─ contexts/       – AuthContext, CartContext, BranchContext
│  │  ├─ hooks/          – useProducts, useCart, useOrders, useInventory
│  │  ├─ services/       – CRUD wrappers + CSV export
│  │  ├─ components/     – ui/*, pos/* (ProductGrid, CartPanel, CheckoutModal)
│  │  ├─ pages/          – Login, POS, Dashboard, Products, Setup
│  │  ├─ utils/          – formatters, constants, date helpers
│  │  └─ main.jsx        – entry point (Context + Router)
│  ├─ public/            – icons, manifest, receipt template
│  └─ .env               – Firebase config (VITE_*)
├─ posme/                – Cloud Functions (TypeScript)
│  ├─ src/
│  │  ├─ reports.ts      – dailySales callable
│  │  ├─ lowStockAlert.ts – inventory watcher
│  │  └─ index.ts        – exports
│  └─ package.json
├─ firestore.rules       – Security rules
├─ firestore.indexes.json – Composite indexes
└─ firebase.json         – Hosting, Functions, Firestore paths
```

---

## ⚙️ 1. Prerequisites

- Node.js ≥ 20  
- Firebase CLI (`npm i -g firebase-tools`)  
- Google account (Firebase project enabled)  
- (Optional) Thermal printer (58 mm) + USB cable for receipt

---

## 🚀 2. Quick Start (Development)

```bash
# 1. Clone
git clone https://github.com/worawut-boxsolution/pos_react
cd posme

# 2. Install dependencies
cd hosting && npm install
cd ../posme && npm install

# 3. Create Firebase project & download config
firebase login
firebase init hosting firestore functions

# 4. Put config into hosting/.env
cp hosting/.env.example hosting/.env
# Edit hosting/.env (get keys from Firebase Console → Project Settings → Web App)
```

---

## 🔧 3. Create First Admin (One-Time)

```bash
# Generate service-account key (Firebase Console → Settings → Service Accounts → Generate Key)
# Save as serviceAccount.json in project root
node makeAdmin.js     # creates admin user & exits
```

Login with printed email/password at `http://localhost:5173/login`

---

## 🏃 4. Run Locally

```bash
# Terminal 1 – React dev server
cd hosting
npm run dev           # http://localhost:5173

# Terminal 2 – Cloud Functions emulator (optional)
firebase emulators:start --only functions,firestore,auth
```

---

## 🌍 5. Deploy to Production

```bash
# Build & ship everything
firebase deploy        # Hosting + Functions + Firestore Rules + Indexes
```

Your POS is now live at `https://your-project.web.app` 🎉

---

## 📊 6. Daily Operations

| Task | Where |
|------|-------|
| Add product | Menu “Products” (admin/manager) |
| Sell | “POS” screen (cashier) |
| View sales | “Dashboard” (real-time) |
| Export CSV | “Reports” → Download |
| Low-stock alert | automatic (Cloud Function) |
| Add expense | “Expenses” page (manager) |

---

## 🖨️ 7. Receipt Printing

**Web-USB (no driver)**  
1. Connect 58 mm thermal printer via USB  
2. Chrome/Edge → POS → Checkout → “Print”  
3. Browser asks for USB device → choose printer → print!

**Cloud Print (remote)**  
- Raspberry Pi Zero (USB) polls Firestore queue  
- Function `printOrder` pushes ESC/POS bytes to queue  
- Pi prints, marks `printed: true`

---

## 🔐 8. Security Checklist

- [ ] Enable **App Check** (reCAPTCHA / DeviceCheck)  
- [ ] Restrict API key (HTTP referrer + iOS/Android bundle)  
- [ ] Set **budget alert** in Google Cloud  
- [ ] Backup Firestore daily (scheduled export)  
- [ ] Use **custom claims** (`role`, `branchId`) in Rules  
- [ ] Never commit `.env` / service-account JSON

---

## 🧪 9. Testing

```bash
cd hosting
npm run test          # unit (Vitest)
npm run test:e2e      # Cypress (headless)
```

---

## 📚 10. Useful Links

| Topic | URL |
|-------|-----|
| Firestore Rules | https://firebase.google.com/docs/firestore/security/get-started |
| Cloud Functions | https://firebase.google.com/docs/functions |
| Vite PWA | https://vite-pwa-org.netlify.app/ |
| DaisyUI | https://daisyui.com/ |
| ESC/POS Reference | https://github.com/NielsLeenheer/ESCPosEncoder |

---

## 📄 License

MIT © 2025 "Worawut.cha"  
Feel free to fork, modify, and commercialize.

---

**Enjoy selling!** 🛒🎉  
Report bugs / feature requests via GitHub Issues.