const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDef = protoLoader.loadSync("chatp2p.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const groupChat = grpcObject.groupChat;