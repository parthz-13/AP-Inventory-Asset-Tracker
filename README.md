# ♣︎ Inventory & Asset Tracker  

♝ A full-stack web application for **shopkeepers and small businesses** to manage their inventory, suppliers, and sales efficiently. It offers **real-time stock tracking**, **billing**, **low-stock alerts**, and **insightful analytics** — all in one place.  

---

## ♞ Tech Stack  

| Layer | Technologies Used |
|:--|:--|
| **Frontend** | React.js, TailwindCSS |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (via Prisma ORM) |
| **Authentication** | JWT (JSON Web Tokens) |
| **Deployment** | Vercel (Frontend), Railway / Render (Backend) |

---

## ♛ Features  

✅ **User Authentication (JWT)** – secure login & signup for multiple roles (admin, staff)  
✅ **Inventory Management** – add, edit, and delete items with real-time stock tracking  
✅ **Supplier Management** – maintain supplier details and link them with products  
✅ **Billing System** – create bills, auto-deduct stock, and generate low-stock alerts  
✅ **Reports & Analytics** – view sales data, track trends, and get reorder reminders  

---

## ♙ Project Documentation

- [Ideation Document](./ideation.md)

---

## ♜ Project Setup (Local Development)

###  Clone the Repository  
```bash
git clone https://github.com/parthz-13/inventory-asset-tracker.git
cd inventory-asset-tracker
```
---
###  Backend Setup
``` bash
cd backend
npm install
```

### Create a .env file in the backend root directory and add your envionment variables:

``` bash
DATABASE_URL="mysql://user:password@localhost:3306/inventory_db"
JWT_SECRET="your_secret_key"
```

### Run database migrations:

``` bash
npx prisma migrate dev
```


### Start the server:


``` bash
npm run dev
```
---

##  Frontend Setup
``` bash
cd frontend
npm install
npm run dev
```
---
### ♟️ Folder Structure
``` bash
inventory-asset-tracker/
│
├── backend/
│   ├── prisma/           # Prisma schema & migrations
│   ├── routes/           # Express routes
│   ├── controllers/      # Business logic
│   ├── middlewares/      # Auth & validation middleware
│   └── server.js         # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # App pages
│   │   ├── hooks/        # Custom React hooks
│   │   └── App.jsx
│   └── vite.config.js
│
└── README.md
```
---

# Contributing to Inventory and Asset Tracker (Backend)

1. **Fork the repository**  
   Click the **Fork** button at the top-right corner of the repository page to create a copy in your GitHub account.

2. **Clone your fork locally**  
   ```bash
   git clone https://github.com/parthz-13/inventory-asset-tracker.git
   cd inventory-asset-tracker
   
3. **Add the original repository as upstream**  
   ```bash
   git remote add upstream https://github.com/parthz-13/inventory-asset-tracker.git
4. **Install dependencies**
    ```bash
    npm i
5. **Sync your fork with upstream main**
   ```bash
   git checkout main
   git pull upstream main
6. **Create a new branch for your feature/fix**

    *`Use a descriptive branch name, e.g., feat/auth-middleware or fix/item-route`*
   ```bash
   git checkout -b <branch-name>
7. **Make your changes**

    *`Develop your feature or fix bugs in this branch.`*
8. **Stage and Commit Changes**
  ```bash
git add .
git commit -m "Brief description of your changes"
```
9. **Push your branch to your fork**
    
    ```bash
    git push origin <branch-name>
    ```
11. **Open a Pull Request (PR)**
    
*Go to your fork on GitHub and click `Compare & pull request`.
Provide a clear description of the changes and reference any related issues.* 

--- 
# 📈 Future Enhancements

- Integration with barcode scanner 📦

- Role-based access control for employees

- Expense tracking and profit analysis

- Exportable reports (PDF/Excel)

---

# 👥 Contributors

- Parth Kumar Singh

- Veer Shah

- Karan Rawat

- Ganesh Wayal
---

