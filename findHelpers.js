const validateProperties = (helper, desiredHelper) => {
    // console.log(validateSalary(parseInt(helper.workDetails.monthlySalary), parseInt(desiredHelper.salary)));
    // console.log(validateTimings(helper.workDetails.availableStartTime, helper.workDetails.availableEndTime, desiredHelper.time));
    // console.log(validateWork(helper.workDetails.typesOfWork, desiredHelper.typesOfWork));
    // console.log(validateLocation(helper.workDetails.availableLocations, desiredHelper.location));
    return validateSalary(parseInt(helper.workDetails.monthlySalary), parseInt(desiredHelper.salary))
        && validateTimings(helper.workDetails.availableStartTime, helper.workDetails.availableEndTime, desiredHelper.time)
        && validateWork(helper.workDetails.typesOfWork, desiredHelper.typesOfWork)
        && validateLocation(helper.workDetails.availableLocations, desiredHelper.location);
}

const validateSalary = (helperSalary, desiredHelperSalary) => {
    return (!desiredHelperSalary) || (helperSalary <= desiredHelperSalary);
}

const validateTimings = (helperStartTiming, helperEndTiming, desiredHelperTiming) => {
    if (!desiredHelperTiming) {
        return false;
    }
    return (desiredHelperTiming >= helperStartTiming) && (desiredHelperTiming < helperEndTiming);
}

const validateLocation = (helperLocations, desiredHelperLocation) => {
    if (desiredHelperLocation === 'any') {
        return true;
    }
    return (helperLocations.includes(desiredHelperLocation));
}

const validateWork = (helperWorks, desiredHelperWorks) => {
    if ((!desiredHelperWorks) || desiredHelperWorks.length === 0) {
        return true;
    }
    for (let work of desiredHelperWorks) {
        if (helperWorks.includes(work)) {
            return true;
        }
    }
    return false;
}

module.exports.findHelpers = (helpers, desiredHelper) => {
    const result = [];
    for (let helper of helpers) {
        if (validateProperties(helper, desiredHelper)) {
            result.push(helper);
        }
        // else {
        //     console.log(parseInt(helper.workDetails.monthlySalary), parseInt(desiredHelper.salary));
        //     console.log(helper.workDetails.availableStartTime, helper.workDetails.availableEndTime, desiredHelper.time);
        //     console.log(helper.workDetails.typesOfWork, desiredHelper.typesOfWork);
        //     console.log(helper.workDetails.availableLocations, desiredHelper.location);
        // }
    }
    return result;
}