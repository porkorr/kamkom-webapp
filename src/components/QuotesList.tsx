"use client";

import { useState, useEffect, useMemo } from "react";
import { Modal, Input, message } from "antd";
import { updateUserVoteFSDB, updateQuoteVoteFSDB, deleteQuoteFSDB } from "@/libs/firebase";
import useFirestore from "@/hooks/useFirestore";
import useDebounce from "@/hooks/useDebounce";
import QuoteItem from "@/components/QuoteItem";
import Loading from "./Loading";

type QuoteType = {
  id: string;
  text: string;
  votes: number;
};

type SortByType = "text" | "votes";
type SortOrderType = "asc" | "desc";

const QuotesList = () => {
  const { user, quotes } = useFirestore();
  const [quote, setQuote] = useState<QuoteType | null>(null);
  const [totalVotes, setTotalVotes] = useState(0);
  const [modalVote, setModalVote] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  const [sortBy, setSortBy] = useState<SortByType>(
    (localStorage.getItem("sortBy") as SortByType) || "text"
  );
  const [sortOrder, setSortOrder] = useState<SortOrderType>(
    (localStorage.getItem("sortOrder") as SortOrderType) || "desc"
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(searchKeyword, 500);

  const hasNoVote = !user?.vote;
  const hasInvalidVote = user?.vote && !quotes.some((q) => q.id === user.vote);
  const isVoteAllowed = !!user?.uid && (hasNoVote || hasInvalidVote);

  const handleVote = (quote: QuoteType) => {
    setQuote(quote);
    setModalVote(true);
  };

  const handleVoteCancel = () => {
    setQuote(null);
    setModalVote(false);
  };

  const handleVoteOk = async () => {
    if (quote && isVoteAllowed) {
      try {
        await updateUserVoteFSDB(user.uid, quote.id);
        await updateQuoteVoteFSDB(quote.id);
        message.success("Voting Done!");
        setModalVote(false);
      } catch (error) {
        // console.error("Vote error", error);
      }
    }
  };

  const handleDelete = (quote: QuoteType) => {
    setQuote(quote);
    setModalDelete(true);
  };

  const handleDeleteCancel = () => {
    setQuote(null);
    setModalDelete(false);
  };

  const handleDeleteOk = async () => {
    if (quote) {
      try {
        await deleteQuoteFSDB(quote.id);
        message.success("Deleted!");
        setModalDelete(false);
      } catch (error) {
        // console.error("Delete error", error);
      }
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [searchKeyword, sortBy, sortOrder]);

  useEffect(() => {
    const total = quotes.reduce((sum, q) => sum + q.votes, 0);
    setTotalVotes(total);
  }, [quotes]);

  const sortedQuotes = useMemo(() => {
    const filtered = quotes.filter((q) =>
      q.text.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    return filtered.sort((a, b) => {
      const fieldA = a[sortBy];
      const fieldB = b[sortBy];

      if (fieldA < fieldB) return sortOrder === "asc" ? -1 : 1;
      if (fieldA > fieldB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [quotes, sortBy, sortOrder, debouncedSearch]);

  const handleSortBy = (value: "text" | "votes") => {
    setSortBy(value);
    localStorage.setItem("sortBy", value);
  };

  const handleSortOrder = (value: "asc" | "desc") => {
    setSortOrder(value);
    localStorage.setItem("sortOrder", value);
  };

  return (
    <>
      <div className="main-filter">
        <div className="filter">
          <div className="filter-sort-by">
            <ul>
              <li
                className={`${sortBy === "text" ? "active" : ""}`}
                onClick={() => handleSortBy("text")}
              >
                text
              </li>
              <li
                className={`${sortBy === "votes" ? "active" : ""}`}
                onClick={() => handleSortBy("votes")}
              >
                votes
              </li>
            </ul>
          </div>
          <div className="filter-sort-order">
            <ul>
              <li
                className={`${sortOrder === "asc" ? "active" : ""}`}
                onClick={() => handleSortOrder("asc")}
              >
                asc
              </li>
              <li
                className={`${sortOrder === "desc" ? "active" : ""}`}
                onClick={() => handleSortOrder("desc")}
              >
                desc
              </li>
            </ul>
          </div>
          <div className="filter-search">
            <Input
              id="searchQuotes"
              name="searchQuotes"
              type="text"
              placeholder="Search quotes..."
              className="custom-search-input"
              autoComplete="off"
              size="large"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
        </div>
        {user?.role ? (
          <div className="voting-power">Voting power : {isVoteAllowed ? 1 : 0}</div>
        ) : (
          <div className="voting-power">Login required to vote</div>
        )}
      </div>
      {isLoading ? (
        <div className="main-quotes-empty">
          <Loading />
        </div>
      ) : sortedQuotes.length !== 0 ? (
        <div className="main-quotes-list">
          {sortedQuotes.map((q, i) => (
            <QuoteItem
              key={i}
              user={user}
              quote={q}
              isVoteAllowed={isVoteAllowed}
              isVoteSelected={user?.vote === q.id}
              totalVotes={totalVotes}
              onVote={handleVote}
              onDelete={handleDelete}
            />
          ))}

          <Modal
            title="Vote Quote"
            open={modalVote}
            onCancel={handleVoteCancel}
            onOk={handleVoteOk}
            centered
            okText="Vote"
            cancelText="Cancel"
            okButtonProps={{
              className: "custom-vote-ok-button",
            }}
            cancelButtonProps={{
              className: "custom-cancel-button",
            }}
          >
            <p>"{quote?.text}"</p>
          </Modal>

          <Modal
            title="Delete Quote"
            open={modalDelete}
            onCancel={handleDeleteCancel}
            onOk={handleDeleteOk}
            centered
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{
              className: "custom-delete-ok-button",
            }}
            cancelButtonProps={{
              className: "custom-cancel-button",
            }}
          >
            <p>"{quote?.text}"</p>
          </Modal>
        </div>
      ) : (
        <div className="main-quotes-empty">
          <p>No Quote</p>
        </div>
      )}
    </>
  );
};

export default QuotesList;
