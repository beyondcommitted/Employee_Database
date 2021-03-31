const connection = require("./db");
const inquirer = require("inquirer");

init();

async function init() {
  const addOrDelete  = await inquirer.prompt({
    name: "addEmployee",
    type: "list",
    message: "Would you like to [ADD] or [DELETE] an employee?",
    choices: ["ADD", "DELETE", "VIEW", "EXIT"],
  });

  switch (addOrDelete.addEmployee) {
    case "ADD":
      // Post an item
      addEmployee();
      break;
    case "DELETE":
      deleteEmployee();
      break;
    case "VIEW":
      viewEmployees();
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
    //   validate(last_name) {
    //     if (last_name === "undefined") {
    //       return false;
    //     } else {
    //     return "Please insert a last name";
    // }
      },
    
])

  // insert the item into our database
  const data = await connection.query("INSERT INTO employees SET ?", {
    first_name: first_name,
    last_name: last_name,
  });
  console.log(data + "Insertred Successfully");
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
        ...response.map(employee => ({value: employee.id, name: employee.first_name + ' ' + employee.last_name}))
    ]
 inquirer.prompt([{
     type: "list",
     message: " Which employee would you like to remove?",
     name: "delete",
     choices: selectEmployee,
 }])
 .then(answers => {
     connection.query(
    "DELETE FROM employees WHERE id =" + answers.delete,
    (error, response) => {
      if (error) throw error;
      console.log(`${response.data} products deleted!\n`);
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
