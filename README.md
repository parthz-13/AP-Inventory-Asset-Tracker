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

# 🧠 Ideation Document
## 1. Title & Team Members

### Project Title: Inventory & Asset Tracker
### Team Members:

- Parth Kumar Singh

- Veer Shah

- Karan Rawat

- Ganesh Wayal

## 2. Problem Statement

Many small shopkeepers and local businesses struggle to efficiently manage their stock, suppliers, and sales records. Traditional methods such as maintaining physical ledgers or Excel sheets are prone to errors, data loss, and inefficiency.
This lack of automation leads to stock mismanagement, delayed reordering, and difficulty in tracking profits or sales trends.

The problem is significant for local retailers and wholesalers, especially those without access to complex ERP systems, who need an affordable and easy-to-use inventory tracking solution.

## 3. Proposed Solution

Our proposed solution — Inventory & Asset Tracker — is a web-based platform designed to digitize inventory and asset management for small business owners.

### The system allows users to:

- Add, edit, and manage items and stock levels in real-time.

- Automatically adjust stock when a sale occurs.

- Get low-stock alerts and sales analytics.

- Manage supplier information and link items to vendors.

- Generate bills and invoices through an integrated billing module.

This simplifies day-to-day operations, reduces manual workload, and provides insights for better decision-making.

## 4. Target Audience

- Small and medium shopkeepers (retailers, wholesalers).

- Local business owners managing physical stock.

- Warehouse managers who require real-time stock tracking.

- Service providers maintaining equipment or assets.

These users typically need a simple, intuitive, and low-cost solution for inventory tracking without needing technical expertise.

## 5. Market Research & Existing Alternatives

Existing platforms like Zoho Inventory, Tally ERP, and Vyapar App offer inventory management solutions, but:

- They are expensive or complex for small-scale businesses.

- They often require installation and training, limiting accessibility.

- Most free versions have restricted functionality.

Our solution is web-based, lightweight, and open-source, making it ideal for local entrepreneurs and students building scalable solutions.


## 6. Implementation Plan

| **Phase** | **Description** |
|------------|-----------------|
| **Phase 1** | Requirements gathering & database design (ER Diagram) |
| **Phase 2** | Backend setup with Node.js, Express, Prisma ORM, and MySQL |
| **Phase 3** | Frontend development using React and TailwindCSS |
| **Phase 4** | Integration of authentication, billing, and analytics |
| **Phase 5** | Testing, deployment, and documentation |
| **Phase 6** | Evaluation and further feature enhancements |

 **Team coordination** will be maintained via GitHub and shared documentation.


## 7. Major Challenges & Risks

- Database design complexity to handle stock movements efficiently.  
- Synchronization between backend and frontend for real-time updates.  
- Data security to protect user and business data.  
- Deployment issues while integrating backend APIs with frontend.  

 **Mitigation Plans:**  
Modular testing, version control, and regular code reviews will help reduce risks and ensure smooth project execution.



## 8. Expected Outcomes & Impact

**✅ Success Indicators:**
- Functioning system capable of managing products, suppliers, and sales.  
- Real-time stock and billing updates.  
- Positive feedback from small business users during testing.  

**🌍 Impact:**
- Encourages digital transformation among small retailers.  
- Reduces manual errors and time spent on inventory tracking.  
- Provides data-driven insights to improve efficiency and growth.  



## 9. Next Steps

- Finalize database schema (ER diagram).  
- Complete authentication and inventory CRUD operations.  
- Integrate billing module and generate reports.  
- Conduct testing with sample data.  
- Deploy MVP version for evaluation and feedback.  







