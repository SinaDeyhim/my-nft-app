"use client";

import { CloudArrowUpIcon, PhotoIcon } from "@heroicons/react/16/solid";
import { ReactNode, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [backgroundImage, setBackgroundImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300"
    >
      <header className="p-4 bg-primary-light dark:bg-primary-dark text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">NFT Display App</h1>
          <div className="mt-4">
            <label
              className="inline-block rounded-full  text-white p-2 cursor-pointer transition-colors duration-300 hover:bg-slate-500"
              htmlFor="backgroundImageInput"
            >
              <PhotoIcon className="w-6 h-6" />
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
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="p-4 bg-primary-light dark:bg-primary-dark text-white">
        <div className="container mx-auto text-center">
          &copy; {new Date().getFullYear()} NFT Display App
        </div>
      </footer>
    </div>
  );
};

export default Layout;
