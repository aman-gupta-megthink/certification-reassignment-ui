import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface SeeCertificationItemsButtonProps {
    id:string
  }

const SeeCertificationItemsButton:React.FC<SeeCertificationItemsButtonProps> = ({id}) => {
  const navigate=useNavigate();
    const handleSeeItem = () => {
        navigate(`/certification/${id}`);
      };
  return (
    <Button variant="contained" color="primary" onClick={handleSeeItem}>
        SeeItems
    </Button>
  )
}

export default SeeCertificationItemsButton
