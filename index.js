const connection = require("./db");
const inquirer = require("inquirer");

init();

async function init() {
  const manageData  = await inquirer.prompt({
    name: "selectTask",
    type: "list",
    message: "Select a task that you would like to complete.",
    choices: ["Add Employee", "Delete Employee", "View Employees", "Add Department", "Delete Department",  "View Departments", "Add Role", "Delete Role", "View Roles", "EXIT"],
  });

  switch (manageData.selectTask) {
    case "Add Employee":
      // Post an item
      addEmployee();
      break;
    case "Delete Employee":
      deleteEmployee();
      break;
    case "View Employees":
      viewEmployees();
    break;
    case "Add Department":
      addDepartment();
      break;
    case "Delete Department":
      deleteDepartment();
    break;
    case "View Departments":
      viewDepartments();
    break;
    case "Add Role":
      addRole();
    break;
    case "Delete Role":
      deleteRole();
    break;
    case "View Roles":
      viewRoles();
    break;
    default:
      process.exit(0);
  }
}


async function addEmployee() {
    try {
  const { first_name, last_name } = await inquirer.prompt([
    {
      name: "first_name",
      message: "What is the first name of the employee you would like to add?",
      type: "input",
      
    },
    {
      name: "last_name",
      message: "What is the last name of the employee you would like to add?",
      type: "input",
      },
    
])

  // insert the item into our database
  const empData = await connection.query("INSERT INTO employees SET ?", {
    first_name: first_name,
    last_name: last_name,
  });
  console.log(empData + "Inserted Successfully");
} catch (error) {
    console.log("Try again!")
}
  init();
}

const deleteEmployee = () => {
  console.log("Employee being deleted");

  connection.query("SELECT * FROM employees", (error, response) => {
    if (error) throw error;
    console.table(response)
    const selectEmployee = [
        ...response.map(employees => ({value: employees.id, name: employees.first_name + ' ' + employees.last_name}))
    ]
 inquirer.prompt([{
     type: "list",
     message: " Which employee would you like to remove?",
     name: "delete",
     choices: selectEmployee,
 }])
 .then(empAnswers => {
     connection.query(
    "DELETE FROM employees WHERE id =" + empAnswers.delete,
    (error, response) => {
      if (error) throw error;
      console.log(`${response.empData} products deleted!\n`);
      viewEmployees();
    }
  );
 })
})
  
};

const viewEmployees = () => {
    connection.query("SELECT * FROM employees", (error, response) => {
        if (error) throw error;
        console.table(response)
        connection.end();
    })
    
}

async function addDepartment() {
    try {
  const {dept_name} = await inquirer.prompt([
    {
      name: "dept_name",
      message: "What is the name of the department you would like to add?",
      type: "input",
      },   
])

  // insert the item into our database
   const deptData = await connection.query("INSERT INTO department SET ?", {
    dept_name: dept_name,
  });
  console.log(deptData + "Inserted Successfully");
} catch (error) {
    console.log("Try again!")
}
  init();
}

const deleteDepartment = () => {
  console.log("Department being deleted");

  connection.query("SELECT * FROM department", (error, response) => {
    if (error) throw error;
    console.table(response)
    const selectDepartment = [
        ...response.map(department => ({value: department.id, name: department.dept_name}))
    ]
 inquirer.prompt([{
     type: "list",
     message: " Which department would you like to remove?",
     name: "delete",
     choices: selectDepartment,
 }])
 .then(deptAnswers => {
     connection.query(
    "DELETE FROM department WHERE id =" + deptAnswers.delete,
    (error, response) => {
      if (error) throw error;
      console.log(`${response.deptData} department deleted!\n`);
      viewDepartments();
    }
  );
 })
})
  
};

const viewDepartments = () => {
    connection.query("SELECT * FROM department", (error, response) => {
        if (error) throw error;
        console.table(response)
        connection.end();
    })
    
 }
async function addRole() {
    try {
  const {title, salary} = await inquirer.prompt([
    {
      name: "title",
      message: "What is the title you would like to add?",
      type: "input",
      },   
    {
      name: "salary",
      message: "What is the salary you would like to add?",
      type: "input",
      },   
])

  // insert the item into our database
   const roleData = await connection.query("INSERT INTO emp_role SET ?", {
    title: title,
    salary: salary,
  });
  console.log(roleData + "Inserted Successfully");
} catch (error) {
    console.log("Try again!")
}
  init();
}

const deleteRole = () => {
  console.log("Role being deleted");

  connection.query("SELECT * FROM emp_role", (error, response) => {
    if (error) throw error;
    console.table(response)
    const selectRole = [
        ...response.map(emp_role => ({value: emp_role.id, name: emp_role.title + ' ' + emp_role.salary}))
    ]
 inquirer.prompt([{
     type: "list",
     message: " Which Role would you like to remove?",
     name: "delete",
     choices: selectRole,
 }])
 .then(roleAnswers => {
     connection.query(
    "DELETE FROM emp_role WHERE id =" + roleAnswers.delete,
    (error, response) => {
      if (error) throw error;
      console.log(`${response.roleData} department deleted!\n`);
      viewRoles();
    }
  );
 })
})
  
};

const viewRoles = () => {
    connection.query("SELECT * FROM emp_role", (error, response) => {
        if (error) throw error;
        console.table(response)
        connection.end();
    })
    
 }
