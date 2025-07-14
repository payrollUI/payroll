# Payroll Management System

A comprehensive payroll management application built with Next.js 15, featuring employee management, payroll processing, approvals workflow, and comprehensive reporting capabilities.

## 🚀 Features

- **Employee Management**: Complete employee lifecycle management with detailed profiles
- **Payroll Processing**: Automated payroll runs with tax calculations and statutory deductions
- **Approval Workflow**: Multi-level approval system for payroll and leave requests
- **Document Management**: Secure document storage and tax form generation (Form 16, Form 24Q)
- **Loan Management**: Employee loan tracking and EMI calculations
- **Reports & Analytics**: Comprehensive payroll reports and analytics dashboard
- **Tax Compliance**: Automated tax calculations and compliance reporting
- **Modern UI**: Responsive design with Material-UI components
- **Authentication**: Secure login system with NextAuth.js
- **Docker Support**: Containerized deployment with health checks

## 🛠️ Technology Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **UI Components**: Material-UI (MUI), Lucide React Icons
- **Authentication**: NextAuth.js
- **Styling**: CSS Modules, Modern CSS Grid/Flexbox
- **Build Tool**: Turbopack (Next.js)
- **Containerization**: Docker & Docker Compose

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Docker** (for containerized deployment)
- **Docker Compose** (for multi-container setup)

## 🚀 Quick Start

### Option 1: Local Development (Recommended for Development)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd payroll
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create environment file (optional)
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) (or the port shown in terminal)

### Option 2: Production Build (Local)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Build the application**
   ```bash
   npm run build
   ```

3. **Start the production server**
   ```bash
   npm start
   ```

## 🐳 Docker Deployment

### Option 1: Using Docker Compose (Recommended)

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Run in background (detached mode)**
   ```bash
   docker-compose up -d --build
   ```

3. **Stop the containers**
   ```bash
   docker-compose down
   ```

### Option 2: Manual Docker Build

1. **Build the Docker image**
   ```bash
   docker build -t payroll-app:latest .
   ```

2. **Run the container**
   ```bash
   docker run -p 3000:3000 payroll-app:latest
   ```

### Option 3: Using Build Scripts

**For Linux/macOS:**
```bash
chmod +x build-docker.sh
./build-docker.sh
```

**For Windows (PowerShell):**
```powershell
.\build-docker.ps1
```

## 📁 Project Structure

```
payroll/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (dashboard)/        # Dashboard routes
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── employees/      # Employee management
│   │   │   ├── pay-runs/       # Payroll processing
│   │   │   ├── approvals/      # Approval workflows
│   │   │   ├── documents/      # Document management
│   │   │   ├── reports/        # Reports & analytics
│   │   │   ├── loans/          # Loan management
│   │   │   ├── settings/       # System settings
│   │   │   └── taxes-and-forms/ # Tax forms
│   │   ├── api/                # API routes
│   │   ├── login/              # Authentication
│   │   └── signup/             # User registration
│   ├── components/             # React components
│   │   ├── Dashboard/          # Dashboard components
│   │   ├── Auth/               # Authentication components
│   │   └── Forms/              # Form components
│   ├── data/                   # Static data and types
│   ├── lib/                    # Utility libraries
│   └── assets/                 # Static assets
├── public/                     # Public static files
├── logs/                       # Application logs
├── docker-compose.yml          # Docker Compose configuration
├── dockerfile                  # Docker build instructions
├── build-docker.sh            # Linux/macOS build script
├── build-docker.ps1           # Windows build script
└── start.sh                   # Application start script
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build the application for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint for code quality checks |

## 🌐 Application Features

### Dashboard Overview
- Real-time payroll statistics
- Setup progress tracking with interactive progress bar
- Quick action buttons for common tasks
- Recent activity summaries

### Employee Management
- Complete employee database with search and filtering
- Employee profile management
- Bulk employee operations
- Employee onboarding workflow

### Payroll Processing
- Automated payroll calculations
- Tax and statutory deduction management
- Payroll run history and tracking
- Salary component configuration

### Approval System
- Multi-level approval workflows
- Pending and reviewed approvals tracking
- Email notifications (configurable)
- Approval history and audit trails

### Document Management
- Secure document storage
- Tax form generation (Form 16, Form 24Q)
- Document categorization and search
- Bulk document operations

### Reporting & Analytics
- Comprehensive payroll reports
- Tax compliance reports
- Employee analytics
- Export capabilities (PDF, Excel)

## 🔐 Authentication

The application uses NextAuth.js for secure authentication. Configure your authentication providers in the `.env.local` file:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 is already in use**
   ```
   Solution: The app will automatically use the next available port (3001, 3002, etc.)
   ```

2. **Docker build fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker-compose build --no-cache
   ```

3. **Slow filesystem detected warning**
   ```
   Solution: Consider moving the .next folder to a local drive or exclude the project directory from antivirus scanning
   ```

4. **Module not found errors**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Development Tips

- Use `npm run dev` for development with hot reloading
- The app automatically detects and uses available ports
- Check the terminal output for the exact URL (usually http://localhost:3001)
- Use browser dev tools for debugging React components

## 🔄 Health Checks

The application includes a health check endpoint at `/api/health` for monitoring:

```bash
curl http://localhost:3000/api/health
```

Docker health checks are configured to monitor application status automatically.

## 📝 Environment Configuration

Create a `.env.local` file in the root directory for environment-specific configurations:

```env
# Application
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Database (if using)
DATABASE_URL=your-database-url

# Additional configurations
LOG_LEVEL=info
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Made with ❤️ using Next.js 15 and React 19**
