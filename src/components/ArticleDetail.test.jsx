import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArticleDetail from './ArticleDetail';
import { fetchArticles } from '../services/api';
import { useParams } from 'react-router-dom';

// Mocking the necessary modules
jest.mock('../services/api');
jest.mock('../components/Spinner', () => () => <div>Spinner</div>);
jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

describe('ArticleDetail Component', () => {
  const mockArticle = {
    id: '7',
    title: 'Test Article',
    abstract: 'Test Abstract',
    byline: 'By Tester',
    published_date: '2024-01-01',
    url: 'http://example.com/test-article',
    media: [
      {
        'media-metadata': [{}, {}, { url: 'http://example.com/image.jpg' }],
      },
    ],
  };

  beforeEach(() => {
    fetchArticles.mockClear();
    useParams.mockImplementation(() => ({ id: '7' }));
  });

  test('renders spinner while loading', async () => {
    fetchArticles.mockResolvedValueOnce({ data: { results: [mockArticle] } });
    render(<ArticleDetail />);
    expect(screen.getByText('Spinner')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(mockArticle.title)).toBeInTheDocument());
  });

  test('displays the article when found', async () => {
    fetchArticles.mockResolvedValueOnce({ data: { results: [mockArticle] } });
    render(<ArticleDetail />);
    await waitFor(() => {
      expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.abstract)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.byline)).toBeInTheDocument();
      expect(screen.getByRole('img', { name: mockArticle.title })).toHaveAttribute(
        'src',
        'http://example.com/image.jpg',
      );
    });
  });

  test('displays error message when article not found', async () => {
    fetchArticles.mockResolvedValueOnce({ data: { results: [] } }); // No articles returned
    render(<ArticleDetail />);
    await waitFor(() => {
      expect(screen.getByText('Error: Article not found')).toBeInTheDocument();
    });
  });

  test('displays error message on fetch failure', async () => {
    const errorMessage = 'Network Error';
    fetchArticles.mockRejectedValueOnce(new Error(errorMessage));
    render(<ArticleDetail />);
    await waitFor(() => {
      expect(screen.getByText(`Error: Error fetching article: ${errorMessage}`)).toBeInTheDocument();
    });
  });
});
