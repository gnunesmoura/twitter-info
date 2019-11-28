const {
  haveExactTag,
  searchParams,
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
});
