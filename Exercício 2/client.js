const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("chatp2p.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const chatp2p = grpcObject.chatp2p;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Choose the port you want to receive in\n", function (clientPort) {
  rl.question("Choose the port you want to send to\n", function (serverPort) {
    const server = new grpc.Server();
    server.bind(
      `localhost:${clientPort}`,
      grpc.ServerCredentials.createInsecure()
    );

    server.addService(chatp2p.Chatp2p.service, {
      sendMessage: receiveMessage,
    });
    server.start();

    const client = new chatp2p.Chatp2p(
      `localhost:${serverPort}`,
      grpc.credentials.createInsecure()
    );

    function receiveMessage(call, callback) {
      console.log(call.request.message);
      callback({})
    }

    rl.addListener("line", (line) => {
      client.sendMessage({ message: line }, (err, response) => {
      });
    });
  });
});
