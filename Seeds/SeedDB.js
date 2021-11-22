const Helper = require('../Schema/Helper');
const hash = require('object-hash');
const mongoose = require('mongoose');
const randomEmail = require('random-email');
const {
    firstNames,
    lastNames,
    genders,
    maritalStatuses,
    locations,
    photos,
    banks,
    startTimes,
    endTimes,
    typesOfWork,
} = require('./data.js');
mongoose.connect('mongodb://localhost:27017/domestic-helpers-portal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

//Seed functions
function randomDate(start, end) {
    let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
function getProperty(arr) {
    const idx = Math.floor(Math.random() * (arr.length));
    return arr[idx];
}
function getArrayProperty(arr, size) {
    let result = [];
    let idx = 0;
    while (size && idx < arr.length) {
        let x = Math.floor(Math.random() * 2);
        if (x == 1) {
            size--;
            result.push(arr[idx]);
        }
        idx++;
    }
    return result;
}

//Main function
const addHelpers = async () => {
    for (let i = 0; i < 100; i++) {
        const newHelper = new Helper({
            "personalDetails": {
                "firstName": getProperty(firstNames),
                "lastName": getProperty(lastNames),
                "dateOfBirth": randomDate(new Date(1960, 0, 1), new Date(2000, 0, 1)),
                "gender": getProperty(genders),
                "maritalStatus": getProperty(maritalStatuses),
                "dependents": Math.floor(Math.random() * 11),
                "location": getProperty(locations),
                "address": hash(''),
                "contactNumber": Math.floor(Math.random() * (100001)) + 9988980000,
                "emailID": randomEmail({ domain: 'gmail.com' }),
                "photo": getProperty(photos)
            },
            "documents": {
                "aadharNumber": hash(randomEmail()),
                "PANNumber": hash(randomEmail()),
                "birthCertificateID": hash(randomEmail())
            },
            "bankDetails": {
                "bankName": getProperty(banks),
                "bankBranch": getProperty(locations),
                "accountNumber": hash(randomEmail()),
                "IFSCCode": hash(randomEmail())
            },
            "workDetails": {
                "availableStartTime": getProperty(startTimes),
                "availableEndTime": getProperty(endTimes),
                "typesOfWork": getArrayProperty(typesOfWork, Math.floor(Math.random() * (typesOfWork.length + 1)) + 1),
                "monthlySalary": Math.floor(Math.random() * 7001) + 1500,
                "availableLocations": getArrayProperty(locations, Math.floor(Math.random() * (locations.length + 1)) + 1)
            }
        });
        await newHelper.save();
        //console.log(newHelper);
    }
};
addHelpers().then(() => {
    mongoose.connection.close();
});