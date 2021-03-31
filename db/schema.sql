CREATE DATABASE employeeDB;

USE employeeDB;

CREATE TABLE employees(
  id  INT NOT NULL AUTO_INCREMENT,
 first_name VARCHAR(255) NOT NULL,
 last_name VARCHAR(255) NOT NULL,
 role_id INTEGER NOT NULL,
 manager_id INTEGER NULL,
 primary key(id)
);
CREATE TABLE emp_role(
  id  INT NOT NULL AUTO_INCREMENT,
 title VARCHAR(255) NOT NULL,
 salary VARCHAR(255) NOT NULL,
 department_id INTEGER NOT NULL
 primary key(id)
);
CREATE TABLE department(
  id  INT NOT NULL AUTO_INCREMENT,
 dept_name VARCHAR(255) NOT NULL,
 primary key(id)
);

