let input = document.querySelector('.calculate-block__calculator--input');
let power = document.querySelector('.power__result');
let area = document.querySelector('.area__result');
let yearAmount = document.querySelector('.year-amount__result');
let monthCycle = document.querySelector('.month-cycle__result');
let yearSaving = document.querySelector('.year-saving__result');
let monthSaving = document.querySelector('.month-saving__result');

input.addEventListener('input', (e) => {
    let value = +e.target.value;
    let powerValue, areaValue, yearAmountValue, monthCycleValue, yearSavingValue, monthSavingValue;

    if (isNaN(value)) {
        power.textContent = '0.00 кВт';
        area.textContent = '0.00 м.кв.';
        yearAmount.textContent = '0.00 кВт-год';
        monthCycle.textContent = '0.00 кВт-год';
        yearSaving.textContent = '0.00 $';
        monthSaving.textContent = '0.00 $';
    } else {
        powerValue = (value * 2).toFixed(2);
        areaValue = (value * 3).toFixed(2);
        yearAmountValue = (value * 4).toFixed(2);
        monthCycleValue = (value * 5).toFixed(2);
        yearSavingValue = (value * 6).toFixed(2);
        monthSavingValue = (value * 7).toFixed(2);

        power.textContent = `${powerValue} кВт`;
        area.textContent = `${areaValue} м.кв.`;
        yearAmount.textContent = `${yearAmountValue} кВт-год`;
        monthCycle.textContent = `${monthCycleValue} кВт-год`;
        yearSaving.textContent = `${yearSavingValue} $`;
        monthSaving.textContent = `${monthSavingValue} $`;
    }
});



const form = document.querySelector('.order__form');
const formInputs = form.querySelectorAll('input');

formInputs.forEach(input => {
    let nextElement = input.nextSibling.nextSibling.innerHTML;
    input.addEventListener('input', (e) => {
        let target = e.target;
        if (target.value !== '') {
            target.nextSibling.nextSibling.innerHTML = '';
        } else {
            target.nextSibling.nextSibling.innerHTML = nextElement;
        }
    });
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    for (let i = 0; i < formInputs.length - 1; i++) {
        let error = document.createElement('div');
        error.classList.add('order__error');
        error.textContent = `Заповніть поле`;

        if (formInputs[i].value == '') {
            formInputs[i].parentElement.append(error);
            if(formInputs[i].parentElement.childNodes[6]) {
                error.remove();
            }
        } else {
            error.remove();
        }

        formInputs[i].addEventListener('input', (e) => {
            let target = e.target;

            if (!target.value == '') {
                error.remove();
            } else {
                formInputs[i].parentElement.append(error);
            }
        });
    }
    form.reset();
});