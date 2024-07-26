function calculateFinancialHealth() {
    const income = parseFloat(document.getElementById('income').value);
    const education = parseFloat(document.getElementById('education').value);
    const houseRent = parseFloat(document.getElementById('houseRent').value);
    const transportCost = parseFloat(document.getElementById('transportCost').value);
    const foodCost = parseFloat(document.getElementById('foodCost').value);
    const extraCashflow = parseFloat(document.getElementById('extraCashflow').value);
    const a = extraCashflow>0 ? extraCashflow : 0;
    const b = extraCashflow>0 ? 0 : Math.abs(extraCashflow);
    const totalExpenses = education + houseRent + transportCost + foodCost + b;
    const netCashflow = income - totalExpenses + a ;

    let financialCategory = '';
    if (netCashflow > 1000) {
        financialCategory = 'Excellent';
    } else if (netCashflow > 500) {
        financialCategory = 'Good';
    } else if (netCashflow > 0) {
        financialCategory = 'Average';
    } else if (netCashflow > -500) {
        financialCategory = 'Poor';
    } else {
        financialCategory = 'Critical';
    }

    document.getElementById('financialResults').innerHTML = `
        <p>Total Expenses: ₹${totalExpenses.toFixed(2)}</p>
        <p>Net Cashflow: ₹${netCashflow.toFixed(2)}</p>
        <p>Financial Health: ${financialCategory}</p>
    `;

    const inflowData = extraCashflow > 0 ? [income, extraCashflow] : [income];
    const inflowLabels = extraCashflow > 0 ? ['Income', 'Extra Cashflow'] : ['Income'];
    const outflowData = [education, houseRent, transportCost, foodCost, extraCashflow < 0 ? Math.abs(extraCashflow) : 0];
    const outflowLabels = ['Education', 'House Rent', 'Transport', 'Food', 'Negative Extra Cashflow'];

    createPieChart('cashInflowChart', 'Cash Inflow', inflowLabels, inflowData);
    createPieChart('cashOutflowChart', 'Cash Outflow', outflowLabels, outflowData);
}

function createPieChart(canvasId, title, labels, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}
