# ♣︎ Inventory & Asset Tracker  

♝ A full-stack application for **shopkeepers** to manage inventory, suppliers, and sales. It supports **real-time stock updates**, **billing system**, **low-stock alerts**, and **sales reports**.  

---

♞ **Tech Stack** :  
- **Backend:** Node.js, Express, Prisma, MySQL  
- **Frontend:** React 
- **Auth:** JWT Authentication  
- **Deployment:** Vercel (Frontend) + Railway/Render (Backend)  

---

## ♛ Features  
-  **User Authentication (JWT)** – secure login & signup  
- **Inventory Management** – add, update, delete items with stock levels  
- **Supplier Management** – manage supplier info & map items  
- **Billing System** – generate bills, auto-deduct stock, low-stock alerts  
- **Reports & Analytics** – view sales, inventory stats, reorder alerts  

---

## ♜ Contributing to Inventory and Asset Tracker (Backend)

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
