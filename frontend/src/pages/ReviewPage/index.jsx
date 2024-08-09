import React, { useState, useEffect } from 'react';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const savedReviews = JSON.parse(localStorage.getItem('reviews'));
    if (savedReviews) {
      setReviews(savedReviews);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);
  
  const handleReviewSubmit = (review) => {
    const newReview = {
      ...review,
      Time: new Date().toLocaleString(),
    };
    setReviews([newReview, ...reviews]); 
  };

  const handleOpenPopup = () => {
    const newWindow = window.open('', 'Make a review', 'width=400,height=400');
    newWindow.document.title = 'Make a review';
    newWindow.document.body.innerHTML = `
      <div class='popup'>
        <div class='popup-content'>
          <h2>Make a review</h2>
          <form onsubmit='event.preventDefault(); handleReviewSubmit(); window.close();'>
            <div class='input-container'>
              <label for='name'>Product name:</label>
              <input type='text' id='name' class='form-textarea' required>
            </div>
            <div class='input-container'>
              <label for='comment'>comment:</label>
              <textarea id='comment' class='form-textarea' required></textarea>
            </div>
            <div className='input-container'>
              <label htmlFor='rating'>rating(0~5):</label>
              <input type='number' id='rating' className='form-input' min='0' max='5' step='0.5' required />
            </div>
            <div class='button-container'>
              <button type='submit' class='form-button' onclick='handleReviewSubmit(); window.close();'>Submit</button>
              <button type='button' onclick='window.close();' class='form-button'>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;

    newWindow.handleReviewSubmit = () => {
      const name = newWindow.document.getElementById('name').value;
      const comment = newWindow.document.getElementById('comment').value;
      const rating = newWindow.document.getElementById('rating').value;
      handleReviewSubmit({ name, comment, rating });
    };
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= fullStars) {
        stars.push(<span key={i}>★</span>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<span key={i}>½★</span>);
      } else {
        stars.push(<span key={i}>☆</span>);
      }
    }

    return stars;
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredReviews = reviews.filter((review) =>
    review.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = filteredReviews.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className='review-page container'>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <div style={{ flex: 1 }}>
        <h1 style={{ textAlign: 'center', fontSize: '30px' }}>✨Ratings & Reviews✨</h1>
          <hr style={{ margin: '20px' }} />
          <div id='reviewList'>
            {currentReviews.map((review, index) => (
              <div key={index} className='review'>
                <h2>Product Name: {review.name}</h2>
                <p>Details: {review.comment}</p>
                <p>{renderStars(review.rating)}</p>
                <p>Date created: {review.Time}</p>
                <p>--------------------------------</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            {filteredReviews.length > itemsPerPage && (
              <div>
                <button
                  style={{
                    borderRadius: '5px',
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    fontSize: '14px',
                    marginRight: '10px',
                  }}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous Page
                </button>
                <button
                  style={{
                    borderRadius: '5px',
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    padding: '5px 10px',
                    fontSize: '14px',
                  }}
                  disabled={indexOfLastItem >= filteredReviews.length}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next Page
                </button>
              </div>
            )}
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h1 style={{ textAlign: 'center', fontSize: '30px' }}>!!Leave a review!!</h1>
          <hr style={{ margin: '20px' }} />
          <button
            style={{
              borderRadius: '5px',
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              padding: '5px',
              fontSize: '18px',
            }}
            onClick={handleOpenPopup}
            className='open-popup-button'
          >
            Make a review
          </button>
          <div className='search-container'>
            <input
              type='text'
              id='searchInput'
              value={searchQuery}
              onChange={handleSearch}
              placeholder='Search Product Name.'
              style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '5px', marginTop: '10px' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewPage;