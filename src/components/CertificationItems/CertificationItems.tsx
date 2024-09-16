import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/axiosConfig";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import ReassignmentButton from "../ReassignmentButton/ReassignmentButton";
import {
    AccessItems,
  IdentitySummary,
} from "../../interfaces/accessItemsResponse";
import ReassignmentModal2 from "../ReassignmentModal/ReassignmentModal2";
import { Identity } from "../../interfaces/identities";
import { toast, ToastContainer } from "react-toastify";
import SeeAccessItemsButton from "../SeeAccessItemsButton/SeeAccessItemsButton";

const CertificationItems = () => {
  const { id } = useParams<{ id: string }>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [identities, setIdentities] = useState<IdentitySummary[]>([]);
  const [selectedItemDetail, setSelectedItemDetail] =
    useState<IdentitySummary>();
  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const response = await apiClient.get<AccessItems>(
          `/v3/certifications/${id}/access-review-items`
        );
        const uniqueIdentities = response.data
          .map((item) => item.identitySummary)
          .filter(
            (value, index, self) =>
              index === self.findIndex((t) => t.identityId === value.identityId)
          );

        setIdentities(uniqueIdentities);
        console.log(identities);
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };
    fetchItemDetail();
  }, [id]);

  const handleReassignment = (item: IdentitySummary) => {
    setSelectedItemDetail(item);
    setModalOpen(true);
    console.log(selectedItemDetail);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = async (
    reassignTo: Identity | null | undefined,
    reason: string
  ) => {
    if (!selectedItemDetail || !reassignTo) {
      console.error("Selected Item detail or reassignTo is missing.");
      return;
    }

    const requestBody = {
      reassign: [
        {
          id: selectedItemDetail.id,
          type: "IDENTITY_SUMMARY",
        },
      ],
      reassignTo:reassignTo.id,
      reason: reason,
    };
    try {
        const response = await apiClient.post(
          `v3/certifications/${id}/reassign`,
          requestBody
        );
        console.log("Reassignment successful:", response.data);
        toast.success("Reassignment successful!");  
        setModalOpen(false); // Close the modal after successful reassignment
      } catch (error) {
        console.error("Reassignment failed:", error);
        toast.error("Reassignment failed. Please try again.");
      }
  };

  return (
    <>
      <h1>Identities</h1>
      <Grid container spacing={2}>
        {identities.map((identity) => (
          <Grid item xs={12} sm={6} md={4} key={identity.identityId}>
            <Card>
              <CardContent>
                <Typography variant="h6">{identity.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Identity ID: {identity.identityId}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Completed: {identity.completed ? "Yes" : "No"}
                </Typography>
                <Box display="flex" justifyContent="flex-end" marginTop={2}>
                  <ReassignmentButton
                    onReassign={() => handleReassignment(identity)}
                  />
                  <SeeAccessItemsButton id={identity.id} certificationId={id}/>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <ReassignmentModal2
          open={modalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          selectedItemDetail={selectedItemDetail}
        />
      </Grid>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default CertificationItems;
