import React from 'react';
import { useFormContext } from '../context/FormContext';

const SearchResults = () => {
  const { searchResults, transactionData } = useFormContext();

  // Function to calculate profit or loss
  const calculateProfitLoss = (quantity, purchasePrice, currentPrice) => {
    const qty = Number(quantity);
    const buyPrice = Number(purchasePrice);
    const currPrice = Number(currentPrice);
    return ((currPrice - buyPrice) * qty).toFixed(2);
  };

  return (
    <>
     <div class="stock-market">
      <h3>Stock List</h3>
     </div>
      {searchResults.length === 0 ? (
         <div class="stock-market">
            <p>No stock added yet</p>
         </div>
      ) : (
        <div class="stock-details">
          {searchResults.map((result, index) => {
            const globalQuote = result["Global Quote"];
            if (!globalQuote) {
              return (
                <li key={index}>
                  <h4>Data not available</h4>
                </li>
              );
            }
            const symbol = globalQuote["01. symbol"];
            const price = globalQuote["05. price"];

            // Format the data to 2 decimal places
            const formattedPrice = parseFloat(price).toFixed(2);

            return (
              <div className='card' key={index}>
                <p>Symbol:{symbol}</p>
                <p>Price: ${formattedPrice}</p>

                {/* Display transaction data (quantity, purchasePrice, currentPrice) */}
                {transactionData.map((transaction, idx) => (
                  transaction.symbol === symbol && (
                    <div key={idx}>
                      <p>Quantity: {transaction.quantity}</p>
                      <p>Purchase Price: ${transaction.purchasePrice}</p>
                      <p>Current Price: ${transaction.currentPrice}</p>

                      {/* Profit/Loss Calculation */}
                      <p  className={
                          calculateProfitLoss(
                            transaction.quantity,
                            transaction.purchasePrice,
                            transaction.currentPrice
                          ) >= 0
                            ? "profitPrice"
                            : "lossPrice"
                        }>
                        <strong>Profit/Loss:</strong> $
                        {calculateProfitLoss(
                          transaction.quantity,
                          transaction.purchasePrice,
                          transaction.currentPrice
                        )}
                      </p>
                    </div>
                  )
                ))}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default SearchResults;
