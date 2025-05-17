import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

interface AddRouterProps {
    open: boolean;
    showModal: (open: boolean) => void;
    handleAddRouter: (router: {
        id: string;
        name: string;
        type: string;
        updatedAt: string;
    }) => void;
}

const AddRouter = ({ open, showModal, handleAddRouter }: AddRouterProps) => {
    const [routerType, setRouterType] = useState('');
    const [routerName, setRouterName] = useState('');
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        if (open) {
            setRouterType('');
            setRouterName('');
            setLastUpdated(new Date().toLocaleDateString());
        }
    }, [open]);

    return (
        <Modal
            open={open}
            onClose={() => {}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="add-router-modal"
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
                    Add New Router
                </Typography>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Router Name"
                        variant="outlined"
                        fullWidth
                        value={routerName}
                        onChange={(e) => setRouterName(e.target.value)}
                    />
                    <TextField
                        select
                        label="Router Type"
                        variant="outlined"
                        fullWidth
                        value={routerType}
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
                        value={lastUpdated}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <Button 
                    variant="contained" 
                    color="primary" sx={{ mt: 3, mr: 2 }}
                    onClick={() => {
                        handleAddRouter({
                            id: Math.random().toString(36).substr(2, 9),
                            name: routerName,
                            type: routerType,
                            updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                        });
                    }
                }
                >
                    Add Router
                </Button>
                <Button onClick={() => showModal(false)} variant="outlined" color="primary" sx={{ mt: 3 }}>
                    Cancel
                </Button>
            </Box>
        </Modal>
    );
}
export default AddRouter;