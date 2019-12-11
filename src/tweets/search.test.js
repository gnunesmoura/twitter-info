const axios = require('axios');

jest.mock('axios');
axios.create = jest.fn(() => axios);

const {
  haveExactTag,
  searchParams,
  searchByTag,
} = require('./search');


describe('Unity tests of tweets search module', () => {
  test('haveExactTag indicates if the tag exists on the tweet object', () => {
    const tweet = {
      entities: {
        hashtags: [{ text: 'hello' }, { text: 'world' }],
      },
    };
    expect(haveExactTag(tweet, 'world')).toBe(true);
    expect(haveExactTag(tweet, 'helllo')).toBe(false);
  });

  test('searchParams q param must be URL encoded', () => {
    const { params } = searchParams('hello');
    expect(params.q).toBe('%23hello');
  });

  test('searchByTag must return only tweets with the desired hashtag even if the Twitter API returns others', () => {
    const statuse1 = { entities: { hashtags: [{ text: 'world' }] } };
    const statuseSearched = { entities: { hashtags: [{ text: 'openbanking' }] } };
    const response = { data: { statuses: [statuse1, statuseSearched] } };
    axios.get.mockResolvedValue(response);

    return searchByTag('openbanking')
      .then(([statuse, mustBeUndefined]) => {
        expect(statuse).toBe(statuseSearched);
        expect(typeof mustBeUndefined).toBe('undefined');
        expect(axios.get).toBeCalledTimes(1);
      });
  });
});
