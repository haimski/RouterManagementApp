import { useRouterFilter } from '../context/RoutersFilterContext';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

const RouterFilterControls = () => {
    const { dispatch } = useRouterFilter();
    const handleRouterTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'SET_ROUTER_TYPE', payload: event.target.value });
    }
    const handleSortOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({ type: 'SET_SORT_BY', payload: event.target.value });
    }
    return (
            <Box sx={{ minWidth: 120, margin: 2 }} className="filter-container">
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Router Type
                    </InputLabel>
                    <NativeSelect
                        defaultValue={'All'}
                        inputProps={{
                            name: 'routerType',
                            id: 'uncontrolled-native',
                        }}
                        onChange={handleRouterTypeChange}
                    >
                        <option value={'all'}>All</option>
                        <option value={'wifi'}>WiFi</option>
                        <option value={'enterprise'}>Enterprise</option>
                        <option value={'home'}>Home</option>
                    </NativeSelect>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Sort By
                    </InputLabel>
                    <NativeSelect
                        defaultValue={'name'}
                        inputProps={{
                            name: 'sortOption',
                            id: 'uncontrolled-native',
                        }}
                        onChange={handleSortOptionChange}
                    >
                        <option value={'name'}>Name</option>
                        <option value={'updatedAt'}>Last Updated</option>
                    </NativeSelect>
                </FormControl>
            </Box>
    )
}
export default RouterFilterControls;