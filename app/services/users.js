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
                logger.writeLog("error", `FRONT - services/login: ${body.data}`);
                return body;
            }
        } catch (error) {
            logger.writeLog("error", `FRONT - services/login: ${error}`);
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
                logger.writeLog("error", `FRONT_TRY - services/authorizatoin: ${body}`);
                // 인증에 성공하면 data에 담겨온 토큰을 리턴
                return body;
            } else {
                //실패
                console.log(body.data);
                logger.writeLog("error", `FRONT_TRY - services/authorizatoin: ${error}`);
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
                logger.writeLog("error", ` FRONT - services/getUser: ${body.result}`);
                return null;
            }
        } catch (error) {
            logger.writeLog("error", ` FRONT - services/getUserService: ${error}`);
        }
    }
    // 유저 생성
    static async create(userId, password, userType, bizno, active) {
        try {
            var apiURL = `${process.env.APIHOST}/api/users/create`;

            const {body} = await got.post(apiURL, {
                json: {
                    userId: userId,
                    password: password,
                    userType: userType,
                    bizno: bizno,
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

    // 마트 생성
    // static async martCreate(seq, bizno) {
    //     try {
    //         var apiURL = "";
    //         if (process.env.NODE_ENV == "develope") apiURL = "http://localhost:3000/api/mart/create";
    //         else apiURL = `http://localhost:3000/api/mart/create`;

    //         const {body} = await got.post(apiURL, {
    //             json: {
    //                 userSeq: seq,
    //                 regNo:bizno
    //             },
    //             responseType: "json",
    //         });
    //         // console.log(body)
    //         if (body.result === "success") {
    //             return body.data;
    //         } else {
    //             //실패
    //             logger.writeLog("error", `services/martCreate: `);
    //             return body.data;
    //         }
    //     } catch (error) {
    //         logger.writeLog("error", `services/martCreate: ${error}`);
    //     }
    // }

    // 
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
                logger.writeLog("error", `services/create: `);
                return body.data;
            }
        } catch (error) {
            logger.writeLog("error", `services/create: ${error}`);
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
                logger.writeLog("error", `services/removeService/userDelete: ${body.result}`);
                return body;
            }
        } catch (error) {
            logger.writeLog("error", `services/removeService/userDelete: ${error}`);
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
                logger.writeLog("error", `services/bizNoCheck: ${body}`);
                return body;
            }
        } catch (error) {
            logger.writeLog("error", `services/bizNoCheck: ${error}`);
        }
    }
    
};
