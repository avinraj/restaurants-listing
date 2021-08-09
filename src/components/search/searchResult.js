import { useState } from "react";
import image from "../../images/Malamal Gosht Biryani (2).jpg";
import { useHistory } from "react-router-dom";
const SearchResult = (props) => {
    let history = useHistory();
  const [data] = useState(props.location.state.data);
  function getMostFrequent(arr) {
    var output = Object.values(
      arr.reduce((obj, { rating }) => {
        if (obj[rating] === undefined)
          obj[rating] = { rating: rating, occurrences: 1 };
        else obj[rating].occurrences++;
        return obj;
      }, {})
    );
    let maxObj = output.reduce((max, obj) =>
      max.occurrences > obj.occurrences ? max : obj
    );
    return maxObj.rating;
  }
  return (
    <div className="container" style={{ marginTop: "5%" }}>
      <div className="d-flex ">
        <h1>Search Results </h1>
      </div>
      <div
        style={{
          height: "2px",
          backgroundColor: "black",
          opacity: "0.5",
          marginTop: "10px",
        }}
      ></div>
      <div className="container" style={{display: data.length ? "none": "contents",}}>
          <h3 style={{marginTop:"20%"}}>No Restaurants to show</h3>
      </div>
      
      <div className="container" style={{ marginTop: "5%" }}>
        <div className="row row-cols-sm-3">
          {data.map(({ name, address, reviews, id }, index) => (
            <div className="col-sm" style={{ padding: "3%" }} key={index}>
              <div
                className="card"
                style={{
                  backgroundColor: "whitesmoke",
                  boxShadow: "0 0 22px 4px rgba(0,0,0,0.12)",
                }}
              >
                <img
                  src={image}
                  className="card-img-top"
                  alt=""
                  style={{ maxHeight: "10%" }}
                />
                <div
                  className="card-body"
                  onClick={() => {
                    history.push({ pathname: `/restaurantView/${id}` });
                  }}
                >
                  <h5>{name}</h5>
                  rating: {""}
                  {[...Array(getMostFrequent(reviews))].map((e, i) => (
                    <span key={i}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="mediumspringgreen"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    </span>
                  ))}
                  <p style={{ fontWeight: "bold" }}>{address}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SearchResult;
