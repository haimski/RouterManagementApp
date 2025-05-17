import moment from 'moment';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Router {
    id: string;
    name: string;
    type: string;
    updatedAt: string;
}

interface RouterCardProps {
    router: Router;
    handleDetails: (router: Router) => void;
    handleEditDetails: (router: Router) => void;
    handleDeleteRouter: (router: Router) => void;
}

const RouterCard = ({ router, handleDetails, handleEditDetails, handleDeleteRouter }: RouterCardProps) => {
    return (
        <Card sx={{ minWidth: 275, margin: 2 }}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {router.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {router.type}
                </Typography>
                <Typography variant="body2">
                    Last updated: {moment(router.updatedAt).format('DD/MM/YYYY')}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => handleDetails(router)}>More Details</Button>
                <Button size="small" onClick={() => handleEditDetails(router)}>Edit</Button>
                <Button size="small" onClick={() => handleDeleteRouter(router)}>Delete</Button>
            </CardActions>
        </Card>
    );
}

export default RouterCard;