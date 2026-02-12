-- Users table for simple login demo.
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(10) NOT NULL CHECK (role IN ('STUDENT', 'FACULTY'))
);

-- Seed records (id auto-generated). Adjust passwords as needed.
INSERT INTO users (email, password, role) VALUES
  ('teststudent.23cse@kongu.edu', 'studentpass', 'STUDENT'),
  ('testfaculty.ai@kongu.edu', 'facultypass', 'FACULTY')
ON CONFLICT (email) DO NOTHING;
