const validateProperties = (helper, desiredHelper) => {
    return validateSalary(parseInt(helper.workDetails.monthlySalary), parseInt(desiredHelper.salary))
        && validateTimings(helper.workDetails.availableStartTime, helper.workDetails.availableEndTime, desiredHelper.time)
        && validateWork(helper.workDetails.typesOfWork, desiredHelper.typesOfWork)
        && validateLocation(helper.workDetails.availableLocations, desiredHelper.location);
}

const validateSalary = (helperSalary, desiredHelperSalary) => {
    return (!desiredHelperSalary) || (helperSalary <= desiredHelperSalary);
}

const validateTimings = (helperStartTiming, helperEndTiming, desiredHelperTiming) => {
    return (!desiredHelperTiming) || (desiredHelperTiming > helperStartTiming && desiredHelperTiming < helperEndTiming);
}

const validateLocation = (helperLocations, desiredHelperLocation) => {
    if (desiredHelperLocation === 'Any') {
        return true;
    }
    return (!desiredHelperLocation) || (helperLocations.includes(desiredHelperLocation));
}

const validateWork = (helperWorks, desiredHelperWorks) => {
    if (!desiredHelperWorks) {
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
    }
    return result;
}