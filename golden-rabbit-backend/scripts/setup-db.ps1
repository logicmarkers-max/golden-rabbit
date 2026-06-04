# Check if PostgreSQL is installed and create database
$ErrorActionPreference = "Stop"

function Test-PostgreSQL {
    try {
        # Check if psql is in PATH
        $psqlVersion = & psql --version
        Write-Host "PostgreSQL found: $psqlVersion"
        return $true
    } catch {
        Write-Host "PostgreSQL not found. Please install PostgreSQL:"
        Write-Host "1. Download from: https://www.postgresql.org/download/windows/"
        Write-Host "2. Run installer and:"
        Write-Host "   - Remember the password you set for 'postgres' user"
        Write-Host "   - Keep default port (5432)"
        Write-Host "   - Add PostgreSQL bin directory to PATH during install"
        Write-Host "3. After install, open a new PowerShell window and run this script again"
        return $false
    }
}

function Create-Database {
    try {
        # Create user and database
        Write-Host "Creating database and user..."
        
        # Check if database exists
        $dbExists = & psql -U postgres -tAc "SELECT 1 FROM pg_database WHERE datname='golden_rabbit_db'"
        if ($dbExists) {
            Write-Host "Database 'golden_rabbit_db' already exists"
        } else {
            & psql -U postgres -c "CREATE DATABASE golden_rabbit_db"
            Write-Host "Created database 'golden_rabbit_db'"
        }

        # Update .env with connection string
        $envPath = Join-Path $PSScriptRoot "../.env"
        $envContent = "PORT=4000`nDATABASE_URL=postgresql://postgres:admin123@localhost:5432/golden_rabbit_db`nJWT_SECRET=dev_only_change_in_production_7x!9"
        Set-Content -Path $envPath -Value $envContent
        Write-Host "Updated .env with connection string"
        
        Write-Host "`nSetup complete! You can now run:"
        Write-Host "npm run migrate"
    } catch {
        Write-Host "Error setting up database: $_"
        Write-Host "If this is a permission error, make sure you remember the password for 'postgres' user"
        exit 1
    }
}

if (Test-PostgreSQL) {
    Create-Database
}