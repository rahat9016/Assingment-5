 document.getElementById("warning-sorry").style.display = "none";

document.getElementById("srcBar").addEventListener('click', function(){
    const foodValue = document.getElementById("mealValue").value;
    console.log(foodValue);
    if( foodValue === ''){
        document.getElementById("waring").style.display = "block"
    }else{
        foodName(foodValue)
        document.getElementById("waring").style.display = "none"
    }
    document.getElementById("mealValue").value = "";
    document.getElementById("foodItem").innerText = "";
    document.getElementById("showFoodInfo").innerText = "";
})

const foodName = (foodValue) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodValue}`)
    .then(res => res.json())
    .then(data => {
        console.log(data.meals)
        displayManu(data.meals)
    })
}



const displayManu = foods =>{
    const listOfFood = document.getElementById('foodItem');
    if(foods != null){

        foods.map(foods =>{
            const foodContainer = document.createElement("div")
            foodContainer.className ="foods"
            const foodInfo = `
            <div onclick="displayDetails('${foods.idMeal}')">
                <img src="${foods.strMealThumb}">
                <h3>${foods.strMeal}</h3>
            </div> 
            `
            console.log(foodInfo)
            foodContainer.innerHTML = foodInfo
            listOfFood.appendChild(foodContainer)
            
        })
    }else{
        document.getElementById("warning-sorry").style.display = "block";
    }
}


const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log('the fahgh fhjd ', data.meals[0].strIngredient2);
            renderFoodInfo(data.meals[0]);
        });
        document.getElementById("showFoodInfo").style.display = "block";
};
const showFood = document.getElementById("showFoodInfo")
const renderFoodInfo = food => {
    const foodItemsDiv = showFood;
    foodItemsDiv.innerHTML = `
    <img src="${food.strMealThumb}" alt="">
    <h2>${food.strMeal}</h2>
    <h3 >Ingredients</h3>
    <ul class="mb-0">
        <li> </i> ${food.strIngredient1}</li>
        <li> </i> ${food.strIngredient2}</li>
        <li> </i> ${food.strIngredient3}</li>
        
    </ul>
   `

}

// document.getElementById("body").addEventListener('click',function(){
//     document.getElementById("showFoodInfo").style.display = "none";
// })

