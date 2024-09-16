import axios from 'axios';
import config from '../config';
import qs from 'qs'

export const getAccessToken = async () => {
    const tokenUrl=`${config.BASE_URL}/oauth/token`
        const client_id=config.CLIENT_ID
        const client_secret=config.CLIENT_SECRET
        const grant_type= 'client_credentials'
        const requestBody = qs.stringify({
            grant_type,
            client_id,
            client_secret,
          });
    const response = await axios.post(tokenUrl,requestBody,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },});
    return response.data.access_token;
};
