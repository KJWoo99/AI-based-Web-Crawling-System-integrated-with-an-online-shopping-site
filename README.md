# Online Shopping Platform

This project is a full-stack online shopping platform, including both backend and frontend components. Users can search for products, manage their shopping cart, and process payments, while administrators can manage products and users.

## Directory Structure

### Backend (`/backend`)

- **Environment Configuration**: `.env`
- **Package Management**: `package.json`, `package-lock.json`
- **Source Code**: `src/index.js`
- **Middleware**: `auth.js`
- **Models**: `Payment.js`, `Product.js`, `User.js`
- **Routes**: `products.js`, `users.js`
- **Uploads**: Directory for storing product images

### Frontend (`/frontend`)

- **Configuration**: `.env`
- **Components**: Reusable UI components
- **Pages**: `CartPage`, `DetailProductPage`, `HistoryPage`, `LandingPage`, `LoginPage`, `RegisterPage`, `QnAPage`, `ReviewPage`
- **Store**: Redux-related files
- **Layout**: `Footer`, `Navbar`
- **Utilities**: Axios configuration and utility functions

### Admin Frontend (`/frontend_admin`)

- **Configuration**: `.env`
- **Components**: UI components for administrators
- **Pages**: `UploadProductPage`, `DetailProductPage`, `HistoryPage`, `LandingPage`, `RegisterPage`
- **Store**: Redux-related files

## Setup Instructions

### Backend

1. Navigate to the `backend` directory.
2. Run `npm install`.
3. Configure the `.env` file based on `.env.example`.
4. Start the server with `npm start`.

### Frontend

1. Navigate to the `frontend` directory.
2. Run `npm install`.
3. Configure the `.env` file based on `.env.example`.
4. Start the development server with `npm start`.

### Admin Frontend

1. Navigate to the `frontend_admin` directory.
2. Run `npm install`.
3. Configure the `.env` file based on `.env.example`.
4. Start the development server with `npm start`.

## Key Features

- **User Authentication**: Secure login and registration using JWT
- **Product Management**: Search, filter, and manage products
- **Shopping Cart**: Add and manage products in the cart
- **Order History**: View previous orders
- **Admin Features**: Admin-only pages for managing products and users

## Technology Stack

- **Backend**: Node.js, Express.js, MongoDB
- **Frontend**: React, Redux
- **Authentication**: JWT
- **Other**: Axios, Mongoose

---

# Naver Shopping Product Scraper and AI Description Generator

This Python script searches for products on Naver Shopping, scrapes product information, and generates product descriptions using AI.

## Key Features

1. Search for products on Naver Shopping using user-input keywords
2. Extract product information (title, price, details) from search results
3. Translate Korean text to English
4. Download product images
5. Generate product descriptions using OpenAI GPT-3.5
6. Save generated descriptions to text files

## Libraries Used

- `BeautifulSoup`: HTML parsing
- `requests`: Handling web requests
- `openai`: OpenAI GPT-3.5 API
- `googletrans`: Korean-to-English translation

## Installation

1. Install required libraries:
    ```bash
    pip install beautifulsoup4 requests openai googletrans
    ```
2. Enter your OpenAI API key in the script at `openai.api_key = "YOUR OPENAI API KEY"`

## Usage

1. Run the script.
2. Enter the product name you want to search for (Korean recommended).
3. The script will automatically search for product information and generate AI descriptions.
4. The generated information will be saved as images and text files at the specified path.

## Key Function Descriptions

- `translate_korean_to_english()`: Translates Korean text to English
- Web Scraping: Extracts product information from Naver Shopping
- Image Download: Saves product images locally
- AI Description Generation: Generates product descriptions using OpenAI GPT-3.5
