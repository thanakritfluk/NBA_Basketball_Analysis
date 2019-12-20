#!/usr/bin/env bash
npm install

psql -U postgres -f ./scripts/db/setup_user.sql
psql -U postgres -f ./scripts/db/create_db.sql
psql -U postgres nba < ./scripts/db/setup_table.sql
node scraper_api.js