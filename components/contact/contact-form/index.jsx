import { useState, useEffect } from "react";

import Notification from "../../ui/notification";

import classes from "./contact-form.module.css";

async function sendContactData(contactDetails) {
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(contactDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response?.ok) {
      console.log(data.message);
      throw new Error(data.message || "Something went wrong");
    }
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Something went wrong");
  }
}

function ContactForm() {
  const [formInputValues, setFormInputValues] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [requestStatus, setRequestStatus] = useState(); // 'pending', 'success', 'error', null
  const [requestError, setRequestError] = useState();

  const { email, name, message } = formInputValues;

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [requestStatus]);

  function onChangeHandler({ target: { name, value } }) {
    setFormInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function sendMessageHandler(event) {
    event.preventDefault();

    try {
      setRequestStatus("pending");
      await sendContactData(formInputValues);
      setRequestStatus("success");
      setFormInputValues({
        email: "",
        name: "",
        message: "",
      });
    } catch (error) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError || "Something went wrong!",
    };
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
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
