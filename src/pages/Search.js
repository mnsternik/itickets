import { useSelector } from 'react-redux';

import { Box } from '@mui/system';

const Search = () => {


    const tasks = useSelector(state => state.tasks);

    return (
        <Box>

            <button onClick={() => console.log(tasks)}>log</button>
        </Box>
    );
};

export default Search; 