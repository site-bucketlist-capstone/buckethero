\echo 'Delete and recreate rate_my_setup db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE buckethero;
CREATE DATABASE buckethero;
\connect buckethero

\i buckethero-schema.sql
\i buckethero-seed.sql

-- \echo 'Delete and recreate rate_my_setup_test db?'
-- \prompt 'Return for yes or control-C to cancel > ' answer

-- DROP DATABASE rate_my_setup_test;
-- CREATE DATABASE rate_my_setup_test;
-- \connect rate_my_setup_test

-- \i rate-my-setup-schema.sql
