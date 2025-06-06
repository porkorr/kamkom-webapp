import React from "react";

type UserType = {
  vote?: string;
  role?: string;
};

type QuoteType = {
  id: string;
  text: string;
  votes: number;
};

type QuoteItemProps = {
  user: UserType;
  quote: QuoteType;
  isVoteAllowed: boolean;
  isVoteSelected: boolean;
  totalVotes: number;
  onVote: (quote: QuoteType) => void;
  onDelete: (quote: QuoteType) => void;
};

const QuoteItem: React.FC<QuoteItemProps> = React.memo(
  ({ user, quote, isVoteAllowed, isVoteSelected, totalVotes, onVote, onDelete }) => {
    const percent = totalVotes > 0 ? (quote.votes / totalVotes) * 100 : 0;

    return (
      <div className="quote">
        <div className="quote-detail">
          <div className="detail-title">
            <p>{quote.text}</p>
          </div>

          <div className="quote-actions">
            {isVoteAllowed && (
              <div
                className="action-text action-voting"
                onClick={(e) => {
                  e.stopPropagation();
                  onVote(quote);
                }}
              >
                <p>Vote</p>
              </div>
            )}
            {isVoteSelected && (
              <div className="action-text action-voted">
                <p>Voted</p>
              </div>
            )}
            {user?.role === "admin" && (
              <div
                className="action-text action-delete"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(quote);
                }}
              >
                <p>Delete</p>
              </div>
            )}
          </div>
        </div>

        <div className="quote-total">
          <div className="total-text">
            <div className="text-votes">
              <p>{quote.votes} Votes</p>
            </div>
            <div className="text-percent">
              <p>{percent.toFixed(1)}%</p>
            </div>
          </div>
          <div className="total-progressbar">
            <div className="progressbar" style={{ width: `${percent}%` }}></div>
          </div>
        </div>
      </div>
    );
  }
);

QuoteItem.displayName = "QuoteItem";

export default QuoteItem;
