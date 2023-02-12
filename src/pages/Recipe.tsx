import React from "react";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
function Recipe() {
  const [details,setDetails] = useState<any>({})
  const [activeTab,setActiveTab] = useState<string>("instructions");
  const { id } = useParams();

  const getRecipe = async () => {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const data = await response.json();
    setDetails(data)
    console.log(data);
    
  };

  useEffect(() => {
    getRecipe();
  }, [id]);

  return (
    <Details>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt="" />
      </div>
      <Info>
        <Button
          className={activeTab === "instructions" ? "active" : ""}
          onClick={() => setActiveTab("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={activeTab === "ingredients" ? "active" : ""}
          onClick={() => setActiveTab("ingredients")}
        >
          Ingredients
        </Button>

        {activeTab === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }} />
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient : any)=>{
              return <li key={ingredient.id}>{ingredient.original}</li>
            })}
          </ul>
        )}
      </Info>
    </Details>
  );
}

const Details = styled.div`
  margin-top: 2rem;
  margin-bottom: 5rem;
  display:flex;
  .active{
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
   h2{
    margin-bottom: 2rem;
   }
   li{
    font-size: 1.2rem;
    line-height: 2.5rem;
   }
   ul{
    margin-top: 2rem;
   }
`

const Button = styled.button`
   padding: 1rem 2rem;
   color: #313131;
   background: white;
   border: 2px solid black;
   margin-right: 2rem;
   font-weight: 600;
`
const Info= styled.div`
   margin-left: 10rem;

`

export default Recipe;
