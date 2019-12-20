#!/usr/bin/env bash
npm install
psql -f ./scripts/db/setup_user.sql
psql -Upostgres postgres -tc "SELECT 1 FROM pg_database WHERE datname='nba'" | grep -q 1 || createdb nba --owner=nba --username=nba
psql -Upostgres nba < ./scripts/db/setup_table.sql
node scraper_api.js