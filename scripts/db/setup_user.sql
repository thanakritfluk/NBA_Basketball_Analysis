DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT                       
      FROM   pg_catalog.pg_roles
      WHERE  rolname = 'nba') THEN
      CREATE ROLE nba LOGIN PASSWORD 'nba';
      ALTER ROLE nba SUPERUSER CREATEDB;
   END IF;
END
$do$;