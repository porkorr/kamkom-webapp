"use client";

import QuotesList from "@/components/QuotesList";
import FormAddNewQuote from "@/components/FormAddNewQuote";
import useFirestore from "@/hooks/useFirestore";

const Home = () => {
  const { user } = useFirestore();

  return (
    <div className="main-container">
      <div className="main-quote-title">
        <h2>Vote Kamkom</h2>
        <p>Pick the quote that speaks to you — just one vote allowed.</p>
      </div>
      <QuotesList />
      {user?.role === "admin" && <FormAddNewQuote />}
    </div>
  );
};

export default Home;
