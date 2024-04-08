import Category from "./Category/Category";
import Price from "./Price/Price";
import "./Sidebar.css";

const Sidebar = ({selectedCategory,selectCategory,selectedPrice,selectPrice }) => {
  return (
    <>
      <section className="sidebar">
        <div className="logo-container">
          <h1>🛒</h1>
        </div>
        <Category handleChange={selectCategory} value={selectedCategory} />
        <Price handleChange={selectPrice} value={selectedPrice}/>
      </section>
    </>
  );
};

export default Sidebar;
