const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculator = grpcObject.calculator;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new calculator.Calculator(
  "localhost:7474",
  grpc.credentials.createInsecure()
);

rl.question("Choose the first number.\n", function (num1) {
  rl.question("Choose the second number.\n", function (num2) {
    rl.question("Choose the operation. (SUM, SUB, MULT or DIV)\n", function (
      op
    ) {
      num1 = parseInt(num1);
      num2 = parseInt(num2);
      switch (op) {
        case "SUM":
          makeOperation({ num1, num2, operation: 0 });
          break;
        case "SUB":
          makeOperation({ num1, num2, operation: 1 });
          break;
        case "MULT":
          makeOperation({ num1, num2, operation: 2 });
          break;
        case "DIV":
          makeOperation({ num1, num2, operation: 3 });
          break;
        default:
          console.log("error");
      }
      rl.close()
    });
  });
});

function makeOperation(request) {
  client.makeOperation(request, (err, response) => {
    if (err) {
      console.log(err);
    } else {
      console.log(response.response);
    }
  });
}
