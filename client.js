let employeeArray = [];
let totalAnnualy = 0;



$(onReady);

function onReady() {
    $('#addEmployeeButton').on('click', submitEvent);
    updateTotalMontly();
    $('tbody').on('click','.button',deleteEvent);
}

function addToArray() {
    let first = $('#firstName').val();
    let last = $('#lastName').val();
    let ID = $('#idNum').val();
    let title = $('#title').val();
    let salary = $('#annualSalary').val();
    let newPerson = makeEmployee(first, last, ID, title, salary);
    employeeArray.push(newPerson);

    console.log(employeeArray);
    totalAnnualy += newPerson.salary;
    return newPerson;
}
function makeEmployee(first, last, id, title, salary) {
    return {
        first: first,
        last: last,
        id: id,
        title: title,
        salary: Number(salary.replace(/[^0-9\.]+/g, '')) // Thank you Stack Overflow
    }
}

function submitEvent() {
    let newPerson = addToArray();
    console.log(newPerson); // For testing
    $('tbody').append(`
    <tr>
    <td>${newPerson.first}</td>
    <td>${newPerson.last}</td>
    <td>${newPerson.id}</td>
    <td>${newPerson.title}</td>
    <td>${'$ ' + newPerson.salary}</td>
    <td class="deleteCell"><button class="deleteButton">Delete</button></td>
</tr>
`);
    updateTotalMontly();
    clearInputs();

}

function updateTotalMontly() {
    let totalMonthly = turnIntoNumberString(totalAnnualy / 12);
    $('.salaryTotalArea').empty();
    $('.salaryTotalArea').append(`<p>Total Monthly: ${totalMonthly}</p>`);

}

// This was taken from Stack Overflow.
// While I was tempted to use the RegEx 
//
function turnIntoNumberString(numberToFormat) {
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    console.log(formatter.format(numberToFormat));
    return formatter.format(numberToFormat);
}

function clearInputs() {
    first = $('#firstName').val("");
    last = $('#lastName').val("");
    ID = $('#idNum').val("");
    title = $('#title').val("");
    salary = $('#annualSalary').val("");
}