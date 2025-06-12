//______________________________________Q1_____________________________________________
var food=['Burger', 'Pizza', 'Donuts', 'Pizza', 'Koshary', 'Donuts', 'Seafood','Burger'];
const foodSet=new Set(food);
foodSet.add('Pasta');
console.log(foodSet);
foodSet.delete('Burger');
console.log(foodSet);
function clearSet(x){
    if(x.size>2){
        x.clear();
        console.log("Set is now clear");
    }
    else{
        console.log("Set is working fine");
    }
}
clearSet(foodSet);

//____________________________________Q3_______________________________________________

class vehicle{
    constructor(w,s){
        this.wheels=w;
        this.speed=s;
    }
}
class Bike extends vehicle{
    constructor(w=2,s="Fast Enough"){
        super(w,s);
    }
    static callCount = 0;
    static countCall() {
        Bike.callCount++;
        console.log(`Bike.countCall has been called ${Bike.callCount} times.`);
    }
}
const bike1 = new Bike();
Bike.countCall(); 
Bike.countCall(); 
Bike.countCall();

//_________________________________________Q2________________________________

const titleEl = document.getElementById('title');
const loaderEl = document.getElementById('loader');
const cardContainer = document.getElementById('cardContainer');
function loadMenu(menuType) {
      titleEl.textContent = `You're viewing: ${menuType.charAt(0).toUpperCase() + menuType.slice(1)}`;
      loaderEl.style.display = 'block';
      cardContainer.innerHTML = '';
      fetch(`https://forkify-api.herokuapp.com/api/search?q=${menuType}`)
        .then(res => res.json())
        .then(data => {
          const recipes = data.recipes;
          loaderEl.style.display = 'none';
          recipes.forEach(recipe => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
              <img src="${recipe.image_url}" alt="${recipe.title}">
              <h4>${recipe.title}</h4>
              <p><strong>Publisher:</strong> ${recipe.publisher}</p>
            `;
            cardContainer.appendChild(card);
          });
        })
        .catch(error => {
          loaderEl.style.display = 'none';
          cardContainer.innerHTML = `<p style="color:red">Error loading ${menuType} items.</p>`;
          console.error(error);
        });
    }