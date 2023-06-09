import styled from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const Products = ({ cart, dispatch }) => {
  //these two lines will set the state for watches and currentPage both are used for the navigation
  //buttons to the next or previous pages
  const [watches, setWatches] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  //this is const is to use the useNavigate hook to direct the user to different pages
  const navigate = useNavigate();

  //this checks to see if an item is already in the cart, if it isn't in the cart it returns false,
  // if it is it returns, this helps with style rendering for the buttons and text in buttons
  const isItemInCart = (itemId) => {
    const foundItem = cart.find((item) => item._id === itemId);
    if (!foundItem) {
      return false;
    }
    return true;
  };

  //this useEffect fetches the information for in api/products all products from the database
  // and sets the useState for watches to the data within the collection
  useEffect(() => {
    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => {
        setWatches(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //Pagination logic
  const watchesPerPage = 48;
  const indexOfLastWatch = currentPage * watchesPerPage;
  const indexOfFirstWatch = indexOfLastWatch - watchesPerPage;
  const currentWatches = watches?.slice(indexOfFirstWatch, indexOfLastWatch);

  {
    /*This code handles the click when adding an item to the cart. 
    It prevents the default behavior of the event and sends a POST request to the API endpoint 
    to add the item to the cart. It then checks if the item already exists in the cart and 
    updates its quantity or adds it as a new item in the cart state accordingly. */
  }
  const handleSubmit = (event, item) => {
    event.preventDefault();
    event.stopPropagation();
    fetch(`/api/cart/${item._id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {

        const existingCartItem = cart.find(
          (cartItem) => cartItem._id === data._id
        );
        if (existingCartItem) {
          dispatch({
            type: "UPDATE_QUANTITY",
            _id: item._id,
            quantity: data.quantity,
          });
        } else {
          dispatch({ type: "ADD_ITEM", item: data });
        }
      })
      .catch((error) => console.log(error));
  };
  //this handle click will direct the user to the corresponding single product page
  const handleClick = (event, watch) => {
    event.stopPropagation();
    navigate(`${watch._id}`);
  };

  return (
    <div>
      {/* this is checking to see if currentWatches is falsy, if it is, it will render the loading 
      component, if not it will render the page */}
      {!currentWatches ? (
        <div>
          <Loading />
        </div>
      ) : (
        <div>
          <Title>All Products</Title>
          <Wrapper>
            {/* this maps over currentWatches to display the specified information */}
            {currentWatches.map((watch) => (
              <ProductWrapper
                key={watch._id}
                onClick={(e) => handleClick(e, watch)}
              >
                <div>
                  <ProductImg src={watch.imageSrc} alt="image of product" />
                </div>

                <ProductInfo>
                  <h4>{watch.name}</h4>
                  <p>{watch.price}</p>
                  <AddToCart
                    // for this button, we're checking to see if there is the specified item in cart or
                    // if there is no available stock to disable the button
                    disabled={watch.numInStock === 0 || isItemInCart(watch._id)}
                    onClick={(e) => handleSubmit(e, watch)}
                  >
                    {/* making use of a ternary operator to render "out of stock" if there is no stock available
                    to render "Added to cart" if the item is already within the cart or else render "add to cart" */}
                    {watch.numInStock === 0
                      ? "Out of Stock"
                      : isItemInCart(watch._id)
                      ? "Added to Cart"
                      : "Add to Cart"}
                  </AddToCart>
                </ProductInfo>
              </ProductWrapper>
            ))}
          </Wrapper>
          <PageButtons>
            {/* here the button is disable if the current page is equal to 1, if you click the Prev button, it will subtract
            the current page -1 and if you click the next button it will add 1 to the current page */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>

            <button
              disabled={watches && currentWatches.length < watchesPerPage}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </PageButtons>
        </div>
      )}
    </div>
  );
};

export default Products;

//styled components
const ProductWrapper = styled.div`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100vw;
  margin: 0 200px;
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 30px;
  h4 {
    font-weight: bold;
    margin-bottom: 8px;
    min-height: 40px;
    line-height: 20px;
    text-align: center;
  }
`;
const ProductImg = styled.img`
  height: 175px;
  width: auto;
  margin-top: 30px;
`;
const PageButtons = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 50px;

  button {
    margin: 0 5px;
    align-items: center;
    background-color: #aa726c;
    color: white;
    border: 1px solid #dfdfdf;
    border-radius: 10px;
    padding: 5px 10px;
    &:disabled {
      opacity: 50%;
    }
  }
`;
const AddToCart = styled.button`
  align-items: center;
  background-color: #aa726c;
  color: white;
  border: 1px solid #dfdfdf;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  font-family: Inter, sans-serif;
  font-size: 10px;
  justify-content: center;
  max-width: 100%;
  text-decoration: none;
  transition: all 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 30px;
  margin-top: 20px;

  :active,
  :hover {
    outline: 0;
  }

  :hover {
    background-color: #aa726c;
    border-color: rgba(0, 0, 0, 0.19);
  }

  @media (min-width: 100px) {
    font-size: 16px;
    min-width: 160px;
    padding: 10px 12px;
  }
  &:disabled {
    opacity: 50%;
  }
`;
const Title = styled.h1`
  font-size: 35px;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
`;
