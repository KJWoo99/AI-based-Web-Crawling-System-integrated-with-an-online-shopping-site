
# 🛍️ Online Shopping Platform

Welcome to our comprehensive Online Shopping Platform! This full-stack project offers a seamless shopping experience with a robust backend API, user-friendly frontend, and powerful admin interface.

## 🚀 Key Features

- **🔐 User Authentication**: Secure login and registration using JWT
- **🏷️ Product Management**: Intuitive search, filter, and management tools
- **🛒 Shopping Cart**: Easy-to-use cart functionality
- **📜 Order History**: Detailed view of past purchases
- **👑 Admin Dashboard**: Comprehensive product and user management

## 🏗️ Project Structure

### 🔧 Backend (`/backend`)

- **📁 Configuration**: `.env`
- **📦 Package Management**: `package.json`, `package-lock.json`
- **💻 Source Code**: `src/index.js`
- **🛡️ Middleware**: `auth.js`
- **📊 Models**: `Payment.js`, `Product.js`, `User.js`
- **🛣️ Routes**: `products.js`, `users.js`
- **🖼️ Uploads**: Product images storage

### 🖥️ Frontend (`/frontend`)

- **⚙️ Configuration**: `.env`
- **🧩 Components**: Reusable UI elements
- **📄 Pages**: 
  - `CartPage`
  - `DetailProductPage`
  - `HistoryPage`
  - `LandingPage`
  - `LoginPage`
  - `RegisterPage`
  - `QnAPage`
  - `ReviewPage`
- **🗃️ Store**: Redux setup
- **🎨 Layout**: `Footer`, `Navbar`
- **🔧 Utilities**: Axios config and helper functions

### 👑 Admin Frontend (`/frontend_admin`)

- **⚙️ Configuration**: `.env`
- **🧩 Components**: Admin-specific UI components
- **📄 Pages**: 
  - `UploadProductPage`
  - `DetailProductPage`
  - `HistoryPage`
  - `LandingPage`
  - `RegisterPage`
- **🗃️ Store**: Redux setup for admin

## 🛠️ Setup Instructions

### Backend

1. `cd backend`
2. `npm install`
3. Configure `.env` (see `.env.example`)
4. `npm start`

### Frontend

1. `cd frontend`
2. `npm install`
3. Configure `.env` (see `.env.example`)
4. `npm start`

### Admin Frontend

1. `cd frontend_admin`
2. `npm install`
3. Configure `.env` (see `.env.example`)
4. `npm start`

## 💻 Technology Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React, Redux
- **Authentication**: JWT
- **Networking**: Axios
- **Database ODM**: Mongoose

---

# 🔍 Naver Shopping Product Scraper and AI Description Generator

This Python script is designed to search for products on Naver Shopping, scrape product details, and generate descriptions using AI.


## ✨ Key Features

1. **🔎 Product Search**: Find products on Naver Shopping
2. **📊 Information Extraction**: Gather product details
3. **🌐 Translation**: Korean to English conversion
4. **🖼️ Image Download**: Save product images locally
5. **🤖 AI Description Generation**: Create descriptions with GPT-3.5
6. **💾 File Saving**: Store generated content

## 📚 Libraries Used

- `BeautifulSoup`: HTML parsing
- `requests`: Web requests
- `openai`: OpenAI GPT-3.5 API
- `googletrans`: Translation service

## 🚀 Installation

1. Install dependencies:
   ```bash
   pip install beautifulsoup4 requests openai googletrans
   ```
2. Set up your OpenAI API key:
   ```python
   openai.api_key = "YOUR_OPENAI_API_KEY"
   ```

## 🖥️ Usage

1. Run the script.
2. Enter the product name (Korean recommended).
3. The script will search for product information and generate AI descriptions.
4. Generated information will be saved as images and text files at the specified path.

## 🔧 Key Functions

- **🌐 translate_korean_to_english()**: Language conversion
- **🕷️ Web Scraping**: Extract Naver Shopping data
- **🖼️ Image Download**: Save product visuals
- **🤖 AI Description Generation**: Create compelling product descriptions


