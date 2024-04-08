import { useState,useEffect } from "react";
import Navigation from "./Navigation/Nav";
// import Products from "./Products/Products";
import data from "./db/data";
import Sidebar from "./Sidebar/Sidebar";
import Card from "./components/Card";
import "./index.css";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [list, setList] = useState(data);
  const [resultsFound, setResultsFound] = useState(true);

  console.log(data)

  // ----------- Input Filter -----------
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const filteredItems = data.filter(
    (product) => product.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
  );

  // ----------- Radio Filtering -----------
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  const handleSelectCategory = (event, value) =>
  !value ? null : setSelectedCategory(value);

const handleSelectPrice = (event, value) =>
  !value ? null : setSelectedPrice(value);



  const applyFilters = () => {
    let updatedList = list;

    // Rating Filter
    if (selectedPrice) {
      updatedList = updatedList.filter(
        (item) => parseInt(item.newPrice) <= parseInt(selectedPrice)
      );
    }

    // Category Filter
    if (selectedCategory) {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    setList(updatedList);

    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedPrice, selectedCategory]);
 

  // function filteredData(products, selected, query) {
  //   let filteredProducts = products;

  //   // Filtering Input Items
  //   if (query) {
  //     filteredProducts = filteredItems;
  //   }

  //   // Applying selected filter
  //   if (selected) {
  //     filteredProducts = filteredProducts.filter(
  //       ({ category,newPrice, title }) =>
  //         category === selected || newPrice === selected || title === selected
  //     );
  //   }

  //   return filteredProducts.map(
  //     ({ img, title, star, reviews, prevPrice, newPrice }) => (
  //       <Card
  //         key={Math.random()}
  //         img={img}
  //         title={title}
  //         star={star}
  //         reviews={reviews}
  //         prevPrice={prevPrice}
  //         newPrice={newPrice}
  //       />
  //     )
  //   );
  // }

  // const result = filteredData(products, selectedCategory, query);

  return (
    <>
      <Sidebar 
      selectedCategory={selectedCategory}
      selectCategory={handleSelectCategory}
      selectedPrice={selectedPrice}
      selectPrice={handleSelectPrice}/>
      <Navigation query={query} handleInputChange={handleInputChange} />
      {list.map((product, index) => (
        <div key={index} className="product-card">
          <h2>{product}</h2>
        </div>
      ))}
    </>
  );
}

export default App;
