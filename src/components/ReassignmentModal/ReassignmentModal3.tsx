import React, { useCallback, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import apiClient from "../../api/axiosConfig";
import { Identites, Identity } from "../../interfaces/identities";
import debounce from "lodash.debounce";
import { AccessItem } from "../../interfaces/accessItemsResponse";

interface ReassignmentModal3Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (reassignTo: Identity | null | undefined, reason: string) => void;
  selectedAccessItem:AccessItem | undefined
}

const ReassignmentModal3: React.FC<ReassignmentModal3Props> = ({
  open,
  onClose,
  onSubmit,
  selectedAccessItem
}) => {
  const [reassignTo, setReassignTo] = useState<Identity | null | undefined>();
  const [reason, setReason] = useState<string>("");
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<Identites>([]);

  useEffect(() => {
    if (open) {
      fetchOptions("");
    }
  }, [open]);

  const fetchOptions = async (query: string) => {
    try {
      const response = await apiClient.get<Identites>(
        `/v3/public-identities?limit=100&add-core-filters=true&sorters=name&filters=firstname sw "${query}" or lastname sw "${query}" or email sw "${query}"`
      );
      setOptions(response.data);
    } catch (error) {
      console.error("Failed to fetch identites", error);
    }
  };

  const debouncedFetchOptions = useCallback(
    debounce((query: string) => {
      fetchOptions(query);
    }, 300), // Adjust debounce time as needed
    []
  );

  const handleInputChange = (event: React.SyntheticEvent, value: string) => {
    setSearchValue(value);
    debouncedFetchOptions(searchValue);
  };

  const handleSubmit = () => {
    onSubmit(reassignTo, reason);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="reassignment-modal-title"
      aria-describedby="reassignment-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="reassignment-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
        >
          Reassign Certification
        </Typography>
        <Typography
          id="reassignment-modal-subtitle"
          variant="h6"
          component="h2"
        >
          AccessItem: {selectedAccessItem?.accessSummary.access.name}
        </Typography>
        <Autocomplete
          disablePortal
          onInputChange={handleInputChange}
          options={options}
          onChange={(event, value) => setReassignTo(value)}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} fullWidth label="Select new Reviewer" />
          )}
        />
        <TextField
          fullWidth
          label="Reason for reassignment"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          margin="normal"
          multiline
          rows={4}
        />
        <Box mt={2} textAlign="right">
          <Button onClick={handleCancel} variant="contained" color="error">
            cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            sx={{ ml: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ReassignmentModal3;
