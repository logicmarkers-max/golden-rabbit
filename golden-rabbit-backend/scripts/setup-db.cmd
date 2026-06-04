@echo off
REM Setup PostgreSQL database for Golden Rabbit

echo Checking for PostgreSQL installation...

REM Try common PostgreSQL installation paths
SET PGPATHS=^
C:\Program Files\PostgreSQL\16\bin;^
C:\Program Files\PostgreSQL\15\bin;^
C:\Program Files\PostgreSQL\14\bin;^
C:\Program Files\PostgreSQL\13\bin;^
C:\Program Files (x86)\PostgreSQL\16\bin;^
C:\Program Files (x86)\PostgreSQL\15\bin;^
C:\Program Files (x86)\PostgreSQL\14\bin;^
C:\Program Files (x86)\PostgreSQL\13\bin

FOR %%p IN (%PGPATHS%) DO (
    IF EXIST "%%p\psql.exe" (
        SET "PGBIN=%%p"
        GOTO :FOUND
    )
)

echo PostgreSQL not found in common locations.
echo Please ensure PostgreSQL is installed and add its bin directory to PATH.
exit /b 1

:FOUND
echo Found PostgreSQL in %PGBIN%

echo Creating database...
SET PGPASSWORD=admin123
"%PGBIN%\createdb.exe" -U postgres golden_rabbit_db
if %ERRORLEVEL% NEQ 0 (
    echo Database might already exist, continuing...
)

echo Updating .env file...
(
echo PORT=4000
echo DATABASE_URL=postgresql://postgres:admin123@localhost:5432/golden_rabbit_db
echo JWT_SECRET=dev_only_change_in_production_7x!9
) > .env

echo Setup complete! You can now run:
echo npm run migrate