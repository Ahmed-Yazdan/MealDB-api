const searchFood = () => {
    const searchField = document.getElementById('search-feild');
    const searchText = searchField.value;   
    if(searchText == ''){
        alert('Give a name of meal')
    } else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        
        fetch(url)
        .then(res=>res.json())
        .then(data => displaySearchResult(data.meals));
    }
    searchField.value = '';
};

const displaySearchResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
            div.innerHTML = `
                <div onclick="loadMealDetail(${meal.idMeal})" class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0,255)}</p>
                    </div>
                </div>
            `;
        searchResult.appendChild(div);
    });
};   


const loadMealDetail = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();+
    displayMealDetails(data.meals[0])
    // fetch(url)
    // .then(res=>res.json())
    // .then(data=>displayMealDetails(data.meals[0]));
};

const displayMealDetails = meal => {
    const mealDetails = document.getElementById('meal-details');
    mealDetails.innerHTML = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">View video</a>
        </div>
    `;
    mealDetails.appendChild(div);
};