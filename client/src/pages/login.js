import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
function Page() {
  const [location, setLocation] = useLocation();
  const n = window.localStorage.getItem("name")
  const [name, setName] = useState(n);
  const inputRef = useRef();

  if (n) {
    setLocation('/questions');
  }

  const setNameStorage = () => {
    if (name) {
      window.localStorage.setItem("name", name);
      setLocation("/questions");
    } else {
      inputRef?.current?.classList.add("input-error");
      inputRef?.current?.focus()
    }
  };

  return (
    <div className="flex place-content-center h-full">
      <div className="card w-96 bg-base-100 shadow-xl pt-3">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <p>Enter your name here to have your scores counted</p>
          <input
            type="text"
            ref={inputRef}
            autoFocus={true}
            placeholder="Enter your name"
            className="input w-full input-bordered input-lg max-w-xs"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={setNameStorage}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
