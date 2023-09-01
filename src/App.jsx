import React, { useState, useEffect } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import image from "./assets/image.jpg";
function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [singleUser, setSingleuser] = useState(null);
  useEffect(() => {
    axios
      .get("https://602e7c2c4410730017c50b9d.mockapi.io/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="spinner-border spinner-border-lg text-primary"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>User List</h1>
      <div className="row">
        <div className="col-md-6 ">
          <div className="row">
            {users.slice(10, 22).map((user, i) => (
              <div key={i} className="mb-3 col-md-6">
                <div className="card">
                  <img
                    src={user.avatar}
                    onError={(e) => {
                      e.target.src = image; // Replace with the placeholder image URL
                      e.target.alt = error; // Set alt text to display the error message
                    }}
                    className="card-img-top w-25 rounded-circle mx-auto"
                    alt={user?.profile?.username}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">
                      {user?.profile?.username
                        ? user?.profile?.username
                        : "No-username"}
                    </h5>

                    <div className="d-flex justify-content-center">
                      <button
                        onClick={() => {
                          setSingleuser(user);
                          console.log(user);
                        }}
                        className="btn btn-primary "
                      >
                        See Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {console.log(singleUser)}
        {singleUser && (
          <div className=" col-md-6 mt-md-5">
            <div
              style={{ maxWidth: "340px", margin: "0px auto" }}
              className="border rounded"
            >
              <p className="text-center">User Details</p>
              <div className="d-flex flex-column justify-content-center">
                <img
                  src={singleUser.avatar}
                  onError={(e) => {
                    e.target.src = image; // Replace with the placeholder image URL
                    e.target.alt = error; // Set alt text to display the error message
                  }}
                  className="card-img-top my-3 mx-auto rounded w-75 "
                  alt={singleUser?.profile?.username}
                />
                <h5 className="card-title text-center">
                  UserName: @
                  {singleUser?.profile?.username
                    ? singleUser?.profile?.username
                    : "No-username"}
                </h5>
                <p className="mx-5 ">
                  {console.log(singleUser?.Bio)}
                  Bio: {singleUser?.Bio ? singleUser?.Bio : "No-Bio "}
                </p>
                <div className="d-flex gap-2 justify-content-center">
                  <span>
                    FirstName:{" "}
                    {singleUser?.profile?.firstName
                      ? singleUser?.profile?.firstName
                      : "No-first name"}
                  </span>
                  <span>
                    LastName:{" "}
                    {singleUser?.profile?.lastName
                      ? singleUser?.profile?.lastName
                      : "No-first name"}
                  </span>
                </div>
                <p className="text-center">
                  Email:
                  {singleUser?.profile?.email
                    ? singleUser?.profile?.email
                    : "No-Email"}{" "}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
