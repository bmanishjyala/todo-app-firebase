import React from "react";
import { useState, useEffect } from "react";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newtodo, setnewtodo] = useState("");
  const [data, setData] = useState([]);
  const userCollectionRef = collection(db, "todo");
  var date = new Date();

  const createTodo = async () => {
    await addDoc(userCollectionRef, {
      todo: newtodo,
      timeStamp: date.toLocaleTimeString(),
    });
    document.getElementById("validationCustom01").value='';
    document.getElementById("btn").style.display = "none";
  };
  const deleteUser = async (id) => {
    const userDoc = doc(db, "todo", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(userCollectionRef);
      setData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getData();
  });
  return (
    <>
      <nav className="navbar navbar-dark bg-dark px-2">
        <a className="navbar-brand" href="#">
          ToDo App
        </a>
        <div className="float-end">
         
          <button
            type="button"
            className="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Contact Info 
          </button>

          <div
            className="modal fade"
            id="exampleModal"
           
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Developer Info
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h5>
                    <strong>Developed by:-</strong>Manish Jyala
                  </h5>

                  <div className="d-flex justify-content-around px-3 ">
                   <a className="mx-1" href="https://github.com/bmanishjyala"><h2 >
                      <i className="fab fa-github"></i>
                    </h2></a> 
                   <a className="mx-1" href="mailto:bmanishjyala@gmail.com"><h2 >
                      <i className="fab fa-google"></i>
                    </h2></a> 
                   <a className="mx-1" href="https://www.instagram.com/jyalamani/"><h2 >
                      <i className="fab fa-instagram"></i>
                    </h2></a> 
                   <a  className="mx-1" href="https://www.linkedin.com/in/manish-jyala-4bb3b3131/"><h2 >
                      <i className="fab fa-linkedin-in"></i>
                    </h2></a> 
                   
                    
                    
                    
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="container  py-4">
        <div className="mb-5">
          <label className="form-label">Enter Todo</label>
          <input
            type="text"
            className="form-control shadow p-3 mb-2 bg-white rounded"
            id="validationCustom01"
            aria-describedby="emailHelp"
            onChange={(event) => {
              document.getElementById("btn").style.display = "inline";
              setnewtodo(event.target.value);
            }}
            required
          />

          <div id="emailHelp" className="form-text text-center">
            Fill the bucket with the things you want to do
          </div>
          <div className="float-end">
            <button
              type="submit"
              id="btn"
              style={{ display: "none" }}
              onClick={() => {
                createTodo();
              }}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="card px-2 py-4  shadow p-3 mb-5 bg-white rounded">
          {data.map((e) => {
            return (
              <>
                <div
                  className=" alert my-2 alert-warning alert-dismissible fade show container"
                  role="alert"
                >
                  <strong>{e.todo}</strong>

                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => {
                      deleteUser(e.id);
                    }}
                  ></button>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default App;
