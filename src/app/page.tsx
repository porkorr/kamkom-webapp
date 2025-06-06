"use client";

import QuotesList from "@/components/QuotesList";
import FormAddNewQuote from "@/components/FormAddNewQuote";
import useFirestore from "@/hooks/useFirestore";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const { user } = useFirestore();

  return (
    <>
      <Header />
      <div className="main-container">
        <div className="main-quote-title">
          <h2>Vote Kamkom</h2>
          <p>Pick the quote that speaks to you — just one vote allowed.</p>
        </div>
        <QuotesList />
        {user?.role === "admin" && <FormAddNewQuote />}
      </div>
      <Footer />
    </>
  );
};

export default Home;
