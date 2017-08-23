/* 
DEALS
const getDealsUrl = 'http://10.9.9.54:8008/getAllDeals';
const knowMoreURL = 'http://10.9.9.54:8008/deal/{dealUuid}/interest/{userEmail}/';
//http://localhost:8008/deal/{dealUuid}/interest/{userUuid}?userUuid=abcd1234&dealUuid=057435da-d82c-4eca-b09e-3031aa1ac7ca
const investURL = 'http://10.9.9.54:8008/deal/{dealUuid}/investment/{userEmail}/{amount}/';
const fundingStatusURL = 'http://10.9.9.54:8008/getFundingStatus?dealUuid=';
const getDealURL = 'http://10.9.9.54:8008/deal?dealId=';

EVENTS
const eventUrl = 'http://10.9.9.54:8001/getAllEvents'
const eventDetailUrl = 'http://10.9.9.54:8001/event?eventId=';

NEWS
const newsUrl = 'http://10.9.9.54:8000/getAllNews';
const newsDetailUrl = 'http://10.9.9.54:8000/newsItem?newsId=';

LINKEDIN
const sendAuthCode = 'http://10.9.9.54:8080/authcode/?code=';
const redirectUrl = 'http://10.9.9.54:8080/loginstatus';
https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=81hcrkktl6101f&redirect_uri='+redirectUrl+'&state=997654321&scope=r_basicprofile%20r_emailaddress%20w_share'

*/
const host = 'http://10.9.8.182:';
exports.config = {
    dealUrl: host+'9008/deal/',
    eventUrl: host+'9010/event/',
    newsUrl: host+'8011/news/',
    loginUrl: host+'8012/login/'
}