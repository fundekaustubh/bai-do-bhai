const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HelperSchema = new Schema({
    "personalDetails": {
        "firstName": String,
        "lastName": String,
        "dateOfBirth": Date,
        "gender": String,
        "maritalStatus": String,
        "dependents": Number,
        "location": String,
        "address": String,
        "contactNumber": Number,
        "emailID": String,
        "photo": String,
    },
    "documents": {
        "aadharNumber": String,
        "PANNumber": String,
        "birthCertificateID": String
    },
    "bankDetails": {
        "bankName": String,
        "bankBranch": String,
        "accountNumber": String,
        "IFSCCode": String
    },
    "workDetails": {
        "availableStartTime": String,
        "availableEndTime": String,
        "typesOfWork": [String],
        "monthlySalary": Number,
        "availableLocations": [String]
    }
});

module.exports = mongoose.model('Helper', HelperSchema);