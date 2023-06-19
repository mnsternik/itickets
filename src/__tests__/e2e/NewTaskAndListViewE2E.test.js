import { screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../util/test-utils";
import { act } from "@testing-library/react";

import NewTask from '../../pages/NewTask';
import TaskViews from '../../pages/TasksViews';

import * as apiModule from '../../lib/api';
import { useLocation } from "react-router-dom";

import { debug } from 'jest-preview';

import { mockGroups } from "../mocks/groups";
import { mockCategories } from "../mocks/categories";
import { mockUsersList } from "../mocks/users";
import { mockTaskSlice, mockAuthSlice } from "../mocks/store";

const dateFormatter = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
});

describe('End-to-end test for creating new task and finding in on a list', () => {

    test('Creating new task and finding in on a list', async () => {

        const mockTasks = [];
        const defaultAssignedGroup = { id: 'helpdesk', name: 'Helpdesk' };

        const storeState = { ...mockTaskSlice, ...mockAuthSlice }

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

        jest.spyOn(apiModule, 'readCategoriesData')
            .mockImplementationOnce((updateFunction) => {
                Promise.resolve(mockCategories).then(mockCategories => {
                    updateFunction(mockCategories)
                })
            })


        jest.spyOn(apiModule, 'readDefaultAssignedGroup')
            .mockImplementationOnce((updateFunction) => {
                Promise.resolve(defaultAssignedGroup).then(defaultAssignedGroup => {
                    updateFunction(defaultAssignedGroup)
                })
            })


        jest.spyOn(apiModule, 'readAllTasksData')
            .mockImplementationOnce((updateFunction) => {
                Promise.resolve(mockTasks).then(mockTasks => {
                    updateFunction(mockTasks)
                })
            })


        jest.spyOn(apiModule, 'writeNewTaskData')
            .mockImplementationOnce(() => {
                Promise.resolve({
                    id: 'testId',
                    title: 'Test title',
                    description: 'Test description',
                    priority: 3,
                    category: 'Applications',
                    createDate: dateFormatter.format(new Date()),
                    modificationDate: dateFormatter.format(new Date()),
                    authorId: 'TestAuthorID',
                    author: 'Test author name',
                    status: 'In progress',
                    currentUserId: null,
                    currentUser: null,
                    currentGroup: defaultAssignedGroup
                }).then(newTask => {
                    console.log(newTask);
                    mockTasks.push(newTask);
                })
            })

        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useLocation: () => ({
                pathname: '/group-tasks'
            }),
        }));

        renderWithProviders(
            <>
                <TaskViews />
                <NewTask />
            </>
            , {
                preloadedState: storeState
            })


        debug();

        act(() => {
            fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test title' } });
            fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description' } });
        })

        userEvent.click(screen.getByLabelText('Category'));
        userEvent.click(screen.getByText('Applications'));

        userEvent.click(screen.getByLabelText('Priority'));
        userEvent.click(screen.getByText('3'));

        fireEvent.click(getByRole('button', { name: /Send/i }));

        await waitFor(() => expect(screen.getByText(mockTasks.title)).toBeInTheDocument());
    });

});

