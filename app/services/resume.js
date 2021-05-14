const logger = require("../config/logger.js");
const got = require("got");
const secretKey = require("../config/secretKey").secretKey;

module.exports = class resumeService {
    static async get(user_seq) {
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/getByUserSeq`;
            const { body } = await got.post(apiURL, { json: { seq: user_seq },responseType: "json" });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/resumeService/getByUserSeq: ${body.result}`);
                return body.data;
            }
        } catch (error) {
            logger.writeLog("error", `services/resumeService/getByUserSeq: ${error}`);
            return null;
        }
    }
    static async update(seq, subject, photo, name, contact, email,
        postCode, address, addressExtra, education, educcationSchool, carrerSeq, technical, license,
        isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary){
        try {
            var apiURL = `${process.env.APIHOST}/api/resume/update`;
            const { body } = await got.post(apiURL, {
                json: { 
                    seq: seq,
                    subject: subject,
                    photo: photo,
                    name: name,
                    contact: contact,
                    email: email,
                    postCode: postCode,
                    address: address,
                    addressExtra: addressExtra,
                    education: education,
                    educcationSchool: educcationSchool,
                    carrerSeq: carrerSeq,
                    technical: technical,
                    license: license,
                    isWelfare: isWelfare,
                    isMilitaly: isMilitaly,
                    carrerCertificate: carrerCertificate,
                    introduce: introduce,
                    workingTypeSeqs: workingTypeSeqs,
                    workingTypeNames: workingTypeNames,
                    salary: salary
                    }
                ,responseType: "json" });
            if (body.result === "success") {
                return body.data;
            } else {
                //실패
                logger.writeLog("error", `services/resumeService/update: ${body.result}`);
                return body.data;
            }
        } catch (error) {
            logger.writeLog("error", `services/resumeService/update: ${error}`);
            return null;
        }
    }
};
