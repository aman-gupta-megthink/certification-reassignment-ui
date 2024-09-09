import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { CampaignCertifications } from "../../interfaces/campaignCertifications";
import { useEffect, useState } from "react";
import apiClient from "../../api/axiosConfig";
import ReassignmentButton from "../ReassignmentButton/ReassignmentButton";
import ReassignmentModal from "../ReassignmentModal/ReassignmentModal";
import { Identity } from "../../interfaces/identities";

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [campaignDetail, setCampaignDetail] = useState<
    CampaignCertifications | []
  >([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchCampaignDetail = async () => {
      try {
        const response = await apiClient.get<CampaignCertifications>(
          `/v3/certifications?filters=campaign.id eq "${id}" `
        );
        console.log(response.data);
        setCampaignDetail(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCampaignDetail();
  }, [id]);

  const handleReassignment = () => {
    setModalOpen(true);
    console.log(modalOpen);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = (
    reassignTo: Identity | null | undefined,
    reason: string
  ) => {
    console.log("Reassigned to:", reassignTo?.name);
    console.log("Reason for reassignment:", reason);
    // Add your reassignment API call here
  };

  return (
    <Grid container spacing={2}>
      {campaignDetail
        .filter((item) => item.identitiesTotal > 0)
        .map((item) => (
          <Grid item xs={12} key={item.id}>
            <Card sx={{ maxWidth: 600, margin: "20px auto" }}>
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  {item.reviewer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  <strong>total identites:</strong> {item.identitiesTotal}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  marginBottom={1}
                >
                  {item.reassignment && item.reassignment.from && (
                    <Typography variant="body2">
                      <strong>Reassignment From:</strong>{" "}
                      {item.reassignment.from.reviewer.name}
                    </Typography>
                  )}
                </Box>
                <Box display="flex" justifyContent="flex-end" marginTop={2}>
                  <ReassignmentButton onReassign={handleReassignment} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      <ReassignmentModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </Grid>
  );
};

export default CampaignDetail;
