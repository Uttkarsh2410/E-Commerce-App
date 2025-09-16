# E-Commerce Application

A full-stack e-commerce application built with Spring Boot (Backend) and React (Frontend). This application provides a complete online shopping experience with user authentication, product management, shopping cart, and order processing.

## 🚀 Features

### User Features
- **User Registration & Authentication**: Secure user registration and login with JWT tokens
- **Product Browsing**: Browse products with search, filtering, and categorization
- **Shopping Cart**: Add/remove products, update quantities, and manage cart items
- **Order Management**: Place orders, track order status, and view order history
- **Responsive Design**: Modern, mobile-friendly UI built with React Bootstrap

### Admin Features
- **Product Management**: Add, edit, and delete products
- **Order Management**: View all orders and update order status
- **User Management**: View and manage user accounts
- **Admin Dashboard**: Comprehensive admin panel for store management

### Technical Features
- **RESTful API**: Well-structured REST endpoints for all operations
- **JWT Authentication**: Secure token-based authentication
- **Database Integration**: H2 in-memory database with JPA/Hibernate
- **CORS Support**: Cross-origin resource sharing for frontend-backend communication
- **Input Validation**: Server-side validation for all user inputs
- **Error Handling**: Comprehensive error handling and user feedback

## 🛠️ Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.0**
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **H2 Database** - In-memory database for development
- **JWT (JSON Web Tokens)** - Authentication tokens
- **Maven** - Dependency management

### Frontend
- **React 18.2.0**
- **React Router DOM** - Client-side routing
- **React Bootstrap** - UI components and styling
- **Axios** - HTTP client for API calls
- **React Toastify** - User notifications
- **Context API** - State management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Java 17** or higher
- **Node.js 18.17.0** or higher
- **npm 9.6.7** or higher
- **Maven 3.6+** (optional, as the project includes Maven wrapper)

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ecommerce-app
```

### 2. Prerequisites
- **Java 17+** (already installed on your system)
- **Node.js 18+** (for frontend development)
- **npm** (comes with Node.js)

### 3. Quick Start (Easiest Method)

#### Option 1: Using the Startup Scripts (Recommended)
**Windows Batch File:**
```cmd
start-app.bat
```

**PowerShell Script:**
```powershell
powershell -ExecutionPolicy Bypass -File start-app.ps1
```

This will automatically:
- Set up the Java environment
- Start the Spring Boot backend
- Start the React frontend
- Open both in separate command windows

#### Option 2: Manual Setup

**Set Java Environment (Required):**
```cmd
set JAVA_HOME=C:\Program Files\Java\jdk-24
set PATH=%JAVA_HOME%\bin;%PATH%
```

**Backend Setup:**
```cmd
.\mvnw.cmd spring-boot:run
```

**Frontend Setup (in a new terminal):**
```cmd
cd frontend
npm install
npm start
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api/
- **Database Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:testdb`
  - Username: `sa`
  - Password: `password`

## 🔐 Default Accounts

The application comes with pre-configured demo accounts:

### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Access**: Full admin privileges

### User Account
- **Username**: `user`
- **Password**: `user123`
- **Access**: Standard user privileges

## 📊 Database

The application uses H2 in-memory database for development. You can access the H2 console at:
- **URL**: `http://localhost:8080/h2-console`
- **JDBC URL**: `jdbc:h2:mem:testdb`
- **Username**: `sa`
- **Password**: `password`

## 🏗️ Project Structure

```
ecommerce-app/
├── src/main/java/com/ecommerce/
│   ├── entity/           # JPA entities (User, Product, Order, etc.)
│   ├── repository/       # Data access layer
│   ├── service/          # Business logic layer
│   ├── controller/       # REST controllers
│   ├── security/         # Security configuration and JWT
│   └── config/           # Application configuration
├── src/main/resources/
│   └── application.yml   # Application configuration
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable React components
│   │   ├── pages/        # Page components
│   │   ├── contexts/     # React context providers
│   │   └── App.js        # Main React application
│   └── package.json      # Frontend dependencies
└── pom.xml               # Maven configuration
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?keyword={keyword}` - Search products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/{id}` - Update product (Admin only)
- `DELETE /api/products/{id}` - Delete product (Admin only)

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove/{productId}` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `POST /api/orders/create` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/{id}` - Get order by ID
- `PUT /api/orders/{id}/cancel` - Cancel order

### Admin
- `GET /api/admin/orders` - Get all orders (Admin only)
- `PUT /api/admin/orders/{id}/status` - Update order status (Admin only)
- `GET /api/admin/users` - Get all users (Admin only)
- `DELETE /api/admin/users/{id}` - Delete user (Admin only)

## 🎨 Frontend Pages

- **Home** (`/`) - Landing page with featured products
- **Products** (`/products`) - Product catalog with search and filters
- **Product Detail** (`/products/:id`) - Individual product details
- **Cart** (`/cart`) - Shopping cart management
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration
- **Orders** (`/orders`) - User order history
- **Admin** (`/admin`) - Admin dashboard (Admin only)

## 🔧 Configuration

### Backend Configuration (`application.yml`)
```yaml
server:
  port: 8080

spring:
  datasource:
    url: jdbc:h2:mem:testdb
    username: sa
    password: password
  
  jpa:
    hibernate:
      ddl-auto: create-drop
    show-sql: true

jwt:
  secret: mySecretKey
  expiration: 86400000 # 24 hours
```

### Frontend Configuration
The frontend is configured to proxy API requests to the backend server running on port 8080.

## 🚀 Deployment

### Production Build
1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Build and run the backend:
```bash
mvn clean package
java -jar target/ecommerce-app-1.0.0.jar
```

### Environment Variables
For production deployment, consider setting these environment variables:
- `SPRING_PROFILES_ACTIVE=prod`
- `DATABASE_URL` (for production database)
- `JWT_SECRET` (for secure JWT signing)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🎯 Future Enhancements

- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced search with filters
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced security features

---

**Happy Shopping! 🛒**
