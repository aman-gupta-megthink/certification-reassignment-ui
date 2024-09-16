import { Button } from "@mui/material";
import { useNavigate} from "react-router-dom";

interface SeeAccessItemsButtonProps {
    id:string
    certificationId:string | undefined
  }

const SeeAccessItemsButton:React.FC<SeeAccessItemsButtonProps> = ({id, certificationId}) => {
  const navigate=useNavigate();
    const handleSeeItem = async() => {
        navigate(`/certification/${certificationId}/accessItems/${id}`);
      };
  return (
    <Button variant="contained" color="primary" onClick={handleSeeItem}>
        SeeItems
    </Button>
  )
}

export default SeeAccessItemsButton;
