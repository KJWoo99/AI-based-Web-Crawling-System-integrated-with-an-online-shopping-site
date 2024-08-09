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

  const handleDelete = (index) => {
    const updatedReviews = [...reviews];
    updatedReviews.splice(index, 1);
    setReviews(updatedReviews);
  };

  const renderStars = (rating) => {
    const stars = [];
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
                <button
                  style={{
                    borderRadius: '5px',
                    color: 'red',
                    border: '5px solid #ccc',
                    padding: '5px',
                    fontSize: '15px',
                  }}
                  onClick={() => handleDelete(index)}
                  className='form-button'
                >
                  *--Delete--*
                </button>
              </div>
            ))}
          </div>

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
    </section>
  );
};

export default ReviewPage;