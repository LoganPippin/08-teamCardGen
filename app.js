const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];
askInfo();

function askInfo() {
  inquirer
    .prompt([
      {
        type: "checkbox",
        name: "role",
        message: "What type of Employee are you?",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        name: "name",
        message: "What is you name?",
      },
      {
        type: "input",
        name: "email",
        message: "What is you Email Address?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your Employee id?",
      },
    ])
    .then((res) => {
      if (res.role == "Manager") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "officeNumber",
              message: "What is your office Number?",
            },
          ])
          .then((res2) => {
            let user = new Manager(
              res.name,
              res.email,
              res.id,
              res2.officeNumber
            );
            employees.push(user);
            contAdd();
          });
      }
      if (res.role == "Engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "gitHub",
              message: "What is your gitHub URL?",
            },
          ])
          .then((res2) => {
            let user = new Engineer(res.name, res.email, res.id, res2.gitHub);
            employees.push(user);
            contAdd();
          });
      }
      if (res.role == "Intern") {
        inquirer
          .prompt([
            {
              type: "input",
              name: "school",
              message: "What is your school?",
            },
          ])
          .then((res2) => {
            let user = new Intern(res.name, res.email, res.id, res2.school);
            employees.push(user);
            contAdd();
          });
      }
    });
}

function contAdd() {
  inquirer
    .prompt([
      {
        type: "confirm",
        name: "cont",
        message: "Would you like to add Another Employee?",
      },
    ])
    .then((res) => {
      if (res.cont) {
        askInfo();
      } else {
        const data = render(employees);
        fs.writeFile("./team.html", data, "utf8", function (err) {
          console.log(err);
        });
      }
    });
}
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
