import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticles } from '../services/api';
import Spinner from '../components/Spinner';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadArticleDetails = async () => {
    setLoading(true);
    try {
      const response = await fetchArticles(7);
      const foundArticle = response.data.results.find((article) => article.id.toString() === id);
      if (foundArticle) {
        setArticle(foundArticle);
      } else {
        setError('Article not found');
      }
      setLoading(false);
    } catch (err) {
      setError(`Error fetching article: ${err.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadArticleDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]); // Reload when article ID changes

  if (loading)
    return (
      <div className="flex justify-center align-middle items-center mt-30p">
        <Spinner />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article data!</div>;

  return (
    <div className="container p-3 mx-auto">
      <div data-testid="article-title" className="flex justify-start text-3xl poppins-semibold my-3">
        {article.title}
      </div>
      <img
        data-testid="article-image"
        src={article.media && article.media[0] && article.media[0]['media-metadata'][2].url}
        alt={article.title}
        className="w-full h-auto mb-3"
      />
      <p data-testid="article-description" className="text-xl mb-4">
        {article.abstract}
      </p>
      <p>{article.byline}</p>
      <p className="mb-3">
        <strong>Published:</strong> {article.published_date}
      </p>
      <a
        data-testid="article-read-more"
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        Read more on NYTimes
      </a>
    </div>
  );
};

export default ArticleDetail;
