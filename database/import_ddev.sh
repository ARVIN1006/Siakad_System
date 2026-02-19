#!/bin/bash

# ============================================
# SIAKAD Database Import untuk DDEV
# ============================================

echo "============================================"
echo "SIAKAD Database Import (DDEV)"
echo "============================================"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Check if DDEV is running
if ! ddev describe > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  DDEV is not running${NC}"
    echo "Starting DDEV..."
    ddev start
    sleep 5
fi

echo -e "${GREEN}✅ DDEV is running${NC}"
echo ""

# Drop and recreate database
echo "Preparing database..."
ddev mysql -e "DROP DATABASE IF EXISTS db;"
ddev mysql -e "CREATE DATABASE db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

echo -e "${GREEN}✅ Database recreated${NC}"
echo ""

# Import schema
echo "Importing database schema..."
ddev mysql db < database/siakad_complete.sql

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database imported successfully!${NC}"
else
    echo -e "${RED}❌ Import failed${NC}"
    exit 1
fi

echo ""

# Verify
echo "Verifying database..."
TABLE_COUNT=$(ddev mysql -e "USE db; SHOW TABLES;" | wc -l)
TABLE_COUNT=$((TABLE_COUNT - 1))

echo -e "${GREEN}✅ Found ${TABLE_COUNT} tables${NC}"
echo ""

# List tables
echo "Tables in database:"
ddev mysql -e "USE db; SHOW TABLES;"

echo ""
echo "============================================"
echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo "============================================"
echo ""
echo "Database Information:"
echo "  Host: db (DDEV internal)"
echo "  Port: 3306"
echo "  Database: db"
echo "  Username: db"
echo "  Password: db"
echo ""
echo "Next steps:"
echo "  1. Test Laravel: ddev exec php artisan migrate:status"
echo "  2. Run seeders: ddev exec php artisan db:seed"
echo "  3. Access app: https://siakadproject.ddev.site"
echo ""
