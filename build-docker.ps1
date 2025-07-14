# Build and Dockerize Next.js app (Windows PowerShell version)

# Set image name
$imageName = "payroll-app:latest"

# Build the Next.js app (using yarn)
# yarn install
# yarn build

# Build the Docker image
docker build -t $imageName .

Write-Host "Docker image '$imageName' built successfully." 