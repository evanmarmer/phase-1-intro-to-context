function createEmployeeRecord(employeeInfoArray){
    return {
        firstName : employeeInfoArray[0],
        familyName : employeeInfoArray[1],
        title : employeeInfoArray[2],
        payPerHour : employeeInfoArray[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
}

function createEmployeeRecords(employeeRecordArrays){
    return employeeRecordArrays.map(createEmployeeRecord)
}

function createTimeInEvent(employeeInfoObj,dateStamp){
    let stamp = dateStamp.split(" ")
    // console.log(stamp)
    let timeInObj = {
        type : "TimeIn",
        hour : parseInt(stamp[1]),
        date : stamp[0]
    }
    // console.log(employeeInfoObj.timeInEvents)
    employeeInfoObj.timeInEvents.push(timeInObj)
    return(employeeInfoObj)
}

function createTimeOutEvent(employeeInfoObj,dateStamp){
    let stamp = dateStamp.split(" ")
    let timeOutObj = {
        type : "TimeOut",
        hour : parseInt(stamp[1]),
        date : stamp[0]
    }
    employeeInfoObj.timeOutEvents.push(timeOutObj)
    return(employeeInfoObj)
}

function hoursWorkedOnDate(recordObj,formDate){
    // console.log(recordObj)
    // console.log(formDate)
    // let timeIn = recordObj.timeInEvents[0].hour
    // let timeOut = recordObj.timeOutEvents[0].hour
    let timeIn = recordObj.timeInEvents.find(findDate).hour
    let timeOut = recordObj.timeOutEvents.find(findDate).hour
    function findDate(obj){
        return obj.date === formDate
    }
    let time = (timeOut - timeIn) / 100
    return time
}

function wagesEarnedOnDate(recordObj,formDate){
    let rate = recordObj.payPerHour
    return rate * hoursWorkedOnDate(recordObj,formDate)
}

function allWagesFor(recordObj){
    let array = []
    recordObj.timeInEvents.forEach(obj => {
        let date = obj.date
        array.push(date)
    })
    let payArray = []
    array.forEach(date => {
        payArray.push(wagesEarnedOnDate(recordObj,date))
    })
    let sum = 0
    payArray.forEach(pay =>{
       sum = sum + pay
    })
    return(sum)
}

// function calculatePayroll(employeeRecordsArray){
//     console.log(employeeRecordsArray)
//     employeeRecordsArray.forEach(obj => {
//        allWagesFor(obj)
//        let initialValue = 0 
//     let sumWithInitial = allWagesFor(obj).reduce(
//         (sum, pay) => sum + pay, initialValue
//     )
//         return(sumWithInitial)
//     })
// }

function calculatePayroll(employeeRecordsArray) {
    return employeeRecordsArray.reduce(function (sum, pay) {
        return sum + allWagesFor(pay)
    }, 0
    )
}