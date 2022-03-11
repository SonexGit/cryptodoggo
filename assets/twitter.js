const baseTwitterSearchUrl = 'https://api.twitter.com/1.1/search/tweets.json';
const defaultFetchOptions = {
    method: 'GET',
    headers: {
        'Authorization': '',
    },
};

/*
 * This function will call the standard Twitter search API finding non retweeted tweets starting
 * from the date passed in (or today by default if no value is provided) using the keywords passed in.
 *
 * Note: This API call is limiting the language to English only with the 'lang=en' parameter
 */
const getNonRetweetedTweetsByKeywordsAndDate = async (keywords, dateSince = new Date()) => {
    const dateSinceFormatted = `${dateSince.getFullYear()}-${dateSince.getMonth() + 1}-${dateSince.getDate()}`;
    const queryParam = `${keywords} -filter:retweets since:${dateSinceFormatted}`;
    
    console.log('Query Param: ', queryParam);
    // Query Param:  #allstate OR @allstate -filter:retweets since:2019-7-28
  
    const response = await fetch(`${baseTwitterSearchUrl}?q=${encodeURIComponent(queryParam)}&include_entities=0&lang=en`, defaultFetchOptions);
    const responseJson = await response.json();
    return responseJson.statuses;
};

/**
  TEST
**/
import fetchMock from 'fetch-mock';

describe('getNonRetweetedTweetsByKeywordsAndDate', () => {
    afterEach(() => {
        fetchMock.reset();
    });

    it('should get tweets by keyword and date', async () => {
        const mockSearchResponse = {
            statuses: [
                {
                    id: 123,
                    id_str: "123",
                    text: 'test tweet #allstate',
                    created_at: new Date()
                }
            ],
        };
        const keywords = '#allstate OR @allstate';

        fetchMock.mock("begin:" + baseTwitterSearchUrl, {
            status: 200,
            headers: defaultFetchOptions.headers,
            body: mockSearchResponse
        });

        await getNonRetweetedTweetsByKeywordsAndDate(keywords, new Date());
    });
});