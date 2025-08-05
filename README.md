# Wellspring Sync - A Modern Healthcare Platform

**Wellspring Sync** is a modern, responsive web application designed to streamline the patient experience for medical clinics. It provides an intuitive interface for patients to find doctors, book appointments, and manage their health journey online.

---

## 🚀 Key Features

- **User Authentication**: Secure user registration and login functionality.
- **Dynamic Appointment Booking**: An interactive system for patients to schedule appointments with specific doctors.
- **Patient Dashboard**: A dedicated space for users to view and manage their upcoming and past appointments.
- **Dynamic Content**: Doctor profiles and clinic services are managed from a backend, allowing for easy updates.
- **Responsive Design**: A seamless experience across desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

This project is built with a modern and powerful set of technologies:

- **Vite**: A next-generation frontend tooling for fast development.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically typed superset of JavaScript that enhances code quality.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **shadcn/ui**: A collection of beautifully designed, reusable components.
- **Supabase** (Planned): The backend for database and authentication.

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed:

- Node.js (version 18 or later)
- npm

### Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/Aka3213/wellspring-sync.git
```

2. **Navigate to the project directory**

```bash
cd wellspring-sync
```

3. **Install dependencies**

```bash
npm install
```

4. **Set up environment variables**

Create a file named `.env` in the root of your project and add your Supabase keys:

```bash
# .env file
VITE_SUPABASE_URL="your-supabase-project-url"
VITE_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

5. **Start the development server**

```bash
npm run dev
```

Open your browser and visit [http://localhost:5173](http://localhost:5173) to view the application.

---