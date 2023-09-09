"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {};

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export default function ContactMeForm({}: Props) {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) =>
    (window.location.href = `mailto:nelson.javier.aldazabal@gmail.com?subject=${formData.subject}
    &body=Hi, my name is ${formData.name}.%0D%0A${formData.message}%0D%0A%0D%0A(${formData.email})`);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col space-y-2 w-[80vw] md:w-fit mx-auto"
    >
      <div className="flex space-y-2 md:space-y-0 md:space-x-2 flex-col md:flex-row">
        <input
          {...register("name")}
          placeholder="Nombre"
          className="contactInput"
          type="text"
        />
        <input
          {...register("email")}
          placeholder="Email"
          className="contactInput"
          type="email"
        />
      </div>

      <input
        {...register("subject")}
        placeholder="Asunto"
        className="contactInput"
        type="text"
      />

      <textarea
        {...register("message")}
        placeholder="Mensaje"
        className="contactInput"
      />

      <button
        className="bg-[#38bdf8] py-5 px-6 rounded-md text-black font-bold
  text-lg"
        type="submit"
      >
        Enviar
      </button>
    </form>
  );
}
