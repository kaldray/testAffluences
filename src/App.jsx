import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getDatetime } from "./api";
import "./style/style.css";

function App() {
  const { register, handleSubmit } = useForm();
  const [error, setErr] = useState("");

  async function sentForm({ date, hours }) {
    const splitDate = date.split("-");
    const splitHours = hours.split(":");
    const [year, month, day] = splitDate;
    const [h, m, s] = splitHours;
    const dateTime = new Date(year, month, day, h, m, s);
    const apiDate = dateTime.toISOString();
    try {
      const res = await getDatetime(apiDate);
      console.log(res.response.status);
      if (res.response.status == 400) {
        setErr("Votre période est indisponible");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <section>
        <div>
          <form onSubmit={handleSubmit(sentForm)}>
            <input {...register("date")} type="date" name="date" />
            <input {...register("hours")} type="time" name="hours" step="01" />
            <button type="submit">Envoyer</button>
          </form>
          {error && <span>{error} </span>}
        </div>
      </section>
      ;
    </>
  );
}

export default App;
