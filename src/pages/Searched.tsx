import { useState, useEffect } from "react";
import styled from "styled-components";

import { useParams } from "react-router-dom";
function Searched() {
  const { search } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const [results, setResult] = useState<any[]>([]);

  const getSearchedRecipes = async (name: any) => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}&number=9`
    );
    const data = await response.json();
    setResult(data.results);
    setLoading(true)
    if (data.results.length > 0) {
      setLoading(false);
    }
    console.log(data.results);  
  };

  useEffect(() => {
    getSearchedRecipes(search);
  }, [search]);

  if (loading) {
    return <div>There was no result</div>;
  } else {
    return (
      <div>
        <Grid>
          {results.map((item) => {
            return (
              <Card key={item.id}>
                <img src={item.image} alt="" />
                <h4>{item.title}</h4>
              </Card>
            );
          })}
        </Grid>
      </div>
    );
  }
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;
export default Searched;
