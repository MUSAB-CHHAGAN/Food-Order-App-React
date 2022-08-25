/** @format */
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";
import Card from "../UI/Card";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const getMeals = async () => {
      const response = await fetch(
        "https://food-order--react-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("failed to fetch ...");
      }
      const responseData = await response.json();
      const mealsData = [];
      console.log(responseData);
      for (const key in responseData) {
        mealsData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(mealsData);
      setIsLoading(false);
    };
    getMeals().catch(err => {
      setIsLoading(false);
      setError(err.message);
    });
  }, []);
  if (isLoading) {
    return <h1 className={classes.loading}>Loading.....</h1>;
  }
  if (error) {
    return <h1 className={classes.error}>{error}</h1>;
  }
  const mealsList = meals.map(meal => (
    <MealItem
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      id={meal.id}
      idx={meal.idx}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
