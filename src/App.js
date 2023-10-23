import { useState } from "react";

function App() {
  const [userInfo, setUserInfo] = useState([]);

  console.log(userInfo);
  function handleAddUser(newUser) {
    setUserInfo((prev) => [...prev, newUser]);
  }
  return (
    <main>
      <div className="header">
        <h1>Learn to code by watching others</h1>
        <p>
          See how experienced developers solve problems in real-time. Watching
          scripted tutorials is great, but understanding how developers think is
          invaluable.
        </p>
      </div>
      <div>
        <button type className="btn-purple">
          {" "}
          <span>Try it free 7 days </span> then $20/mo. thereafter
        </button>
        <Form onAddUser={handleAddUser} />
      </div>
    </main>
  );
}
function Form({ onAddUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formIsValid, setFormIsValid] = useState(true);
  const [errors, setError] = useState({});

  const id = crypto.randomUUID();

  function handleSubmitUser(e) {
    e.preventDefault();
    const newUser = { id, firstName, lastName, email, password };
    if (!firstName) {
      setFormIsValid(false);
      setError((prev) => ({
        ...prev,
        firstName: "First Name cannot be empty!",
      }));
    }
    if (!lastName) {
      setFormIsValid(false);
      setError((prev) => ({
        ...prev,
        lastName: "Last Name cannot be emty!",
      }));
    }
    if (!email) {
      setFormIsValid(false);
      setError((prev) => ({
        ...prev,
        email: "Look like this is not an email!",
      }));
    }
    if (!password) {
      setFormIsValid(false);
      setError((prev) => ({
        ...prev,
        password: "Password cannot be emty!",
      }));
    }

    onAddUser(newUser);
  }

  return (
    <form onSubmit={handleSubmitUser}>
      <div>
        <Input
          formIsValid={formIsValid}
          value={firstName}
          text="First Name"
          onChange={(e) => setFirstName(e.target.value)}
        />
        {!formIsValid && <Error value={errors["firstName"]} />}
      </div>
      <div>
        <Input
          formIsValid={formIsValid}
          text="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {!formIsValid && <Error value={errors["lastName"]} />}
      </div>
      <div>
        <Input
          type="email"
          formIsValid={formIsValid}
          text="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!formIsValid && <Error value={errors["email"]} />}
      </div>
      <div>
        <Input
          formIsValid={formIsValid}
          text="Password"
          value={password}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!formIsValid && <Error value={errors["password"]} />}
      </div>

      <button className="btn-green" type="submit">
        Claim your free trial
      </button>
      <div>
        <span className="footer-span">
          By clicking the button, you are agreeing to our{" "}
          <span>Terms and Services</span>
        </span>
      </div>
    </form>
  );
}
function Input({ formIsValid, type = "text", onChange, value = "", text }) {
  return (
    <input
      className={!formIsValid ? "error" : ""}
      type={type}
      placeholder={formIsValid ? `${text}` : ""}
      value={value}
      onChange={onChange}
    />
  );
}

function Error({ value }) {
  return (
    <div className="error-group">
      <span className="error-icon">
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <circle fill="#FF7979" cx="12" cy="12" r="12" />
            <rect fill="#FFF" x="11" y="6" width="2" height="9" rx="1" />
            <rect fill="#FFF" x="11" y="17" width="2" height="2" rx="1" />
          </g>
        </svg>
      </span>
      <span className="err-message">{value}</span>
    </div>
  );
}

export default App;
