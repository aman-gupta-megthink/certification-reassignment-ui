import { useEffect, useState } from "react";
import apiClient, { setAuthToken } from "../../api/axiosConfig";
import { getAccessToken } from "../../api/getAccessToken";
import StagedCampaignsCard from "../StagedCampaignsCard/StagedCampaignsCard";
import { StagedCampaigns } from "../../interfaces/stagedCampaign";

const Home = () => {
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [campaignData, setCampaignData] = useState<StagedCampaigns>([]);
    useEffect(() => {
        const fetchAccessToken = async () => {
            try {
                const token = await getAccessToken();
                setAccessToken(token);
                setAuthToken(token);
            } catch (error) {
                console.error('Error fetching access token:', error);
            }
        };

        fetchAccessToken();
    }, []);

    useEffect(()=>{
    const fetchStagedCampaigns=async()=>{
          if (!accessToken) {
            console.error('No access token available');
            return;
        }
          try {
            const response = await apiClient.get<StagedCampaigns>('/v3/campaigns?filters=status eq "STAGED"');
            console.log(response.data);
            setCampaignData(response.data)
          } catch (error) {
            console.error('Error:', error);
          }
        }
        fetchStagedCampaigns()
    },[accessToken])

  return (
    <>
    <StagedCampaignsCard campaignResult={campaignData}/>
    </>
  )
}

export default Home