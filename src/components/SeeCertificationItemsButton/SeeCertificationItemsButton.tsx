import { Button } from "@mui/material";

interface SeeCertificationItemsButtonProps {
    onSeeItems: () => void;
  }

const SeeCertificationItemsButton:React.FC<SeeCertificationItemsButtonProps> = ({onSeeItems}) => {
  return (
    <Button variant="contained" color="primary" onClick={onSeeItems}>
        SeeItems
    </Button>
  )
}

export default SeeCertificationItemsButton
