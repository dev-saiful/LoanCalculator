// Listen for submit

document.getElementById('loan-form').addEventListener('submit',function(e){
    // Hide result
    document.getElementById('results').style.display = 'none';
    // Show loader
    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults,2000);
    e.preventDefault();
});

// calculate results

function calculateResults() {
    // UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principle = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100/12;
    const calculatedPayments = parseFloat(years.value)*12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principle*x*calculatedInterest)/(x-1);

    if(isFinite(monthly))
    {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value =(monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principle).toFixed(2);

        // Show result
        document.getElementById('results').style.display = 'block';
        // Hide loader
        document.getElementById('loading').style.display = 'none';

    }
    else
    {
        showError('Please Check Your Input Numbers');
    }

   
}

// SHow Error

function showError(error) {
    // Hide result
    document.getElementById('results').style.display = 'none';
    // Hide loader
    document.getElementById('loading').style.display = 'none';
    // create a div
    const errorDiv = document.createElement('div');

    // Get elemnts
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // Add class
    errorDiv.className = 'alert alert-danger';

    // create a text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv,heading);

    // Clear error after 3 sec
    setTimeout(clearError,3000);
}

// clear error
function clearError()
{
    document.querySelector('.alert').remove();
}