import React from "react";

const Page = () => {
  return (
    <div>
      <div>
        <h1>sign up</h1>
        <form>
          <div>
            <label>name</label>
            <input type="text" />
          </div>
          <div>
            <label>email</label>
            <input type="email" />
          </div>
          <div>
            <label>create password</label>
            <input type="password" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
