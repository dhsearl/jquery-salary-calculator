let employeeArray = [];
let totalMontly = 0;

function makeEmployee(first, last, id, title, salary){
   return{ 
    first: first,
    last: last,
    id: id,
    title: title,
    salary: Number(salary.replace(/[^0-9]/,''))
    }
}

$(onReady);

function onReady() {
    $('#addEmployeeButton').on('click', addEmployee);
}

function addEmployee() {
    let first = $('#firstName').val();
    let last = $('#lastName').val();
    let ID = $('#ID').val();
    let title = $('#title').val();
    let salary = $('#annualSalary').val();

    newPerson = makeEmployee(first,last,ID,title,salary);
    totalMonthly += newPerson.salary;
}
