import http, { IncomingMessage, Server, ServerResponse } from "http";
import fs from "fs";
import data from "./data/database.json";
/*
implement your server code here

**********************************************
bugs to fix

the create and update date
**********************************************
*/

interface Person {
  id?: number;
  organization: string;
  products: string[];
  marketValue: string;
  address: string;
  ceo: string;
  country: string;
  noOfEmployees: number;
  employees: string[];
  createdAt?: string;
  updatedAt?: Date;
}

let profilesBuffer = fs.readFileSync(`${__dirname}/data/database.json`);

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "GET") {
      // console.log(data);
      if (req.url === "/") {
        getProfiles(req, res);
      } else {
        if (req.url) {
          const theId: string = req.url.split("/")[1];
          const id: number = parseInt(theId);
          if (req.url.match(/\/([0-9]+)/)) {
            getProfile(req, res, id);
          }
        }
      }
    } else if (req.method === "POST") {
      createProfile(req, res);
    } else if (req.method === "PUT") {
      if (req.url) {
        const theId: string = req.url.split("/")[1];
        const id: number = parseInt(theId);
        if (req.url.match(/\/([0-9]+)/)) {
          updateProfile(req, res, id);
        }
      }
    } else if (req.method === "DELETE") {
      if (req.url) {
        const theId: string = req.url.split("/")[1];
        const id: number = parseInt(theId);
        if (req.url.match(/\/([0-9]+)/)) {
          removeProfile(req, res, id);
        }
      }
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "profiles not found" }));
    }
  }
);

// these are the models function
// they would be used to perform the CRUD operations

function findAll() {
  let profilesResolved = JSON.parse(JSON.stringify(profilesBuffer.toString()));
  return new Promise((resolve, reject) => {
    resolve(profilesResolved);
  });
}

function findProfileById(id: number) {
  let profilesResolved = JSON.parse(profilesBuffer.toString());
  const profile = profilesResolved.find((item: Person) => item.id === id);
  return new Promise((resolve, reject) => {
    resolve(profile);
  });
}

function create(profile: Person) {
  return new Promise((resolve, reject) => {
    let createDate: Date = new Date(Date.now());
    let strDate: string = `${createDate}`;
    let addId: number = 1;
    let elementId = data[data.length - 1].id;
    addId += elementId;
    const newProfile = { createdAt: strDate, id: addId, ...profile };
    data.push(newProfile);
    writeDataToFile(`${__dirname}/data/database.json`, data);
    resolve(newProfile);
  });
}

function update(id: number, profile: Person) {
  return new Promise((resolve, reject) => {
    const index = data.findIndex((item) => item.id === id);
    console.log(index, "index");
    console.log(profile, "profile");

    let updateDate: Date = new Date(Date.now());
    let strDate: string = `${updateDate}`;

    data[index] = { updatedAt: strDate, ...data[index], ...profile };

    writeDataToFile(`${__dirname}/data/database.json`, data);
    resolve(data);
  });
}
function remove(id: number) {
  return new Promise<void>((resolve, reject) => {
    let profilesResolved = JSON.parse(
      JSON.stringify(profilesBuffer.toString())
    );
    profilesResolved = data.filter((item: Person) => item.id !== id);

    writeDataToFile(`${__dirname}/data/database.json`, profilesResolved);
    resolve();
  });
}

// these are the controllers function
// this function gets all the products
async function getProfiles(req: IncomingMessage, res: ServerResponse) {
  try {
    const profiles = await findAll();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(profiles);
  } catch (error) {
    console.log(error);
  }
}

// this function gets a single product
async function getProfile(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const profile = await findProfileById(id);
    if (!profile) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "profile not found" }));
    } else {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(profile));
    }
  } catch (error) {
    console.log(error);
  }
}
async function removeProfile(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const profile = await findProfileById(id);
    if (!profile) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "profile not found" }));
    } else {
      await remove(id);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: `you don delete profile ${id} ` }));
    }
  } catch (error) {
    console.log(error);
  }
}

// this function creates a profile
async function createProfile(req: IncomingMessage, res: ServerResponse) {
  try {
    let body = await getPostedData(req);

    if (typeof body === "string") {
      const {
        id,
        organization,
        products,
        marketValue,
        address,
        ceo,
        country,
        noOfEmployees,
        employees,
      } = JSON.parse(body);
      const profile: Person = {
        organization,
        // createdAt: "2020-08-12T19:04:55.455Z",
        // updatedAt: new Date(),
        products,
        marketValue,
        address,
        ceo,
        country,
        // id: 1,
        noOfEmployees,
        employees,
      };

      const newProfile = await create(profile);

      res.writeHead(201, { "content-type": "application/json" });
      res.end(JSON.stringify(profile));
    }
  } catch (error) {
    console.log(error);
  }
}

async function updateProfile(
  req: IncomingMessage,
  res: ServerResponse,
  id: number
) {
  try {
    const profilo = await findProfileById(id);

    if (!profilo) {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: "profile not found" }));
    } else {
      let body = await getPostedData(req);

      if (typeof body === "string") {
        const profileData: Person = JSON.parse(body);
        const updProfile = await update(id, profileData);
        console.log(id, "passed id");
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(updProfile));
      }
    }
  } catch (error) {
    console.log(error);
  }
}

// utilities writing and reading files into the json file
function writeDataToFile(filename: string, content: Person[]) {
  fs.writeFileSync(filename, JSON.stringify(content, null, 2));
}

function getPostedData(req: IncomingMessage) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

server.listen(3005),
  function () {
    console.log("server don dey work");
  };
