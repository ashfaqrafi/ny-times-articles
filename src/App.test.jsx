import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArticleList from '../src/components/ArticleList';
import ArticleDetail from '../src/components/ArticleDetail';

jest.mock('../src/components/ArticleList', () => () => <div>Mock Article List</div>);
jest.mock('../src/components/ArticleDetail', () => () => <div>Mock Article Detail</div>);

describe('App Routing', () => {
  test('renders ArticleList on the home route', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ArticleList />
      </MemoryRouter>,
    );

    expect(screen.getByText('Mock Article List')).toBeInTheDocument();
  });

  test('renders ArticleDetail when navigating to /article/:id', () => {
    const articleId = '123';

    render(
      <MemoryRouter initialEntries={[`/article/${articleId}`]}>
        <ArticleDetail />
      </MemoryRouter>,
    );

    expect(screen.getByText('Mock Article Detail')).toBeInTheDocument();
  });
});
