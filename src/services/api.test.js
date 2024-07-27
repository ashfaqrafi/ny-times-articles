import axios from 'axios';
import { fetchArticles } from './api';

jest.mock('axios');

describe('fetchArticles', () => {
  const mockedResponse = {
    data: {
      results: [
        {
          title: 'title1',
          url: 'url1',
          publishedAt: '2019-05-30T14:16:28Z',
          description: 'description1',
          author: 'author1',
        },
      ],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches articles with the correct URL and API key', async () => {
    axios.get.mockResolvedValue(mockedResponse);

    const period = 7;
    const expectedUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=3JKNpjDNxYVT2KvgKSKuqxqCWWkFgQfL`;

    await fetchArticles(period);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl);
  });

  it('returns the fetched articles data', async () => {
    axios.get.mockResolvedValue(mockedResponse);

    const response = await fetchArticles();

    expect(response.data).toEqual(mockedResponse.data);
  });

  it('handles errors gracefully', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    try {
      await fetchArticles();
    } catch (error) {
      expect(error.message).toBe(errorMessage);
    }
  });
});
