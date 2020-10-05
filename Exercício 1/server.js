const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("calculator.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const calculator = grpcObject.calculator;

const server = new grpc.Server();
server.bind("localhost:7474", grpc.ServerCredentials.createInsecure());

server.addService(calculator.Calculator.service, {
  makeOperation: makeOperation,
});
server.start();

function makeOperation(call, callback) {
  let { num1, num2, operation } = call.request;
  switch (operation) {
    case 0:
      callback(null, { response: num1 + num2 });
      break;
    case 1:
      callback(null, { response: num1 - num2 });
      break;
    case 2:
      callback(null, { response: num1 * num2 });
      break;
    case 3:
      callback(null, { response: num1 / num2 });
      break;
    default:
      callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: "Invalid operation",
      });
  }
}
