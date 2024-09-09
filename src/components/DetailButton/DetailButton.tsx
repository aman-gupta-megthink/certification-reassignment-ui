import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface DetailButtonProps {
  id: string;
}

const DetailButton: React.FC<DetailButtonProps> = ({ id}) => {
    const navigate=useNavigate();
    const handleClick = () => {
        navigate(`/campaign/${id}`);
      };
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleClick}
    >
      Detail
    </Button>
  );
};

export default DetailButton;
