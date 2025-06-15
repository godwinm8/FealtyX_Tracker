# FealtyX - Bug & Task Tracker Application

This project is a comprehensive bug and task tracker interface built to fulfill the requirements of the FealtyX NextJS/React JS Assignment. It features role-based user authentication, task management, time tracking, and a clean, responsive user interface.

---

### **Live Demo & Video**

*   **Working Demo Link:** [https://fealty-x-tracker.vercel.app/](https://your-deployment-link.vercel.app/)  
*   **Video Recording Link:** [https://drive.google.com/file/d/1pSbSLOiuLdS0nFpOPAPqcc3ckW_3S1QA/view?usp=sharing](https://drive.google.com/file/d/1pSbSLOiuLdS0nFpOPAPqcc3ckW_3S1QA/view?usp=sharing)  

---

### **Features Implemented**

*   **User Authentication:** A mock login system with two distinct user roles: `Developer` and `Manager`. The user's session is persisted in `localStorage`.
*   **Role-Based Dashboards:**
    *   **Managers** can view all tasks and have access to a trend line chart showing concurrent active tasks.
    *   **Developers** can view and manage only the tasks assigned to them.
*   **Task/Bug Management (CRUD):**
    *   Developers can **Create** new tasks with a title, description, priority, and assignee.
    *   Developers can **Read** their assigned tasks.
    *   Developers can **Update** (edit) their assigned tasks.
    *   Developers can **Delete** their assigned tasks.
*   **Task Closure Workflow:**
    *   A Developer can mark a task as done, moving it to a `Pending Approval` state.
    *   A Manager can then either `Approve` the closure (moving it to `Closed`) or `Re-open` the task.
*   **Time Tracking:** A feature on the task detail page to start/stop a timer, logging time spent on a task. Total time is displayed on the task card.
*   **Filtering & Sorting:** The dashboard includes controls to filter tasks by status, priority, and a text search on the title.
*   **Responsive UI:** The application is fully responsive and designed to work well on desktop and mobile devices.

---

### **Technology Stack**

*   **Framework:** React.js (v18+) with Create React App
*   **Language:** JavaScript (ES6+)
*   **Styling:** Tailwind CSS with Headless UI for accessible components.
*   **State Management:** Zustand (with `persist` and `immer` middleware)
*   **Routing:** React Router DOM
*   **Charting:** Recharts
*   **Icons:** Lucide React
*   **Utilities:** `date-fns` for date manipulation, `uuid` for unique ID generation.

---

### **How to Run Locally**

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/godwinm8/FealtyX_Tracker.git
    cd FealtyX_Tracker
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:3000`.

---

### **Mock User Credentials**

You can use the following credentials to log in and test the different roles:

*   **Manager Role:**
    *   **Email:** `manager@fealtyx.com`
    *   **Password:** `password123`

*   **Developer Role:**
    *   **Email:** `dev@fealtyx.com`
    *   **Password:** `password123`

    *   **Email:** `dev2@fealtyx.com`
    *   **Password:** `password123`

---

### **Assumptions & Highlights**

*   **No Backend:** The application is fully frontend. All data is managed in-memory with Zustand and initialized from mock JSON files. Data changes are persisted to `localStorage` but will be reset if the browser cache is cleared.
*   **Mock Authentication:** The login system is a mock implementation for demonstration purposes and does not involve secure password hashing or real session management.
*   **Architecture:** The project follows a clean architectural pattern, separating UI components from business logic (stores) and using a custom `useAuth` hook as an abstraction layer over the state management library. This makes the code highly maintainable and scalable.