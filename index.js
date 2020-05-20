// Your code here
function createEmployeeRecord(employeeData){
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrays){

    return employeeArrays.map(function(employee){
        return createEmployeeRecord(employee)
    })

}

function createTimeInEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ') //destructuring

    const clockIn = {
        type: "TimeIn",
        hour: parseInt(hour, 10), //wants integer, not string
        date //destructuring
    }
    employeeRecord.timeInEvents.push(clockIn)

    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let [date, hour] = dateStamp.split(' ') //destructuring

    const clockOut = {
        type: "TimeOut",
        hour: parseInt(hour, 10), //wants integer, not string
        date //destructuring
    }
    employeeRecord.timeOutEvents.push(clockOut)

    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    //find timein event and timeout event for that date
    //open index.html to use debugger
   
    //iterate through time in events and find one with matching date?
    const timeIn = employeeRecord.timeInEvents.find(function(timeEvent){
       return timeEvent.date === date
    })

    const timeOut = employeeRecord.timeOutEvents.find(function(timeEvent){
        return timeEvent.date === date
    })

    const hoursWorked = (timeOut.hour - timeIn.hour) / 100 //so that returns 2 instead of 200

    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date){
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord){
    let eligibleDates = employeeRecord.timeInEvents.map(function(e){
        return e.date
    })

    // let counter = 0

    // eligibleDates.forEach(function(date){
    //     counter += wagesEarnedOnDate(employeeRecord, date)
    // })

    // return counter
    let payable = eligibleDates.reduce(function(accumulator, date){
        return accumulator + wagesEarnedOnDate(employeeRecord, date)
    }, 0) //accumulator starts at 0 b/c pass in 0 as argument

    return payable
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(employee){
        return employee.firstName === firstName
    })

}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(accumulator, employee){
        return accumulator + allWagesFor(employee)
    }, 0)
}