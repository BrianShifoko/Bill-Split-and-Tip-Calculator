document.addEventListener('DOMContentLoaded', () => {
    const billTotalInput = document.getElementById('bill-total');
    const splitCountElement = document.getElementById('split-count');
    const decreaseButton = document.getElementById('decrease');
    const increaseButton = document.getElementById('increase');
    const tipSlider = document.getElementById('tip-slider');
    const tipPercentElement = document.getElementById('tip-percent');
    const tipAmountElement = document.getElementById('tip-amount');
    const totalPerPersonElement = document.getElementById('total-per-person');
    const currencySelector = document.getElementById('currency');
    const currencySymbols = document.querySelectorAll('#currency-symbol-tip, #currency-symbol-total');

    let splitCount = 1;
    let tipPercent = 0;

    const updateValues = () => {
        const total = parseFloat(billTotalInput.value) || 0;
        const tipAmount = (total * tipPercent) / 100;
        const totalWithTip = total + tipAmount;
        const splitTotal = totalWithTip / splitCount;

        tipAmountElement.textContent = tipAmount.toFixed(2);
        totalPerPersonElement.textContent = splitTotal.toFixed(2);
        tipPercentElement.textContent = `${tipPercent}%`;
    };

    decreaseButton.addEventListener('click', () => {
        if (splitCount > 1) {
            splitCount--;
            splitCountElement.textContent = splitCount;
            updateValues();
        }
    });

    increaseButton.addEventListener('click', () => {
        splitCount++;
        splitCountElement.textContent = splitCount;
        updateValues();
    });

    tipSlider.addEventListener('input', () => {
        tipPercent = tipSlider.value;
        tipPercentElement.textContent = `${tipPercent}%`;
        updateValues();

        // Create water-like splat effect
        const splat = document.createElement('div');
        splat.classList.add('splat');
        splat.style.left = `${tipSlider.value}%`;
        document.querySelector('.slider-container').appendChild(splat);

        setTimeout(() => {
            splat.remove();
        }, 1000); // Remove the splat after 1 second
    });

    currencySelector.addEventListener('change', (event) => {
        const selectedCurrency = event.target.value;
        currencySymbols.forEach(symbol => {
            symbol.textContent = selectedCurrency;
        });
        updateValues();
    });

    billTotalInput.addEventListener('input', updateValues);

    // Initial values update
    updateValues();
});
