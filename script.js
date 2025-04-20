document.getElementById('runAlgorithm').addEventListener('click', runAlgorithm);

function runAlgorithm() {
    // Get input values
    let numTasks = parseInt(document.getElementById('numTasks').value);
    let numResources = parseInt(document.getElementById('numResources').value);

    // Generate random resource values
    let resources = [];
    for (let i = 0; i < numResources; i++) {
        resources.push(Math.floor(Math.random() * 100) + 1); // Random resources between 1 and 100
    }

    let numBees = 10;  // Number of bees
    let maxIterations = 100; // Maximum iterations for BCO
    
    // Randomly allocate resources to the bees
    let beeAllocations = [];
    for (let i = 0; i < numBees; i++) {
        let beeAllocation = [];
        for (let j = 0; j < numResources; j++) {
            beeAllocation.push(Math.random() * resources[j]);
        }
        beeAllocations.push(beeAllocation);
    }
    
    // Simulate the optimization process (simplified)
    let bestAllocation = beeAllocations[0];
    let bestFitness = calculateFitness(bestAllocation);
    
    for (let i = 0; i < maxIterations; i++) {
        for (let j = 0; j < numBees; j++) {
            let newAllocation = mutate(beeAllocations[j], resources);
            let fitness = calculateFitness(newAllocation);
            if (fitness > bestFitness) {
                bestFitness = fitness;
                bestAllocation = newAllocation;
            }
        }
    }
    
    // Update the result on the page
    document.getElementById('algorithmResult').textContent = JSON.stringify(bestAllocation, null, 2);

    // Visualize the result with a chart
    updateChart(bestAllocation, resources);
}

// Fitness calculation (simplified version)
function calculateFitness(allocation) {
    return allocation.reduce((sum, value) => sum + value, 0);
}

// Mutation function (simplified random mutation for demonstration)
function mutate(allocation, resources) {
    let newAllocation = [...allocation];
    let index = Math.floor(Math.random() * allocation.length);
    newAllocation[index] = Math.random() * resources[index];
    return newAllocation;
}

// Update chart with the new allocation
function updateChart(allocation, resources) {
    const ctx = document.getElementById('resourceChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: resources.map((_, index) => `Resource ${index + 1}`),
            datasets: [{
                label: 'Resource Allocation',
                data: allocation,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
