import { useEffect, useState } from "react";
import apiClient from "../../api/axiosConfig";
import { useParams } from "react-router-dom";
import { AccessItem, AccessItems } from "../../interfaces/accessItemsResponse";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import ReassignmentButton from "../ReassignmentButton/ReassignmentButton";
import ReassignmentModal3 from "../ReassignmentModal/ReassignmentModal3";
import { toast, ToastContainer } from "react-toastify";
import { Identity } from "../../interfaces/identities";

const AccessItemsDetails = () => {
  const { certificationId, id } = useParams<{
    certificationId: string;
    id: string;
  }>();
  const [accessItemsDetails, setAccessItemsDetails] = useState<AccessItems>([]);
  const [selectedAccessItemDetail,setSelectedAccessItemsDetails]=useState<AccessItem>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const fetchAccessItems = async () => {
      try {
        const response = await apiClient.get<AccessItems>(
          `/v3/certifications/${certificationId}/access-review-items?filters=identitySummary.id eq "${id}"`
        );
        console.log(response.data);
        setAccessItemsDetails(response.data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching access items:", error);
      }
    };

    fetchAccessItems();
  }, [certificationId, id]); // Add the dependencies

  const handleReassignment = (item: AccessItem) => {
    setSelectedAccessItemsDetails(item);
    setModalOpen(true)
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalSubmit = async (
    reassignTo: Identity | null | undefined,
    reason: string
  ) => {
    if (!selectedAccessItemDetail || !reassignTo) {
      console.error("Selected Item detail or reassignTo is missing.");
      return;
    }

    const requestBody = {
      reassign: [
        {
          id: selectedAccessItemDetail?.id,
          type: "ITEM",
        },
      ],
      reassignTo:reassignTo.id,
      reason: reason,
    };
    try {
        const response = await apiClient.post(
          `v3/certifications/${certificationId}/reassign`,
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
      {accessItemsDetails.map((item) => (
        <Card sx={{ maxWidth: 600, margin: "20px auto", padding: 2 }}>
          <CardContent>
            {item.accessSummary.access.type === "ENTITLEMENT" && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" color="primary">
                    Entitlement Details
                  </Typography>
                  <Divider sx={{ marginBottom: 2 }} />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">Entitlement Name:</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.accessSummary.entitlement?.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">Source Name:</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.accessSummary.entitlement?.sourceName}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {item.accessSummary.access.type === "ACCESS_PROFILE" && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                      Access Profile Details
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Profile Name:</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.accessSummary.accessProfile?.name}
                    </Typography>
                  </Grid>
                  {item.accessSummary.accessProfile?.entitlements.map(
                    (entitlement, index) => (
                      <React.Fragment key={index}>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            Entitlement Name:
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {entitlement.name}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography variant="body1">Source Name:</Typography>
                          <Typography variant="body2" color="textSecondary">
                            {entitlement.sourceName}
                          </Typography>
                        </Grid>
                      </React.Fragment>
                    )
                  )}
                </Grid>
              </>
            )}

            {item.accessSummary.access.type === "ROLE" && (
              <>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="primary">
                      Role Details
                    </Typography>
                    <Divider sx={{ marginBottom: 2 }} />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body1">Role Name:</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {item.accessSummary.role?.name}
                    </Typography>
                  </Grid>
                  {item.accessSummary.role?.accessProfiles.map(
                    (profile, index) => (
                      <React.Fragment key={index}>
                        <Grid item xs={6}>
                          <Typography variant="body1">
                            Access Profile Name:
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {profile.name}
                          </Typography>
                        </Grid>
                        {profile.entitlements.map((entitlement, entIndex) => (
                          <Grid item xs={6} key={entIndex}>
                            <Typography variant="body1">
                              Source Name:
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {entitlement.sourceName}
                            </Typography>
                          </Grid>
                        ))}
                      </React.Fragment>
                    )
                  )}
                </Grid>
              </>
            )}
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <ReassignmentButton onReassign={() => handleReassignment(item)} />
            </Box>
          </CardContent>
        </Card>
      ))}
      <ReassignmentModal3
          open={modalOpen}
          onClose={handleModalClose}
          onSubmit={handleModalSubmit}
          selectedAccessItem={selectedAccessItemDetail}
        />
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

export default AccessItemsDetails;
