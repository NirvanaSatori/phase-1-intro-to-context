// Your code here
//populates a record from an Array
//const employee= ["Gray", "Worm", "Security", 100]
function createEmployeeRecord(employee){
    //initialize empty arrays
    const employeeRecord = {
        firstName:employee[0],
        familyName:employee[1],
        title:employee[2],
        payPerHour:employee[3],
        timeInEvents:[],
        timeOutEvents:[]   
     }
     return employeeRecord
}
createEmployeeRecord()

function createEmployeeRecords(employees){     //process an Array of Arrays into an Array of employee records
    const employeesRecords = []
    employees.map(employee => employeesRecords.push(createEmployeeRecord(employee)))
    return employeesRecords
}
createEmployeeRecords()

//adds a timeIn event Object to an employee's record of timeInEvents when provided an employee record and Date/Time String and returns the updated record
function createTimeInEvent(employeeRecord, dateStamp){
    employeeRecord.timeInEvents.push({     //Add an Object with keys to the timeInEvents Array on the record Object
        type:"TimeIn",
        hour:Number.parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecord
}
//it adds a timeOut event Object to an employee's record of timeOutEvents when provided an employee record and Date/Time String and returns the updated record
function createTimeOutEvent(employeeRecord, dateStamp){
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: Number.parseInt(dateStamp.slice(11)),
        date: dateStamp.slice(0, 10)
    })
    return employeeRecord
}
//hoursWorkedOnDate calculates the hours worked when given an employee record and a date
function hoursWorkedOnDate(employeeRecord, date){
    for(let i in employeeRecord.timeInEvents){        //Given an employee record with a date-matched timeInEvent and timeOutEvent
        if(employeeRecord.timeInEvents[i].date === date){
            return (employeeRecord.timeOutEvents[i].hour - employeeRecord.timeInEvents[i].hour)/100
        }
    }
}
//wagesEarnedOnDate multiplies the hours worked by the employee's rate per hour
function wagesEarnedOnDate(employeeRecord, date){
    const totalWages = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
    return totalWages;
}
//allWagesFor aggregates all the dates' wages and adds them together
function allWagesFor(employeeRecord){
    let wages = employeeRecord.timeInEvents.reduce((aggregate, timeInElement) => {     //Given an employee record with MULTIPLE date-matched timeInEvent and timeOutEvent
        let wages = wagesEarnedOnDate(employeeRecord, timeInElement.date)
        return aggregate += wages;
    }, 0)
    return wages;
}
//calculatePayroll aggregates all the dates' wages and adds them together
function calculatePayroll(recordOfEmployees){
    const reduced = (aggregate, employee) => {    //Given an array of multiple employees
        let totalWages = allWagesFor(employee);
        return aggregate += totalWages;
    }
   return recordOfEmployees.reduce(reduced, 0)
}
calculatePayroll()