import { Button } from "@mui/material"
interface ReassignmentButtonProps {
    onReassign: () => void;
  }
const ReassignmentButton:React.FC<ReassignmentButtonProps> = ({onReassign}) => {
  return (
    <Button variant="contained" color="secondary" onClick={onReassign}>
        Reassign
    </Button>
  )
}

export default ReassignmentButton