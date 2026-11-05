# HCM Lite — Human Capital Management System

A lightweight Human Capital Management (HCM) application built as a practice assignment using Next.js, Firebase, and Redux Toolkit.

HCM Lite is designed around three user roles: **Admin, HR, and Employee**. Each role has its own dashboard and access level.

## 1. Project Overview

The purpose of this project is to build a role-based HCM application with Firebase Authentication and Cloud Firestore.

Users authenticate using email and password. After login, the application retrieves their profile from Firestore and identifies their assigned role.

Based on the role, users are directed to the appropriate dashboard.

### User Roles

| Role | Dashboard | Purpose |
|---|---|---|
| Admin | `/admin` | Administrative dashboard |
| HR | `/hr` | Human Resources dashboard |
| Employee | `/employee` | Employee dashboard |

## 2. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | React framework and application routing |
| React 19 | UI development |
| JavaScript | Application programming language |
| Tailwind CSS v4 | Styling and responsive design |
| Firebase Authentication | User authentication |
| Cloud Firestore | User profile and application data |
| Redux Toolkit | Global authentication state management |
| React Redux | Connecting React components to Redux |

**Note:** This project currently uses the Firebase Client SDK. Firebase Admin SDK is not used in the current implementation.

## 3. Main Features

The project is being developed in phases.

### Authentication
- Email and password login using Firebase Authentication.
- Firebase authentication state monitoring.
- User profile retrieval from Firestore.
- Role-based login redirection.
- Handling of missing or invalid user profiles.

### Role-Based Dashboards
- Separate dashboard routes for Admin, HR, and Employee.
- Shared dashboard layout.
- Role-specific navigation and dashboard content.
- Protection against unauthorized dashboard navigation through client-side role checks.
- Logout button in the sidebar, topbar, and mobile drawer.
- Profile card on each dashboard showing the logged-in user's name, email, and role.

### State Management
- Redux Toolkit for authentication state.
- Centralized user information.
- Authentication loading and error states.
- Firebase authentication listener.

### Planned Improvements
- Employee and HR management features.
- Additional Firestore data management.

## 4. Project Structure

The application follows the Next.js App Router structure.

```text
hcm-lite-practice/
│
├── public/
│   └── images/
│
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.js
│   │   │
│   │   ├── (dashboard)/
│   │   │   ├── layout.js
│   │   │   ├── admin/
│   │   │   │   └── page.js
│   │   │   ├── hr/
│   │   │   │   └── page.js
│   │   │   └── employee/
│   │   │       └── page.js
│   │   │
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthListener.jsx
│   │   │   └── RoleGuard.jsx
│   │   ├── login/
│   │   │   ├── LoginForm.jsx
│   │   │   └── Brandpanel.jsx
│   │   └── dashboard/
│   │       ├── DashboardShell.jsx
│   │       ├── Sidebar.jsx
│   │       ├── Topbar.jsx
│   │       ├── MobileDrawer.jsx
│   │       ├── NavList.jsx
│   │       ├── navConfig.js
│   │       └── UserInfo.jsx
│   │
│   ├── lib/
│   │   └── firebase/
│   │       └── firebase.js
│   │
│   └── reduxToolkit/
│       ├── store.js
│       ├── ReduxProvider.js
│       └── features/
│           └── auth/
│               └── authSlice.js
│
├── .env.example
├── .env.local
├── package.json
└── README.md
```

## 5. Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git
- A Firebase project

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project:

```bash
cd hcm-lite-practice
```

Install dependencies:

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with the configuration from your Firebase project.

**Important:** Never commit `.env.local` or expose private credentials in your repository. The Firebase client configuration is intended for client-side use; Firestore Security Rules must still enforce data access.

### Run the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## 6. Firebase Configuration

HCM Lite uses two Firebase services:

### Firebase Authentication

Enable the **Email/Password** sign-in provider in:

Firebase Console → Authentication → Sign-in method.

Users must be created in Firebase Authentication before they can log in.

### Cloud Firestore

Create a Firestore collection named:

```text
users
```

Each user's document ID must be their Firebase Authentication UID.

Example document:

```json
{
  "uid": "FIREBASE_AUTH_UID",
  "name": "Test Employee",
  "email": "employee.demo@hcmlite.test",
  "role": "employee"
}
```

Supported roles:

- `admin`
- `hr`
- `employee`

The document ID and `uid` field must match the user's actual Firebase Authentication UID.

**Important:** Passwords are managed by Firebase Authentication. Never store passwords in Firestore.

## 7. Demo Credentials

The following are the suggested demo accounts for testing the application.

| Role | Email | Password |
|---|---|---|
| Admin | `admin.demo@hcmlite.test` | `HcmAdmin@2026` |
| HR | `hr.demo@hcmlite.test` | `HcmHR@2026` |
| Employee | `employee.demo@hcmlite.test` | `HcmEmployee@2026` |

**Account setup:** These are demo credentials, not automatically created accounts. The project administrator must first create each account in Firebase Authentication and create its matching Firestore `users` document.

Do not use these credentials for real accounts or production data. If the repository is public, consider using temporary demo passwords and changing them after the demonstration.

## 8. Testing Checklist

Use the following checklist to test the application.

### Authentication
- [x] Login with valid credentials.
- [ ] Login with an incorrect password.
- [ ] Handle a user without a Firestore profile.
- [ ] Handle an invalid role.
- [x] Check authentication state after refreshing the page.
- [x] Test logout.

### Role-Based Access
- [x] Admin is redirected to `/admin`.
- [x] HR is redirected to `/hr`.
- [x] Employee is redirected to `/employee`.
- [x] Unauthenticated users cannot access protected dashboards.
- [x] Users cannot access dashboards belonging to another role.

### Application
- [x] All dashboard routes load correctly.
- [x] Dashboard layout works on desktop.
- [x] Dashboard layout works on mobile.
- [ ] No critical browser console errors.
- [x] Production build completes successfully.

## 9. Development Commands

Run ESLint:

```bash
npm run lint
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## 10. Security Considerations

This project uses Firebase Client SDK and client-side role checks.

Client-side role protection helps control navigation and the user interface, but it is not a trusted security boundary.

Firestore Security Rules must independently validate authenticated users and restrict access to protected data.

Users must not be allowed to change their own roles through ordinary client-side operations.

For a production-ready HCM application, trusted server-side authorization using Firebase Admin SDK or an equivalent secure backend should be considered.

## 11. Project Development Approach

HCM Lite is being developed incrementally in phases.

Each phase focuses on a specific part of the application, followed by testing before moving to the next phase.

The development priorities are:

1. Authentication and Firebase integration.
2. Redux Toolkit authentication state management.
3. Dashboard route implementation.
4. Role-based access protection.
5. Shared dashboard layout and navigation.
6. Logout and Firestore security.
7. Testing, documentation, and final improvements.

---

**Project:** HCM Lite — Human Capital Management System  
**Framework:** Next.js  
**Language:** JavaScript  
**Backend Services:** Firebase Authentication and Cloud Firestore  
**State Management:** Redux Toolkit  
**Project Type:** Practice Assignment