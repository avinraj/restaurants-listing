import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./homepage.css";
import React from "react";
import image from "../../images/Malamal Gosht Biryani (2).jpg";
import places from "../../Data/places";
const Homepage = () => {
  let history = useHistory();
  const data = useSelector((state) => state.restaurants.value);
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
  const handleChange = (e) => {
    if (e.target.value === "Choose place" || null) {
      return;
    } else {
      const placeObj = places.filter((obj) => {
        return obj.id === parseInt(e.target.value, 10);
      });
      let results = data.restaurants.map((obj) => {
        let distance = getDistanceFromLatLng(
          placeObj[0].lat,
          placeObj[0].long,
          obj.latlng.lat,
          obj.latlng.lng
        );
        if (distance) {
          return obj;
        }
        return null;
      });
      if (results.length) {
        results = results.filter(function (data) {
          return data != null;
        });
        history.push({
          pathname: "/searchResult",
          state: { data: results },
        });
      }
    }
  };
  function getDistanceFromLatLng(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) {
      return deg * (Math.PI / 180);
    }
    function square(x) {
      return Math.pow(x, 2);
    }
    var r = 6371;
    lat1 = deg2rad(lat1);
    lat2 = deg2rad(lat2);
    var lat_dif = lat2 - lat1;
    var lng_dif = deg2rad(lng2 - lng1);
    var a =
      square(Math.sin(lat_dif / 2)) +
      Math.cos(lat1) * Math.cos(lat2) * square(Math.sin(lng_dif / 2));
    var d = 2 * r * Math.asin(Math.sqrt(a));
    if (d <= 5) {
      return true;
    } else return false;
  }
  return (
    <div>
      <div className="d-flex justify-content-center searchSelect">
        <select className="form-select" onChange={handleChange}>
          <option>Choose place</option>
          {places.map(({ name, id }, index) => {
            return (
              <option key={index} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>

      <div className="container" style={{ marginTop: "5%" }}>
        <div className="row row-cols-sm-3">
          {data.restaurants.map(({ name, address, reviews, id }, index) => (
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
export default Homepage;
