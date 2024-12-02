# Blog Website
A full-stack blog website that allows users to create, edit, delete, and view blog posts. The project is divided into two parts: the client (frontend) and the API (backend).

## Features
- User authentication (login/logout)
- Create, edit, and delete blogs
- Store images locally on the server (since I don't have a cloud storage)

## Tech Stack

### Backend (API)

- **Database**: PostgreSQL
- **Packages/Tools**:
  - `bcrypt`
  - `multer` 

### Frontend (Client)

- **Framework**: React
- **Build Tool**: Vite
- **Packages/Tools**:
  - `axios`
  - `moment` 
  - `react-router` 

## Setup Instructions

### Prerequisites

- Node.js installed
- PostgreSQL database set up

## Installation

1. Clone the repository:
```
git clone https://github.com/FroreVale/Blog-Website.git
```

### For Backend (API)

1. Navigate to the API folder:
```
cd api
```
2. Install dependencies:
```
npm install
```
3. Set up a .env file in the API folder with the following variables:
```
DB_HOST=<your_database_host>
DB_USER=<your_database_user>
DB_PASSWORD=<your_database_password>
DB_DATABASE=<your_database_name>
DB_PORT=<your_port>
```
4. Start the server:
```
npm start
```

### For Frontend (Client)

1. Navigate to the Client folder:
```
cd client
```
2. Install dependencies:
```
npm install
```
3. Start the development server:
```
npm run dev
```
## Thank You for seeing! Have a nice day!
