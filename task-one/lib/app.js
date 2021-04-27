"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const fs_1 = __importDefault(require("fs"));
const database_json_1 = __importDefault(require("./data/database.json"));
let profilesBuffer = fs_1.default.readFileSync(`${__dirname}/data/database.json`);
const server = http_1.default.createServer((req, res) => {
    if (req.method === "GET") {
        // console.log(data);
        if (req.url === "/") {
            getProfiles(req, res);
        }
        else {
            if (req.url) {
                const theId = req.url.split("/")[1];
                const id = parseInt(theId);
                if (req.url.match(/\/([0-9]+)/)) {
                    getProfile(req, res, id);
                }
            }
        }
    }
    else if (req.method === "POST") {
        createProfile(req, res);
    }
    else if (req.method === "PUT") {
        if (req.url) {
            const theId = req.url.split("/")[1];
            const id = parseInt(theId);
            if (req.url.match(/\/([0-9]+)/)) {
                updateProfile(req, res, id);
            }
        }
    }
    else if (req.method === "DELETE") {
        if (req.url) {
            const theId = req.url.split("/")[1];
            const id = parseInt(theId);
            if (req.url.match(/\/([0-9]+)/)) {
                removeProfile(req, res, id);
            }
        }
    }
    else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "profiles not found" }));
    }
});
// these are the models function
// they would be used to perform the CRUD operations
function findAll() {
    let profilesResolved = JSON.parse(JSON.stringify(profilesBuffer.toString()));
    return new Promise((resolve, reject) => {
        resolve(profilesResolved);
    });
}
function findProfileById(id) {
    let profilesResolved = JSON.parse(profilesBuffer.toString());
    const profile = profilesResolved.find((item) => item.id === id);
    return new Promise((resolve, reject) => {
        resolve(profile);
    });
}
function create(profile) {
    return new Promise((resolve, reject) => {
        let createDate = new Date(Date.now());
        let strDate = `${createDate}`;
        let addId = 1;
        let elementId = database_json_1.default[database_json_1.default.length - 1].id;
        addId += elementId;
        const newProfile = { createdAt: strDate, id: addId, ...profile };
        database_json_1.default.push(newProfile);
        writeDataToFile(`${__dirname}/data/database.json`, database_json_1.default);
        resolve(newProfile);
    });
}
function update(id, profile) {
    return new Promise((resolve, reject) => {
        const index = database_json_1.default.findIndex((item) => item.id === id);
        console.log(index, "index");
        console.log(profile, "profile");
        let updateDate = new Date(Date.now());
        let strDate = `${updateDate}`;
        database_json_1.default[index] = { updatedAt: strDate, ...database_json_1.default[index], ...profile };
        writeDataToFile(`${__dirname}/data/database.json`, database_json_1.default);
        resolve(database_json_1.default);
    });
}
function remove(id) {
    return new Promise((resolve, reject) => {
        let profilesResolved = JSON.parse(JSON.stringify(profilesBuffer.toString()));
        profilesResolved = database_json_1.default.filter((item) => item.id !== id);
        writeDataToFile(`${__dirname}/data/database.json`, profilesResolved);
        resolve();
    });
}
// these are the controllers function
// this function gets all the products
async function getProfiles(req, res) {
    try {
        const profiles = await findAll();
        res.writeHead(200, { "content-type": "application/json" });
        res.end(profiles);
    }
    catch (error) {
        console.log(error);
    }
}
// this function gets a single product
async function getProfile(req, res, id) {
    try {
        const profile = await findProfileById(id);
        if (!profile) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "profile not found" }));
        }
        else {
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify(profile));
        }
    }
    catch (error) {
        console.log(error);
    }
}
async function removeProfile(req, res, id) {
    try {
        const profile = await findProfileById(id);
        if (!profile) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "profile not found" }));
        }
        else {
            await remove(id);
            res.writeHead(200, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: `you don delete profile ${id} ` }));
        }
    }
    catch (error) {
        console.log(error);
    }
}
// this function creates a profile
async function createProfile(req, res) {
    try {
        let body = await getPostedData(req);
        if (typeof body === "string") {
            const { id, organization, products, marketValue, address, ceo, country, noOfEmployees, employees, } = JSON.parse(body);
            const profile = {
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
    }
    catch (error) {
        console.log(error);
    }
}
async function updateProfile(req, res, id) {
    try {
        const profilo = await findProfileById(id);
        if (!profilo) {
            res.writeHead(404, { "content-type": "application/json" });
            res.end(JSON.stringify({ message: "profile not found" }));
        }
        else {
            let body = await getPostedData(req);
            if (typeof body === "string") {
                const profileData = JSON.parse(body);
                const updProfile = await update(id, profileData);
                console.log(id, "passed id");
                res.writeHead(200, { "content-type": "application/json" });
                res.end(JSON.stringify(updProfile));
            }
        }
    }
    catch (error) {
        console.log(error);
    }
}
// utilities writing and reading files into the json file
function writeDataToFile(filename, content) {
    fs_1.default.writeFileSync(filename, JSON.stringify(content, null, 2));
}
function getPostedData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
server.listen(3005),
    function () {
        console.log("server don dey work");
    };
