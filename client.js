let employeeArray = [];
// let totalAnnualy = 0; turned off for now


console.log(employeeArray);

$(onReady);

function onReady() {
    $('#addEmployeeButton').on('click', addEmployee);
    updateTotalMontly();
    $('tbody').on('click', '.deleteButton', deleteEvent);

    // Test employees

    addEmployee("Mister", "Rodgers", "4562", "Product Manager", "15012");
    addEmployee("Fred", "Yomama", "66743", "Custodial Technician", "$500,000");
    addEmployee("Bill", "Gates", "4544", "Baseball Pitcher", "34,000");

}

function addEmployee(first, last, id, title, salary) {
    // Get inputs & create object
    salary = salary || $('#annualSalary').val();
    let newPerson = {
        first: first || $('#firstName').val(),
        last: last || $('#lastName').val(),
        id: id || $('#idNum').val(),
        title: title || $('#title').val(),
        salary: Number(salary.replace(/[^0-9\.]+/g, '')) // Thank you Stack Overflow
    }
    
    // Add object to array
    employeeArray.push(newPerson);

    // Housekeeping when we add employee
    // update & print monthly total on HTML
    // clear inputs
    // Print new person to HTML
    // totalAnnualy += newPerson.salary;    // turned off for now
    updateTotalMontly();
    clearInputs();
    printToPage(newPerson);
}

function printToPage(newPerson) {
    // console.log(newPerson); // For testing
    let formattedSalary = turnIntoNumberString(newPerson.salary);
    $('tbody').append(`
    <tr>
        <td>${newPerson.first}</td>
        <td>${newPerson.last}</td>
        <td id="idCell">${newPerson.id}</td>
        <td>${newPerson.title}</td>
        <td>${formattedSalary}</td>
        <td class="deleteCell"><button class="deleteButton">Delete</button></td>
    </tr>`);
}

function updateTotalMontly() {
    // Yes not the fastest to re-check everytime.
    let totalAnnualy = 0;
    for (let i = 0; i < employeeArray.length; i++) {
        totalAnnualy += employeeArray[i].salary;
    }
    // console.log(totalAnnualy);
    let totalMonthly = turnIntoNumberString(totalAnnualy / 12);

    $('#salaryTotalArea').empty();
    $('#salaryTotalArea').append(`<p>Total Monthly: ${totalMonthly}</p>`);

}

// This was taken from Stack Overflow.
// While I was tempted to use the RegEx 
// This seems like a good thing to get used to
//
function turnIntoNumberString(numberToFormat) {
    console.log(numberToFormat);
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', });
    console.log(formatter.format(numberToFormat)); // For Testing
    return formatter.format(numberToFormat);
}

function clearInputs() {
    first = $('#firstName').val("");
    last = $('#lastName').val("");
    ID = $('#idNum').val("");
    title = $('#title').val("");
    salary = $('#annualSalary').val("");
}

function deleteEvent() {
    let idToRemove = $(this).parent().siblings('#idCell').text();
    employeeArray = employeeArray.filter(x => x.id != idToRemove);
    $(this).parent().parent().remove();
    // $(this).closest('tr').remove();
    updateTotalMontly();

}