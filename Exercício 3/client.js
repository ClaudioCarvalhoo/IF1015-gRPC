const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("groupChat.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const groupChat = grpcObject.groupChat;
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client = new groupChat.GroupChat(
  "localhost:7474",
  grpc.credentials.createInsecure()
);
rl.question("Choose your name\n", function (name) {
  const call = client.login({ name });
  call.on("data", (item) => {
    console.log(`${item.name}: ${item.message}`);
  });

  console.log("Now send your messages, or send LOGOUT to end.");
  rl.addListener("line", (line) => {
    if (line !== "LOGOUT") {
      client.sendMessage({ message: line }, (err, response) => {});
    } else {
      client.logout({}, (err, response) => {});
      rl.close()
    }
  });
});
