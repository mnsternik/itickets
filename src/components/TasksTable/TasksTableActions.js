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
        const newFilter = props.filterOptions.find(item => item.value === event.target.value);
        props.onFilterItemChange(newFilter);
    };

    let filterSelectInput;
    if (props.filterOptions.length) {
        filterSelectInput = (
            <SelectInput
                label={props.filterLabel}
                structure='objects'
                options={props.filterOptions}
                value={props.filterItem.value}
                name={props.filterItem.name}
                onChange={filterItemChangeHandler}
            />
        )
    }


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            mb: 2,
        }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <SelectInput
                    label='Sort by'
                    options={props.labels}
                    value={props.sortingItem}
                    onChange={sortingItemChangeHandler}
                    sx={{ mr: 1 }}
                />

                <SelectInput
                    label='Order'
                    options={['Ascending', 'Descending']}
                    value={props.sortingOrder}
                    onChange={sortingOrderChangeHandler}
                />
            </Box>

            {!props.hideFilter && filterSelectInput}

        </Box>
    )
};

export default TasksTableActions;
