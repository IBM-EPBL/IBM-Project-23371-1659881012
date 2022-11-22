import React from "react";

const Card = ({ children, title }: { children: any; title: string }) => {
  return (
    <section className=" p-8 bg-primary border border-border border-opacity-20 rounded-3xl flex flex-col gap-2 items-center justify-between shadow-lg">
      {children}
      <h2 className="text-xl font-semibold">{title}</h2>
    </section>
  );
};

export default Card;
