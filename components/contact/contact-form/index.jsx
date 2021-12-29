import { useState } from "react";

import classes from "./contact-form.module.css";

function ContactForm() {
  const [formInputValues, setFormInputValues] = useState({
    email: "",
    name: "",
    message: "",
  });

  const { email, name, message } = formInputValues;

  function onChangeHandler({ target: { name, value } }) {
    setFormInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function sendMessageHandler(event) {
    event.preventDefault();

    fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(formInputValues),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={onChangeHandler}
              required
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            name="message"
            id="message"
            rows="5"
            value={message}
            onChange={onChangeHandler}
            required
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
    </section>
  );
}

export default ContactForm;
