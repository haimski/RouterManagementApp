import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

interface EditRouterDetailsProps {
    open: boolean;
    showModal: (open: boolean) => void;
    currentRouter?: {
        id: string;
        name: string;
        type: string;
        updatedAt: string;
    };
    handleUpdateRouter: (router: {
        id: string;
        name: string;
        type: string;
        updatedAt: string;
    }) => void;
}

const EditRouterDetails = ({open, showModal, currentRouter, handleUpdateRouter}: EditRouterDetailsProps) => {
    const [routerType, setRouterType] = useState('');
    const [routerName, setRouterName] = useState('');
    const [routerId, setRouterId] = useState('');
    const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleDateString());

    useEffect(() => {
        if (open && currentRouter) {
            setRouterType(currentRouter.type);
            setRouterName(currentRouter.name);
            setRouterId(currentRouter.id);
        }
    }
    , [open, currentRouter]);

    const closeEditRouterModal = () => {
        showModal(false);
    }

    return (
        <Modal
            open={open}
            onClose={() => {}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="edit-router-modal"
        >
            <Box sx={{ width: 400, padding: 2, backgroundColor: 'white', borderRadius: 2, position: 'relative' }}>
                <Button
                    onClick={() => showModal(false)}
                    variant="outlined"
                    color="primary"
                    sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1, border: 'none' }}
                    className="close-button"
                >
                    X
                </Button>
                <Typography className="placeholder-title" id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Edit Router Details
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Router Name"
                        variant="outlined"
                        fullWidth
                        defaultValue={currentRouter?.name || ''}
                        onChange={(e) => setRouterName(e.target.value)}
                    />
                    <TextField
                        select
                        label="Router Type"
                        variant="outlined"
                        fullWidth
                        defaultValue={currentRouter?.type || ''}
                        onChange={(e) => setRouterType(e.target.value)}
                        slotProps={{
                            select: {
                                native: true,
                            },
                        }}
                    >
                        <option value=""></option>
                        <option value="wifi">WiFi</option>
                        <option value="enterprise">Enterprise</option>
                        <option value="home">Home</option>
                    </TextField>
                    <TextField
                        label="Last Updated"
                        variant="outlined"
                        fullWidth
                        value={new Date().toLocaleDateString()}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" sx={{ mt: 3, mr: 2 }}
                    onClick={() => {
                        handleUpdateRouter(
                            { 
                                ...currentRouter, 
                                id: routerId,
                                name: routerName, 
                                type: routerType, 
                                updatedAt: lastUpdated 
                            });
                        showModal(false);
                    } }
                >
                    Update Router
                </Button>
                <Button onClick={() => closeEditRouterModal()} variant="outlined" color="primary" sx={{ mt: 3 }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
  );
}
export default EditRouterDetails;