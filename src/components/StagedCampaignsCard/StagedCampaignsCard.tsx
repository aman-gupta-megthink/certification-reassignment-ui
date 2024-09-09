import { Box, Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { StagedCampaigns } from "../../interfaces/stagedCampaign"
import { useEffect, useState } from "react";
import DetailButton from "../DetailButton/DetailButton";

interface StagedCampaignsCardProps{
  campaignResult:StagedCampaigns
}

const StagedCampaignsCard:React.FC<StagedCampaignsCardProps>= ({campaignResult}) => {

  const [data, setData] = useState(campaignResult);
  const [isAscending, setIsAscending] = useState(true);

  useEffect(()=>{
    setData(campaignResult)
  },[campaignResult])

  const sortByDateCreated = () => {
    const sortedData = [...campaignResult].sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
      return isAscending ? dateA - dateB : dateB - dateA;
    });
    setData(sortedData);
    setIsAscending(!isAscending);
  };

  const isDeadlinePassed = (deadline: string): boolean => {
    return new Date(deadline).getTime() < new Date().getTime();
  };

  return (
    <Box padding={2}>
      <Box display="flex" justifyContent="flex-end" marginBottom={2}>
        <Button variant="contained" onClick={sortByDateCreated}>
          Sort by Date Created ({isAscending ? 'Ascending' : 'Descending'})
        </Button>
      </Box>
    <Grid container spacing={2}>
      {data.map((item) => (
        <Grid item xs={12} key={item.id}>
          <Card >
            <CardContent>
              <Typography variant="h6" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                {item.description}
              </Typography>
              <Box display="flex" justifyContent="space-between" marginBottom={1}>
              <Typography
                  variant="body2"
                  color={isDeadlinePassed(item.deadline) ? 'error' : 'primary'}
                  align="right"
                >
                  {isDeadlinePassed(item.deadline) ? 'Deadline Passed' : 'Preview Ready'}
                </Typography>
              <Typography variant="body2">
                <strong>Deadline:</strong> {new Date(item.deadline).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                <strong>Type:</strong> {item.type}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {item.status}
              </Typography>
              <Typography variant="body2">
                <strong>Created Date:</strong>{new Date(item.created).toLocaleString()}
              </Typography>
              </Box>
              <Box display="flex" justifyContent="flex-end" marginTop={2}>
              <DetailButton id={item.id}/>
                </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
  )
}

export default StagedCampaignsCard