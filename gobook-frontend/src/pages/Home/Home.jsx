import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import HeaderCarousel from "../../components/HeaderCarousel/HeaderCarousel";
import BookTicketForm from "../../components/BookTicketForm/BookTicketForm";
import Footer from "../../components/Footer/Footer";
import Chatbot from "../Chatbot/Chatbot";
import TopRoutes from "../../components/TopRoutes.jsx/TopRoutes";


const Home = () => {
  return (
    <>
      <Navbar />
      <HeaderCarousel />
      <BookTicketForm />
      <Chatbot/>
      <TopRoutes/>
      <Footer/>
    </>
  );
};

export default Home;

