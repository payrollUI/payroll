# Build and Dockerize Next.js Payroll Management System (Windows PowerShell)

# Set image name
$imageName = "payroll-app:latest"

Write-Host "🚀 Building Payroll Management System Docker Image..." -ForegroundColor Green

# Install dependencies and build the Next.js app
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host "🔨 Building the application..." -ForegroundColor Yellow
npm run build

# Build the Docker image
Write-Host "🐳 Building Docker image..." -ForegroundColor Yellow
docker build -t $imageName .

Write-Host "✅ Docker image '$imageName' built successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "To run the container:" -ForegroundColor Cyan
Write-Host "  docker run -p 3000:3000 $imageName" -ForegroundColor White
Write-Host ""
Write-Host "Or use Docker Compose:" -ForegroundColor Cyan
Write-Host "  docker-compose up -d" -ForegroundColor White 