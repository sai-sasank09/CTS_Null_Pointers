document.addEventListener('DOMContentLoaded', () => {
    setupCategoryButtons();
    setupFormListeners();
});

function setupCategoryButtons() {
    const sedanButton = document.getElementById('sedan-btn');
    const suvButton = document.getElementById('suv-btn');
    const sedansList = document.getElementById('sedans-list');
    const suvsList = document.getElementById('suvs-list');

    // Initially fetch and show sedans
    fetchAndDisplayCars('sedans', true);
    sedanButton.classList.add('active');
    sedansList.classList.add('active');

    sedanButton.addEventListener('click', () => {
        sedanButton.classList.add('active');
        suvButton.classList.remove('active');
        sedansList.classList.add('active');
        suvsList.classList.remove('active');
        fetchAndDisplayCars('sedans', true);
    });

    suvButton.addEventListener('click', () => {
        suvButton.classList.add('active');
        sedanButton.classList.remove('active');
        suvsList.classList.add('active');
        sedansList.classList.remove('active');
        fetchAndDisplayCars('suvs', false);
    });
}

async function fetchAndDisplayCars(type, isSedan) {
    const container = document.getElementById(`${type}-list`);
    
    // Show loading animation
    container.innerHTML = `<div class="loading-spinner"></div>`;

    try {
        const response = await fetch(`http://localhost:8090/api/cars/${type}`);
        const cars = await response.json();
        
        // Small delay for effect (optional)
        setTimeout(() => displayCars(`${type}-list`, cars, isSedan), 500);
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
        container.innerHTML = `<p class="error-message">Failed to load ${type}.</p>`;
    }
}


function getCarImage(isSedan, color) {
    const type = isSedan ? 'sedan' : 'suv';
    const brandNames = isSedan ? 
        ['bmw,sedan', 'mercedes,sedan', 'audi,sedan'] : 
        ['range-rover,suv', 'bmw,suv', 'mercedes,suv'];
    const randomBrand = brandNames[Math.floor(Math.random() * brandNames.length)];
    return `https://source.unsplash.com/featured/800x600/?${randomBrand},${color}`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function displayCars(containerId, cars, isSedan) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    if (cars.length === 0) {
        container.innerHTML = `<div class="no-cars-message">No ${isSedan ? 'sedans' : 'SUVs'} available.</div>`;
        return;
    }

    cars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card new-car';

        const carImage = getCarImage(isSedan, car.color);

        card.innerHTML = `
            <img src="${carImage}" alt="${car.name}" class="car-image">
            <div class="car-info">
                <h3>${car.name}</h3>  <!-- Display the car name -->
                <div class="price-tag">${formatCurrency(car.regularPrice)}
                    <span style="text-decoration: line-through; color: #999; font-size: 0.8em; margin-left: 8px;">
                        ${formatCurrency(car.salePrice)}
                    </span>
                </div>
                <div class="car-specs">
                    <div class="spec-item"><span>🎨 Color:</span> <strong>${car.color}</strong></div>
                    <div class="spec-item"><span>⚡ Speed:</span> <strong>${car.speed} mph</strong></div>
                    ${isSedan ? `
                        <div class="spec-item"><span>📅 Year:</span> <strong>${car.year}</strong></div>
                        <div class="spec-item"><span>💰 Discount:</span> <strong>${formatCurrency(car.manufacturerDiscount)}</strong></div>
                    ` : `
                        <div class="spec-item"><span>⚖️ Weight:</span> <strong>${car.weight} lbs</strong></div>
                    `}
                </div>
            </div>
        `;

        container.appendChild(card);

        setTimeout(() => {
            card.classList.remove('new-car');
        }, 500);
    });
}



function setupFormListeners() {
    const forms = {
        sedan: document.getElementById('sedan-form'),
        suv: document.getElementById('suv-form')
    };

    Object.entries(forms).forEach(([type, form]) => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const response = await fetch(`http://localhost:8090/api/cars/${type}s`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    throw new Error('Failed to add car');
                }

                // Refresh the current active category
                const isSedan = type === 'sedan';
                await fetchAndDisplayCars(`${type}s`, isSedan);
                e.target.reset();
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.textContent = 'Car added successfully!';
                successMsg.style.cssText = `
                    background: #4CAF50;
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 10px;
                    text-align: center;
                `;
                form.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);
                
            } catch (error) {
                console.error(`Error adding ${type}:`, error);
                
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.textContent = 'Failed to add car. Please try again.';
                errorMsg.style.cssText = `
                    background: #f44336;
                    color: white;
                    padding: 10px;
                    border-radius: 5px;
                    margin-top: 10px;
                    text-align: center;
                `;
                form.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 3000);
            }
        });
    });
}