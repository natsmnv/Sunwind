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
const formTexts = form.querySelectorAll('.order__input--text');
const formErrors = form.querySelectorAll('.order__error');

form.addEventListener('click', (e) => {
    let target = e.target;

    if (target && target.classList.contains('order__input')) {
        formInputs.forEach((input, i) => {
            input.addEventListener('input', () => {
                if (target == input && target.value !== '') {
                    hide(formTexts[i]);
                } else {
                    show(formTexts[i]);
                }
            });
        });
    }
});

const postData = async (url, data) => {
    let res = await fetch(url, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await res.json();
}

function bindPostData(form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        let hasEmptyInputs = false;

        for (let i = 0; i < formInputs.length - 1; i++) {
            if (formInputs[i].value == '') {
                show(formErrors[i]);
                hasEmptyInputs = true;
            } else {
                hide(formErrors[i]);
            }

            formInputs[i].addEventListener('input', (e) => {
                if (e.target.value == '') {
                    show(formErrors[i]);
                } else {
                    hide(formErrors[i]);
                }
            })
        }

        if (hasEmptyInputs) {
            return;
        }

        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        postData('http://localhost:3000/requests', json)
        .then(data => {
            console.log(data);
        })
        .finally(() => formData.reset());
    });
}

bindPostData(form);

function hide(selector) {
    selector.classList.remove('show');
    selector.classList.add('hide');
}

function show(selector) {
    selector.classList.remove('hide');
    selector.classList.add('show');
}