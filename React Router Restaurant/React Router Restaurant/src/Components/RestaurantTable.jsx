import RestaurantCard from "./RestaurantCard";

function RestaurantTable({data=[]}) {
  console.log("data",data);
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rating</th>
          <th>Type</th>
          <th>Price Starts From</th>
        </tr>
      </thead>
      <tbody>
        
      {data.map((item,index) => {
          return <RestaurantCard key={index} {...item} />;
        })}
      </tbody>
    </table>
  );
}

export default RestaurantTable;
