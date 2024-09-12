import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import {
  CampaignCertification,
  CampaignCertifications,
} from "../../interfaces/campaignCertifications";
import { useEffect, useState } from "react";
import apiClient from "../../api/axiosConfig";
import ReassignmentButton from "../ReassignmentButton/ReassignmentButton";
import ReassignmentModal from "../ReassignmentModal/ReassignmentModal";
import { Identity } from "../../interfaces/identities";
import SeeCertificationItemsButton from "../SeeCertificationItemsButton/SeeCertificationItemsButton";

const CampaignDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [campaignDetail, setCampaignDetail] = useState<
    CampaignCertifications | []
  >([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCampaignDetail, setSelectedCampaignDetail] = useState<
    CampaignCertification | undefined
  >();

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

  const handleReassignment = (item: CampaignCertification) => {
    setSelectedCampaignDetail(item);
    setModalOpen(true);
    console.log(modalOpen);
    console.log(selectedCampaignDetail);
  };

  const handleSeeItems= async (item:CampaignCertification)=>{
    setSelectedCampaignDetail(item);
    const response=await apiClient.get(`/v3/certifications/${item.id}/access-review-items`)
    console.log(item)
    console.log(response.data);
  }

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = async (
    reassignTo: Identity | null | undefined,
    reason: string
  ) => {
    if (!selectedCampaignDetail || !reassignTo) {
      console.error("Selected campaign detail or reassignTo is missing.");
      return;
    }

    const requestBody = {
      certificationIds: [selectedCampaignDetail.id],
      reassignTo: {
        id: reassignTo.id,
        type: "IDENTITY",
      },
      reason: reason,
    };

    try {
      const response = await apiClient.post(
        `/v3/campaigns/${id}/reassign`,
        requestBody
      );
      console.log("Reassignment successful:", response.data);
      setModalOpen(false); // Close the modal after successful reassignment
    } catch (error) {
      console.error("Reassignment failed:", error);
    }
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
                  <ReassignmentButton
                    onReassign={() => handleReassignment(item)}
                  />
                  <SeeCertificationItemsButton onSeeItems={()=>handleSeeItems(item)}/>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      <ReassignmentModal
        open={modalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        selectedCampaignDetail={selectedCampaignDetail}
      />
    </Grid>
  );
};

export default CampaignDetail;
