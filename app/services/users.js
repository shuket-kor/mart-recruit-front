const logger = require("../config/logger.js");
const secretKey = require('../config/secretKey').secretKey;
const got = require("got");

module.exports = class userService {
    // 유저 로그인
    static async login(userId, password) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/login`;

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
                logger.writeLog("error", `FRONT - userService/login: ${body.data}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `FRONT - userService/login: ${error}`);
            return null;
        }
    }

    // auth
    static async authorizatoin(userId, password) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/login`;

            const {body} = await got.post(apiURL, {
                json: {
                    userId: userId,
                    password: password,
                },
                responseType: "json",
            });
            // console.log(body)
            if (body.result === "success") {
                logger.writeLog("error", `FRONT_TRY - userService/authorizatoin: ${body}`);
                // 인증에 성공하면 data에 담겨온 토큰을 리턴
                return body;
            } else {
                //실패
                console.log(body.data);
                logger.writeLog("error", `FRONT_TRY - userService/authorizatoin: ${error}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/authorizatoin: system error - ${error}`);
            return null;
        }
    }

    // 유저 조회
    static async list(token, secretkey) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users`;

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
                logger.writeLog("error", ` FRONT - userService/getUser: ${body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", ` FRONT - userService/getUser: ${error}`);
            return null;
        }
    }
    // 유저 생성
    static async create(userId, password, userType, bizNo, martName, active) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/create`;

            const {body} = await got.post(apiURL, {
                json: {
                    userId: userId,
                    password: password,
                    userType: userType,
                    bizNo: bizNo,
                    martName: martName,
                    active: active,
                },
                responseType: "json",
            });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `userService/create: 사용자 정보를 등록 중 API 오류`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `userService/create: ${error}`);
            return null;
        }
    }

    // 아이디 체크
    static async checkid(userId) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/checkid`;

            const {body} = await got.post(apiURL, {
                json: {
                    userId: userId
                },
                responseType: "json",
            });
            console.log(body)
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `userService/checkid: `);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `userService/checkid: ${error}`);
            return null;
        }
    }
    // 사용자 정보 얻기
    static async get(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/get`;
            const { body } = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                },
                json: {
                    key: secretKey,
                    seq: seq
                },
                responseType: 'json'
            });

            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/create: `);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `services/create: ${error}`);
            return null;
        }
    }
    // 유저 수정
    static async userUpdate(userId, password, userType, active, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/update`;

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
            if (body.result === "success") {
                return data;
            } else {
                //실패
                logger.writeLog("error", `services/userService/update: ${result}`);
                return body.body;
            }
        } catch (error) {
            logger.writeLog("error", `services/userService/update: ${error}`);
        }
    }
    // 유저 수정
    static async updatePassword(token, seq, password) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/updatePassword`;

            const { body } = await got.post(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                },
                json: {
                    key: secretKey,
                    seq: seq,
                    password: password
                },
                responseType: 'json'
            });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `FRONT - services/userService/updatePassword: 사용자 ${seq} 암호 업데이트 실패`);
                return body;
            }
        } catch (error) {
            logger.writeLog("error", `FRONT - services/userService/updatePassword: ${error}`);
            return null;
        }
    }
    // 유저 삭제
    static async userDelete(token, seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/remove`;

            const {body} = await got.patch(apiURL, {
                headers: {
                    'contentType': 'application/json',
                    'User-Agent': 'DEVICE-AGENT',
                    'userAgent': 'DEVICE-AGENT',
                    'Authorization': token
                }, json: {
                    key: secretKey,
                    seq: seq
                },
                responseType: 'json'
            });

            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `userService/delete: ${removeUser.body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `userService/delete: ${error}`);
            return null;
        }
    }

    // 사업자 등록번호 조회
    static async bizNoCheck(bodyData) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/bizNoCheck`;

            const {body} = await got.post(apiURL,
                    {
                        xml: {
                        bodyData: bodyData,
                        }
                    }
            );
            // if (body.result == "success") {
            if (body) {
                return body;
            } else {
                //실패
                logger.writeLog("error", `userService/bizNoCheck: ${body}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", `userService/bizNoCheck: ${error}`);
            return null;
        }
    }
    
};
