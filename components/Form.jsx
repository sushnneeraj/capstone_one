import React, { useState, useEffect, useCallback } from 'react';
import { useFormContext } from '../context/FormContext';

const FormWithFetch = () => {
  const [formData, setFormData] = useState({
    symbol: '',
    quantity: '',
    purchasePrice: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const { addSearchResult, addTransactionData } = useFormContext();
  const fetchData = useCallback(async () => {
    if (!isFormSubmitted) return;

    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${formData.symbol}&apikey=7QZJB5LVMZA0QUS4`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log('API Data:', data);
        addSearchResult(data);
        addTransactionData({
          symbol: formData.symbol,
          quantity: formData.quantity,
          purchasePrice: formData.purchasePrice,
          currentPrice: data['Global Quote']['05. price'],
        });
        setSuccessMessage('Form submitted successfully!');
        setFormData({
          symbol: '',
          quantity: '',
          purchasePrice: '',
        });
      } else {
        throw new Error('Failed to submit the form');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
      setIsFormSubmitted(false);
    }
  }, [isFormSubmitted, formData.symbol, formData.quantity, formData.purchasePrice, addSearchResult, addTransactionData]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccessMessage('');
    setIsFormSubmitted(true);
  };
// Hide the success message after 5 seconds using useEffect
useEffect(() => {
  if (successMessage) {
    const timer = setTimeout(() => {
      setSuccessMessage('');
    }, 5000);

    // Cleanup the timeout when the component unmounts or the message changes
    return () => clearTimeout(timer);
  }
}, [successMessage]); // Only run when successMessage changes

  return (
    <>
      <form className='stock-form' onSubmit={handleSubmit}>
        <div className="placeholder">
          <input
            type="text"
            id="symbol"
            placeholder="Stock Symbol"
            name="symbol"
            value={formData.symbol}
            onChange={(e) => setFormData({ ...formData, symbol: e.target.value })}
            required
          />
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            required
          />
          <input
            type="number"
            id="purchasePrice"
            name="purchasePrice"
            placeholder="Purchase Price"
            value={formData.purchasePrice}
            onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })}
            required
          />
        </div>
        <button className='button' type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add Stock'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </>
  );
};

export default FormWithFetch;
