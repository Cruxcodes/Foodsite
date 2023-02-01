import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

function Veggie() {
    const [veggies, setVeggies] = useState<any[]>([]);

    const getRecipes = async () => {
      const check = localStorage.getItem("Veggies");

      if (check) {
        setVeggies(JSON.parse(check));
      } else {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`
        );
        const data = await response.json();
        localStorage.setItem("Veggies", JSON.stringify(data.recipes));
        console.log(data.recipes);
        setVeggies(data.recipes);
      }
    };

    useEffect(() => {
      getRecipes();
    }, []);
  return (
    <div>
      <div>
        <Wrapper>
          <h3>Our Vegetarian Picks</h3>
          <Splide
            options={{
              perPage: 3,
              arrows: false,
              pagination: false,
              drag: "free",
              gap: "5rem",
            }}
          >
            {veggies.map((recipes) => {
              return (
                <SplideSlide key={recipes.id}>
                  <Link to={`recipes/${recipes.id}`}>
                    <Card>
                      <p>{recipes.title}</p>
                      <img src={recipes.image} alt={recipes.title} />
                      <Gradient />
                    </Card>
                  </Link>
                </SplideSlide>
              );
            })}
          </Splide>
        </Wrapper>
      </div>
    </div>
  );
}

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;

const Card = styled.div`
  min-height: 23rem;
  overflow: hidden;
  position: relative;
  border-radius: 2rem;

  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  top: 0%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
