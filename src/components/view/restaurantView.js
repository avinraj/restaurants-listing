import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./restaurantView.css";
import image from "../../images/Malamal Gosht Biryani (2).jpg";
import { useState, useEffect } from "react";
const RestaurantView = () => {
  let { ID } = useParams();
  ID = parseInt(ID, 10);
  const data = useSelector((state) => state.restaurants.value);
  const [detailsShow, setdetailsShow] = useState(true);
  useEffect(() => {
    if (detailsShow) {
      const d = document.getElementById("detailsBtn");
      const r = document.getElementById("reviewsBtn");
      d.classList.add("active");
      r.classList.remove("active");
    } else {
      const r = document.getElementById("reviewsBtn");
      const d = document.getElementById("detailsBtn");
      r.classList.add("active");
      d.classList.remove("active");
    }
  }, [detailsShow]);
  let filteredData = data.restaurants.filter((obj) => {
    return obj.id === ID;
  });
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
  console.log(filteredData);
  return (
    <div className="container-fluid">
      <div>
        <div>
          <img
            className="image"
            src={image}
            alt=""
            style={{
              width: "100%",
              marginTop: "10px",
              filter: "blur(2px)",
              position: "absolute",
              left: "0",
            }}
          />
        </div>
        <div
          className="mainContentDiv"
          style={{ position: "absolute", color: "white" }}
        >
          <h1>{filteredData[0].name}</h1>
          <h5 style={{ fontWeight: "normal" }}>{filteredData[0].address}</h5>
          <h5 style={{ fontWeight: "normal" }}>
            Near {filteredData[0].neighborhood}
          </h5>
          <p>
            rating :
            {[...Array(getMostFrequent(filteredData[0].reviews))].map(
              (e, i) => (
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
              )
            )}
          </p>
        </div>
      </div>
      <div className="subContentDiv" style={{ position: "absolute" }}>
        <button
          type="button"
          id="detailsBtn"
          className=" btn btn-outline-primary active"
          onClick={() => {
            setdetailsShow(true);
          }}
        >
          Details
        </button>
        <button
          type="button"
          id="reviewsBtn"
          className=" btn btn-outline-primary"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            setdetailsShow(false);
          }}
        >
          Reviews
        </button>
        <br />
        <div
          className="line-1"
          style={{
            height: "2px",
            backgroundColor: "black",
            opacity: "0.5",
            marginTop: "10px",
          }}
        ></div>
        <div
          className="detailsDiv"
          style={{ display: detailsShow ? "contents" : "none" }}
        >
          <h4 style={{ marginTop: "10px" }}>
            Cuisines <br />{" "}
            <span className="badge bg-secondary" style={{ marginTop: "10px" }}>
              {filteredData[0].cuisine_type}
            </span>
          </h4>
          <br />
          <h4>Working Hours </h4>
          {Object.entries(filteredData[0].operating_hours).map(
            ([key, value]) => {
              return (
                <ul
                  className="list-group"
                  style={{ borderStyle: "outset" }}
                  key={key}
                >
                  <li className="list-group-item disabled" aria-current="true">
                    {key} : {value}
                  </li>
                </ul>
              );
            }
          )}
        </div>
        <div
          className="reviewsDiv"
          style={{ display: detailsShow ? "none" : "contents" }}
        >
          {filteredData[0].reviews.map((obj, index) => {
            return (
              <ul className="list-group" key={index}>
                <li className="list-group-item disabled" aria-current="true">
                  <div className="d-flex justify-content-between">
                    {" "}
                    <h5>{obj.name}</h5>{" "}
                    <p>
                      rating :
                      {[...Array(obj.rating)].map((e, i) => (
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
                    </p>
                  </div>
                  <div className="d-flex">
                    <p style={{ fontWeight: "bold" }}>" {obj.comments} "</p>
                  </div>
                  <div className="d-flex">
                    <p>{obj.date}</p>
                  </div>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default RestaurantView;
