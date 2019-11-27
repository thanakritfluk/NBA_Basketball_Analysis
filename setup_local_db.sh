#!/usr/bin/env bash
psql -f ./javascripts/db/setup_user.sql
psql -Upostgres postgres -tc "SELECT 1 FROM pg_database WHERE datname='nba'" | grep -q 1 || createdb nba --owner=nba --username=nba
psql -Upostgres nba < ./javascripts/db/setup_table.sql