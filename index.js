const connection = require("./db");
const inquirer = require("inquirer");

init();

async function init() {
  const { addOrDelete} = await inquirer.prompt({
    name: "addEmployee",
    type: "list",
    message: "Would you like to [ADD] or [DELETE] an employee?",
    choices: ["ADD", "DELETE", "EXIT"],
  });

  switch (addOrDelete) {
    case "ADD":
      // Post an item
      addEmployee();
      break;
    case "DELETE":
        deleteEmployee();
        break;
        default:
            process.exit(0);  
  }};
      async function addEmployee() {
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
        ]);
      
// insert the item into our database
        const data = await connection.query("INSERT INTO employees SET ?", {
            first_name: first_name, 
            last_name: last_name,
        });
        console.log(data + "Insertred Successfully");    

        const deleteEmployee = () => {
            console.log("Employee being deleted");
            connection.query(
              'DELETE FROM employees WHERE ?',
              {
                first_name: "first_name",
                last_name: "last_name",
              },
              (error, response) => {
                if (error) throw error;
                console.log(`${res.data} products deleted!\n`);
                deleteEmployee();
              }
            );
          };



        }
