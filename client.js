let employeeArray = [];
// let totalAnnualy = 0; turned off for now
let waitTime = 0;

console.log(employeeArray);

$(onReady);

function onReady() {
    $('#addEmployeeButton').on('click', addEmployee);
    updateTotalMontly();
    $('tbody').on('click', '.deleteButton', deleteEvent);

    // Initialize a few employees

    addEmployee("Mister", "Rodgers", "4562", "Product Manager", "15012");
    addEmployee("Fred", "Yomama", "66743", "Custodial Technician", "$500,000");
    addEmployee("Bill", "Gates", "4544", "Baseball Pitcher", "34,000");

    // after first table is built set new waitTime
    waitTime = 500;
    // Focus on first input field
    $('#firstName').focus();
    
}

function addEmployee(first, last, id, title, salary) {
    first = $('#firstName').val() || first;
    console.log(typeof first);
    if(typeof first != 'string'){
        alert("Need First Name");
        $('#firstName').focus();
    }
    // Get inputs & create object
    salary = salary || $('#annualSalary').val();
    first = $('#firstName').val() || first;  // first was returning the event object without this
    let newPerson = {
        first: first,
        last:  $('#lastName').val() || last,
        id: $('#idNum').val() || id,
        title: $('#title').val() || title,
        salary: Number(salary.replace(/[^0-9\.]/g, '')) // Thank you Stack Overflow for RegEx help.
        // [^0-9\.] = (^) exclude everything that isn't 0-9 or the dot (we use backslash to say dot \.)
        // we append the g after the /RegEx/ statement to check the entire string (global)
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
    $('tbody').append($(`
    <tr>
        <td>${newPerson.first}</td>
        <td>${newPerson.last}</td>
        <td id="idCell" class="numberCell">${newPerson.id}</td>
        <td>${newPerson.title}</td>
        <td class="numberCell">${formattedSalary}</td>
        <td class="deleteCell"><button class="deleteButton">Delete</button></td>
    </tr>`).hide().fadeIn(waitTime));
}

function updateTotalMontly() {
    // Yes not the fastest to re-check everytime.
    // let totalAnnualy = 0;
    // for (let i = 0; i < employeeArray.length; i++) {
    //     totalAnnualy += employeeArray[i].salary;
    // }
    // This works, So lets try with reduce:
    // setup an Accumulator, lets call it total,
    // use the name currentPerson to go through array
    // add currentPerson's salary property to the total
    // set the starting value of total to 0
    //
    let totalAnnualy = employeeArray.reduce((total, currentPerson) => total += currentPerson.salary,0);
    // console.log(totalAnnualy);
    let totalMonthly = turnIntoNumberString(totalAnnualy / 12);

    $('#salaryTotalArea').empty();
    $('#salaryTotalArea').append(`<p>Total Monthly: ${totalMonthly}</p>`);

}

// This was adopted from Stack Overflow.
// Who knew there was a Intl object with methods to do this? 
// 
//
function turnIntoNumberString(numberToFormat) {
    // console.log(numberToFormat);  // For Testing
    let formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits:0, maximumFractionDigits: 0, });
    // console.log(formatter.format(numberToFormat));  // For Testing
    
    return formatter.format(numberToFormat);
}

function clearInputs() {
    first = $('#firstName').val("");
    last = $('#lastName').val("");
    ID = $('#idNum').val("");
    title = $('#title').val("");
    salary = $('#annualSalary').val("");
    $('#firstName').focus();
}

function deleteEvent() {
    // get the ID of the employee we're remvoing (we have a lot of John Smiths)
    //
    let idToRemove = $(this).parent().siblings('#idCell').text();
    // Filter the employee Array to remove the employee with that ID
    // 
    employeeArray = employeeArray.filter(x => x.id != idToRemove);
    // Remove the Row
    //
    $(this).parent().parent().remove();
    // | alternative method |
    // V                    V       
    //          
    // $(this).closest('tr').remove();
    // Update Total Monthly at bottom of HTML
    updateTotalMontly();

}

function checkFields() {
    if(!$('#firstName').val()){
        console.log("need first name");
    }
}