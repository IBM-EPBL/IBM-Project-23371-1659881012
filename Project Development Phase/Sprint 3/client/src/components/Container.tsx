import React from "react";

import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

function Container({ children }: Props) {
  return (
    <div className="w-full min-h-screen flex flex-col gap-10 items-center">
      <Header />
      <main className="w-full">{children}</main>
    </div>
  );
}

export default Container;
