import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../util/test-utils";

import TasksTableActions from "../../../components/TasksTable/TasksTableActions";
import { sortTasks } from "../../../components/TasksTable/TasksTableActions";

import * as apiModule from '../../../lib/api';

//import { debug } from 'jest-preview';

import { mockGroups } from "../../mocks/groups";
import { mockUsersList } from "../../mocks/users";
import { mockTasks } from "../../mocks/tasks";
import { mockTaskSlice, mockAuthSlice } from "../../mocks/store";

describe('TaskTableActions.js component', () => {

    describe('SelectInput elements', () => {

        beforeEach(() => {

            const storeState = { ...mockTaskSlice, ...mockAuthSlice }
            const tableDataProps = {
                tasks: [],
                displayedTasks: [],
                selectedStatus: '',
                columns: [],
                noTasksMessage: ''
            };

            jest.spyOn(apiModule, 'readAllGroupsData')
                .mockImplementationOnce((updateFunction) => {
                    Promise.resolve(mockGroups).then(mockGroups => {
                        updateFunction(mockGroups)
                    })
                })

            jest.spyOn(apiModule, 'readAllUsersData')
                .mockImplementationOnce((updateFunction) => {
                    Promise.resolve(mockUsersList).then(mockUsersList => {
                        updateFunction(mockUsersList)
                    })
                })


            renderWithProviders(<TasksTableActions
                viewType='/group-tasks'
                tableData={tableDataProps}
                updateTableData={() => null}
            />, {
                preloadedState: storeState
            })
        });

        test('should display "Sort by" label with default value "Priority"', () => {
            const sortingItemSelect = screen.getByLabelText('Sort by');
            const sortingItemSelectValue = screen.getByText('Priority');
            expect(sortingItemSelect).toBeInTheDocument();
            expect(sortingItemSelectValue).toBeInTheDocument();
        });

        test('should display "Order" label with default value "Descending"', () => {
            const sortingOrderSelect = screen.getByLabelText('Order');
            const sortingOrderSelectValue = screen.getByText('Descending')
            expect(sortingOrderSelect).toBeInTheDocument();
            expect(sortingOrderSelectValue).toBeInTheDocument();
        });

        test('should display "Status" label with default value "In progress"', () => {
            const statusFilterSelect = screen.getByLabelText('Status');
            const statusFilterSelectValue = screen.getByText('In progress')
            expect(statusFilterSelect).toBeInTheDocument();
            expect(statusFilterSelectValue).toBeInTheDocument();
        });

        test('should display "Assigned to group" label with logged user group as defult value', async () => {
            const filterItemSelect = await screen.findByLabelText('Assigned to group');
            const filterItemSelectValue = await screen.findByText('Helpdesk')
            expect(filterItemSelect).toBeInTheDocument();
            expect(filterItemSelectValue).toBeInTheDocument();
        });
    })
})

describe('sortTasks function', () => {

    test('should sort tasks by title in ascending order', () => {
        const sortedTasks = sortTasks(mockTasks, 'Ascending', 'Title');
        expect(sortedTasks[0].title).toEqual('Add search functionality');
        expect(sortedTasks[1].title).toEqual('Automation tests');
        expect(sortedTasks[2].title).toEqual('Write unit test');
    });

    test('should sort tasks by title in descending order', () => {
        const sortedTasks = sortTasks(mockTasks, 'Descending', 'Title');
        expect(sortedTasks[0].title).toEqual('Write unit test');
        expect(sortedTasks[1].title).toEqual('Automation tests');
        expect(sortedTasks[2].title).toEqual('Add search functionality');
    });

    test('should sort tasks by priority in ascending order', () => {
        const sortedTasks = sortTasks(mockTasks, 'Ascending', 'Priority');
        expect(sortedTasks[0].priority).toEqual(1);
        expect(sortedTasks[1].priority).toEqual(2);
        expect(sortedTasks[2].priority).toEqual(2);
    });

    test('should sort tasks by priority in descending order', () => {
        const sortedTasks = sortTasks(mockTasks, 'Descending', 'Priority');
        expect(sortedTasks[0].priority).toEqual(2);
        expect(sortedTasks[1].priority).toEqual(2);
        expect(sortedTasks[2].priority).toEqual(1);
    });

    test('should sort tasks by modification date in ascending order', () => {
        const sortedTasks = sortTasks(mockTasks, 'Ascending', 'Modification date');
        expect(sortedTasks[0].modificationDate).toEqual('12/21/2022, 4:26 AM');
        expect(sortedTasks[1].modificationDate).toEqual('13/21/2022, 2:36 AM');
        expect(sortedTasks[2].modificationDate).toEqual('13/21/2022, 5:36 AM');
    });

    test('should sort tasks by modification date in descending order', () => {
        const sortedTasks = sortTasks(mockTasks, 'Descending', 'Modification date');
        expect(sortedTasks[0].modificationDate).toEqual('13/21/2022, 5:36 AM');
        expect(sortedTasks[1].modificationDate).toEqual('13/21/2022, 2:36 AM');
        expect(sortedTasks[2].modificationDate).toEqual('12/21/2022, 4:26 AM');
    });
});