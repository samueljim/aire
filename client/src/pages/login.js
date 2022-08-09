import { useEffect, useState } from "react";

function Page() {
  const [name, setName] = useState(window.localStorage.getItem("name"));
  const removeName = () => {
    window.localStorage.removeItem("name");
    setName("");
  }
  
  const setNameStorage = () => {
    window.localStorage.setItem("name", name);
  };
  return (
    <div className="flex place-content-center h-full">
      <div class="card w-96 bg-base-100 shadow-xl pt-3">
        <div class="card-body">
          <h2 class="card-title">What's your name?</h2>
          <p>Enter your name here to have your scores counted</p>
          <input
            type="text"
            autoFocus={true}
            placeholder="Enter your name"
            class="input w-full input-bordered input-lg max-w-xs"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <div class="card-actions justify-end">
            <button class="btn btn-primary" onClick={removeName}>
              Logout
            </button>
            <button class="btn btn-primary" onClick={setNameStorage}>
              Set name
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
