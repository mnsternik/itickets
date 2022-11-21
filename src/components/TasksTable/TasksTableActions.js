import Box from '@mui/material/Box';
import SelectInput from '../../UI/SelectInput';

const TasksTableActions = (props) => {

    const sortingItemChangeHandler = (event) => {
        props.onSortingItemChange(event.target.value)
    };

    const sortingOrderChangeHandler = (event) => {
        props.onSortingOrderChange(event.target.value)
    };

    const filterItemChangeHandler = (event) => {
        props.onFilterItemChange(event.target.value)
    };

    let filterSelect;
    if (props.filterOptions.length) {
        filterSelect = (
            <SelectInput
                label='Filter'
                options={props.filterOptions}
                value={props.filterItem}
                onChange={filterItemChangeHandler}
            />
        )
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mt: 3
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <SelectInput
                    label='Sort by'
                    options={props.labels}
                    value={props.sortingItem}
                    onChange={sortingItemChangeHandler}
                />

                <SelectInput
                    label='Order'
                    options={['Ascending', 'Descending']}
                    value={props.sortingOrder}
                    onChange={sortingOrderChangeHandler}
                />
            </Box>

            {!props.hideFilter && filterSelect}

        </Box>
    )
};

export default TasksTableActions;
