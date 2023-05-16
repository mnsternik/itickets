import { screen, render } from "@testing-library/react";
import TasksTableActions from "./TasksTableActions";

describe('TasksTableActions component', () => {

    //props values from GroupTasks.js component 
    const labels = ['ID', 'Title', 'Priority', 'Category', 'Status', 'Current user', 'Modification date'];
    const filterLabel = 'Group';
    const filterItem = { name: 'Helpdesk', value: 'Helpdesk' };
    const filterOptions = [
        { name: 'Helpdesk', value: 'Helpdesk' },
        { name: 'Testerzy', value: 'Testerzy' }
    ];
    const filteredKey = 'currentGroup'
    const sortingItem = 'Priority';
    const sortingOrder = 'Ascending';
    const statuses = [
        { name: 'Open', value: 'open' },
        { name: 'In progress', value: 'inProgress' },
        { name: 'Closed', value: 'closed' },
        { name: 'Failed', value: 'failed' }
    ];
    const statusFilter = { name: 'Open', value: 'open' };

    // onFilterItemChange = { filterItemChangeHandler }
    // onSortingItemChange = { sortingItemChangeHandler }
    // onSortingOrderChange = { sortingOrderChangeHandler }
    // onStatusFilterChange = { statusFilterChangeHandler }

    test('displays all SelectInputs with default value', () => {

        render(<TasksTableActions
            labels={labels}
            filterLabel={filterLabel}
            filterItem={filterItem}
            filterOptions={filterOptions}
            filteredKey={filteredKey}
            sortingItem={sortingItem}
            sortingOrder={sortingOrder}
            statuses={statuses}
            statusFilter={statusFilter}
        />)

        const sortingItemSelect = screen.getByLabelText('Sort by');
        const sortingItemSelectValue = screen.getByText(sortingItem);

        const sortingOrderSelect = screen.getByLabelText('Order');
        const sortingOrderSelectValue = screen.getByText(sortingOrder)

        const statusFilterSelect = screen.getByLabelText('Status');
        const statusFilterSelectValue = screen.getByText(statusFilter.name)

        const filterItemSelect = screen.getByLabelText(filterLabel);
        const filterItemSelectValue = screen.getByText(filterItem.name)

        expect(sortingItemSelect).toBeInTheDocument();
        expect(sortingItemSelectValue).toBeInTheDocument();

        expect(sortingOrderSelect).toBeInTheDocument();
        expect(sortingOrderSelectValue).toBeInTheDocument();

        expect(statusFilterSelect).toBeInTheDocument();
        expect(statusFilterSelectValue).toBeInTheDocument();

        expect(filterItemSelect).toBeInTheDocument();
        expect(filterItemSelectValue).toBeInTheDocument();
    })
})