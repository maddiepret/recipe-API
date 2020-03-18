import React, { useEffect, useState } from 'react';
import Recipe from './components/Recipe';
import './App.css';
import { APP_ID, APP_KEY } from './components/saftey';

const App = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const res = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await res.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className='app'>
      <h1 className='title'>
        <h1 className='title'>
          Search some of our <span className='highlite'>delicious</span> recipes
        </h1>
      </h1>
      <div className='recipes'>
        <img
          src='https://previews.123rf.com/images/vicushka/vicushka1612/vicushka161200020/67970627-rice-and-vegetables-cooking-ingredients-preparation-on-rustic-background-top-view-banner-healthy-veg.jpg'
          alt='ingredients'
        />
      </div>
      <form className='search-form' onSubmit={getSearch}>
        <input
          type='text'
          className='search-bar'
          onChange={updateSearch}
          value={search}
          placeholder='Search...'
        />
        <button type='submit' className='search-button'>
          Search
        </button>
      </form>
      <div className='recipes'>
        {recipes.map(recipe => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
