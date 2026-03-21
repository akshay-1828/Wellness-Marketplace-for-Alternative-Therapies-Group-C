🌿 Wellness Marketplace for Alternative Therapies
📌 Project Overview

This is a full-stack wellness marketplace that connects users with verified alternative therapy providers such as physiotherapists, acupuncturists, Ayurveda specialists, and chiropractors.

The platform enables users to:

Book therapy sessions
Purchase wellness products
Interact with practitioners
Receive AI-powered recommendations

It integrates secure payments, scheduling, and health APIs to deliver a complete wellness experience.

🚀 Features
✅ Verified practitioner profiles with ratings & specialization
📅 Therapy session booking & scheduling
🛒 Product marketplace with cart management
💬 Community Q&A and review system
🤖 AI-based therapy recommendation engine (planned)
🔐 Secure authentication using JWT
💳 Payment integration (planned)
🔔 Email & in-app notifications (planned)
🌍 Integration with OpenFDA, WHO, and fitness APIs (planned)
🧩 Modules
Module A: Practitioner onboarding & verification
Module B: Therapy booking & scheduling
Module C: Product marketplace & cart
Module D: Community reviews & Q&A forum
Module E: AI recommendations & health API integration (planned)
Module F: Notifications & secure payment (planned)
🛠 Tech Stack
💻 Frontend
React.js (Vite)
Tailwind CSS
⚙️ Backend
Spring Boot (Java)
REST APIs
🗄 Database
MySQL
🔐 Authentication
JWT (Access + Refresh Tokens)
🌍 Other Integrations
Google Maps API + Geolocation API
WebSockets (Spring WebSocket + STOMP)
📈 Milestones & Progress
✅ Milestone 1: Practitioner & User Profiles
User registration & login (JWT authentication)
Practitioner verification
User dashboard

Outcome:

Login/Register page
Profile setup
Practitioner verification module
✅ Milestone 2: Therapy Booking & Scheduling
Browse and book sessions
Calendar integration

Outcome:

Booking form
Calendar widget
Session details page
✅ Milestone 3: Product Store & Community Forum (Completed)
Product listing & cart
Community Q&A
Reviews system

Outcome:

Product store
Review system
Q&A forum
⚙️ Setup Instructions
🔹 Backend (Spring Boot)
cd demo-backend
mvn clean install
mvn spring-boot:run
🔹 Frontend (React)
cd demo-frontend
npm install
npm run dev
🔐 Environment Variables

⚠️ Do NOT expose sensitive data.

Example:

spring.datasource.password=${DB_PASSWORD}
spring.mail.password=${MAIL_PASSWORD}
📌 Future Enhancements
🤖 AI recommendation engine
💳 Payment gateway integration
🔔 Notifications system
📊 Health data analytics