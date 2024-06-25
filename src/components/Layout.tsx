"use client";

import { CloudArrowUpIcon, PhotoIcon } from "@heroicons/react/16/solid";
import { ReactNode, useState } from "react";
import ConnectWalletComponent from "./ConnectWalletComponent";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        //@ts-ignore
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 mx-2"
    >
      <header className="p-4 bg-primary-light dark:bg-primary-dark text-white flex flexp-row">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <label
              className="flex flex-row rounded-full  text-white p-2 cursor-pointer transition-colors duration-300 hover:bg-slate-500"
              htmlFor="backgroundImageInput"
            >
              Background
              <PhotoIcon className="ml-4 w-6 h-6" />
            </label>
            <input
              id="backgroundImageInput"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>
        <ConnectWalletComponent />
      </header>
      <main className="flex-grow container mx-2">{children}</main>
    </div>
  );
};

export default Layout;
