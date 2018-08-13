const ServerError = require('@tools/serverError')
const EmployeeAttendance = require('@tools/employeeAttendance')
const Employee = require('@models/hr/Employee')

module.exports = async (input, { from, to, employee_id }, context) => {
  if ([from, to, employee_id].includes(undefined)) throw new ServerError(400, 'Missing params')


  if (Array.isArray(employee_id)) {
    return await Promise.all(employee_id.map(async emp_id => ({ 
      employee: await Employee.query().where({ employee_id: emp_id }).first(),
      attendance: await new EmployeeAttendance(emp_id, from, to).getAttendanceReport()
    })))
  } else {
    return {
      employee: await Employee.query().where({ employee_id }).first(),
      attendance: await new EmployeeAttendance(employee_id, from, to).getAttendanceReport()
    }
  }
}