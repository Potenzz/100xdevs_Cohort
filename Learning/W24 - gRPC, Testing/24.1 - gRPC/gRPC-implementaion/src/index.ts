import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./generated/a";
import { PersonServiceHandlers } from "./generated/PersonService";

const packageDefinition = protoLoader.loadSync(
  path.join(__dirname, "../src/a.proto")
);

const personProto = (grpc.loadPackageDefinition(packageDefinition) as unknown) as ProtoGrpcType ;


const PERSONS = [
  {
    name: "Vishnu",
    age: 45,
  }
];

const handlers: PersonServiceHandlers = {
    AddPerson(call, callback){
        console.log(call);
        let person = {
            name: call.request.name,
            age: call.request.age,
        };
        PERSONS.push(person);
        callback(null, person);
    },

    GetPersonByName(call, callback){
        const name = call.request.name;
        const person = PERSONS.find(x => x.name === name);
    
        if (!person) {
            return callback({
              code: grpc.status.NOT_FOUND,
              message: `Person with name "${name}" not found.`,
            });
          }
    
        callback(null, person)
    }
}


const server = new grpc.Server();

server.addService(
    personProto.PersonService.service, handlers);

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("gRPC server running on port 50051");
  }
);
