const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the excellent ${chalk.red("generator-projects")} generator!`
      )
    );

    const prompts = [
      {
        type: "confirm",
        name: "mongodb",
        message: "Use mongodb?",
        default: false
      }
      // {
      //   type: "input",
      //   name: "projectName",
      //   message: "project name",
      //   default: "my-awesome-project"
      // }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(this.templatePath("src"), this.destinationPath("src"), {
      useMongodb: this.props.mongodb
    });
    [".gitignore", "package.json", "tsconfig.json"].forEach(f => {
      this.fs.copy(this.templatePath(f), this.destinationPath(f));
    });
    if (this.props.mongodb) {
      this.fs.extendJSON(this.destinationPath("package.json"), {
        dependencies: { mongoose: "^5.10.8" },
        devDependencies: {
          "@types/mongoose": "^5.7.36"
        }
      });
    }
  }

  install() {
    this.installDependencies();
  }
};
