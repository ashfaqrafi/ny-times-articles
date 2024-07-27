import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchArticles } from '../services/api';
import Spinner from '../components/Spinner';

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchArticles(7);
      setArticles(response.data.results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center align-middle items-center mt-30p">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <p>Error loading articles: {error}</p>;
  }

  return (
    <div>
      <div className="flex justify-center text-3xl p-3 poppins-semibold">NY Times Most Popular Articles</div>
      {articles.length > 0 ? (
        <div className="container mx-auto mt-3 mb-3">
          <div className="flex flex-wrap gap-4">
            {articles.map((article) => (
              <div className="w-full md:w-custom-32 px-2 mb-4 p-4 border border-gray-300 rounded-md" key={article.id}>
                <Link data-testid="article-link" to={`/article/${article.id}`}>
                  <div className="text-lg font-medium">{article.title}</div>
                  <p className="mb-3">{article.byline}</p>
                  <p className="font-light text-sm">{article.published_date}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default ArticleList;
