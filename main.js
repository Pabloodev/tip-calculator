const buttonsPercent = document.querySelectorAll('.percent-button');
let customButton = document.getElementById('custom');


let billVisor = document.getElementById('input-money');
let peopleVisor = document.getElementById('input-people');

let resultAmount = document.getElementById('result-amount');
let resultTotal = document.getElementById('result-total');

let errorMessage = document.getElementById('error');
const resetButton = document.getElementById('reset');


function calculateTip(tipPercentage) {
    let billNumber = Number(billVisor.value);
    let peopleNumber = Number(peopleVisor.value);

    if (peopleNumber > 0) {
        errorMessage.style.display = 'none'
        peopleVisor.classList.remove('error-input');
        let tipAmount = (billNumber * tipPercentage) / 100;
        let totalAmount = billNumber + tipAmount;
        let tipPerPerson = tipAmount / peopleNumber;
        let totalPerPerson = totalAmount / peopleNumber;

        resultAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
        resultTotal.textContent = `$${totalPerPerson.toFixed(2)}`;
    } else {
        peopleVisor.focus();
        peopleVisor.classList.add('error-input');
        errorMessage.style.display = 'flex';
    }
}

resetButton.addEventListener('click', () => {
    billVisor.value = '';
    peopleVisor.value = '';
    resultAmount.textContent = '$0.00';
    resultTotal.textContent = '$0.00';
    peopleVisor.classList.remove('error-input');
    errorMessage.style.display = 'none';
    buttonsPercent.forEach(btn => btn.classList.remove('active'));
    customButton.value = '';
});

buttonsPercent.forEach(button => {
    button.addEventListener('click', () => {
        buttonsPercent.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        let tipPercentage = Number(button.textContent.replace('%', ''));
        calculateTip(tipPercentage);
    });
});

customButton.addEventListener('input', () => {
    let customPercentage = Number(customButton.value);
    if (!isNaN(customPercentage) && customPercentage > 0) {
        buttonsPercent.forEach(btn => btn.classList.remove('active'));
        calculateTip(customPercentage);
        errorMessage.style.display = 'none'
    }
});