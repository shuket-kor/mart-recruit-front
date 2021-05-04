const logger = require("../config/logger.js");
const got = require("got");

module.exports = class userService {
    // 유저 로그인
    static async login(userId, password) {
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/login";
            else apiURL = `http://localhost:3000/api/users/login`;

            const {body} = await got.post(apiURL, {
                json: {
                    userId: userId,
                    password: password,
                },
                responseType: "json",
            });

            if (body.result === "success") {
                return body;
            } else {
                logger.writeLog("error", `FRONT - services/login: ${body}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `FRONT - services/login: ${error}`);
        }
    }
    // 유저 조회
    static async list(token, secretkey) {
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users";
            else apiURL = `http://localhost:3000/api/users`;

            const {body} = await got.get(apiURL, {
                headers: {
                    contentType: "application/json",
                    "User-Agent": "DEVICE-AGENT",
                    userAgent: "DEVICE-AGENT",
                    Authorization: token,
                    secretkey : secretkey
                },
            });
            if (body.result === "success") {
                return body;
            } else {
                //실패
                logger.writeLog("error", ` FRONT - services/getUser: ${body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", ` FRONT - services/getUserService: ${error}`);
        }
    }
    // 유저 생성
    static async create(userId, password, userType, active) {
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/create";
            else apiURL = `http://localhost:3000/api/users/create`;

            const {body} = await got.post(apiURL, {
                json: {
                    userid: userId,
                    password: password,
                    usertype: userType,
                    active: active,
                },
                responseType: "json",
            });
            console.log(body)
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/create: `);
                return body.data;
            }
        } catch (error) {
            logger.writeLog("error", `services/create: ${error}`);
        }
    }
    // 유저 수정
    static async userUpdate(userId, password, userType, active, seq) {
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/update";
            else apiURL = `http://localhost:3000/api/users/update`;

            const {body} = await got.patch(apiURL, {
                json: {
                    userId: userId,
                    password: password,
                    userType: userType,
                    active: active,
                    seq: seq,
                },
                responseType: "json",
            });
            if (result === "success") {
                return data;
            } else {
                //실패
                logger.writeLog("error", `services/updateService/update: ${result}`);
                return body;
            }
        } catch (error) {
            logger.writeLog("error", `services/updateService/update: ${error}`);
        }
    }
    // 유저 삭제
    static async userDelete(seq) {
        try {
            var apiURL = "";
            if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/users/remove";
            else apiURL = `http://localhost:3000/api/users/remove`;

            const {body} = await got.patch(apiURL, {
                json: {
                    seq: seq,
                },
                responseType: "json",
            });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/removeService/delete: ${removeUser.body.result}`);
                return body;
            }
        } catch (error) {
            logger.writeLog("error", `services/removeService/delete: ${error}`);
        }
    }
};
