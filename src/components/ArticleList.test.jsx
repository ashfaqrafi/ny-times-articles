import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ArticleList from './ArticleList';
import { fetchArticles } from '../services/api';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the `fetchArticles` function from the api service
jest.mock('../services/api', () => ({
  fetchArticles: jest.fn(),
}));

describe('ArticleList Component', () => {
  it('should show loading spinner initially', () => {
    fetchArticles.mockResolvedValueOnce({ data: { results: [] } });
    render(
      <Router>
        <ArticleList />
      </Router>,
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should display articles after loading', async () => {
    const articles = [
      { id: 1, title: 'Article 1', byline: 'Author 1', published_date: '2021-01-01' },
      { id: 2, title: 'Article 2', byline: 'Author 2', published_date: '2021-02-02' },
    ];
    fetchArticles.mockResolvedValueOnce({ data: { results: articles } });

    render(
      <Router>
        <ArticleList />
      </Router>,
    );

    await waitFor(() => {
      articles.forEach((article) => {
        expect(screen.getByText(article.title)).toBeInTheDocument();
        expect(screen.getByText(article.byline)).toBeInTheDocument();
        expect(screen.getByText(article.published_date)).toBeInTheDocument();
      });
    });
  });

  it('should display an error message if the fetch fails', async () => {
    const errorMessage = 'Failed to fetch';
    fetchArticles.mockRejectedValueOnce(new Error(errorMessage));

    render(
      <Router>
        <ArticleList />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText(`Error loading articles: ${errorMessage}`)).toBeInTheDocument();
    });
  });

  it('should display "No articles found." if no articles are returned', async () => {
    fetchArticles.mockResolvedValueOnce({ data: { results: [] } });

    render(
      <Router>
        <ArticleList />
      </Router>,
    );

    await waitFor(() => {
      expect(screen.getByText('No articles found.')).toBeInTheDocument();
    });
  });
});
