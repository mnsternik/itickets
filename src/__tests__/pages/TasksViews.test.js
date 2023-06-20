import { fireEvent, render, screen, findByText, getByLabelText } from "@testing-library/react";
import { renderWithProviders } from "../../util/test-utils";

import TasksViews from "../../pages/TasksViews";
import NewTask from "../../pages/NewTask";

const dateFormatter = new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
});

describe('TasksView.js component', () => {

    test('should create a new task and find it in TasksViews', async () => {

        const mockTasks = [];
        const defaultAssignedGroup = { id: 'helpdesk', name: 'Helpdesk' };

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

        renderWithProviders(<NewTask />);

        fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Test title' } });
        fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test description' } });

        const categorySelect = screen.getByLabelText('Category');
        fireEvent.mouseDown(categorySelect);
        const categoryOption = await screen.findByText('Other');
        fireEvent.click(categoryOption);

        const prioritySelect = screen.getByLabelText('Priority');
        fireEvent.mouseDown(prioritySelect);
        const priorityOption = await screen.findByText('2');
        fireEvent.click(priorityOption);

        fireEvent.click(screen.getByText('Send'));

        render(<TasksViews />);

        let newTask = await screen.findByText('Test title');
        expect(newTask).not.toBeInTheDocument();

        const statusSelect = screen.getByLabelText('Status');
        fireEvent.mouseDown(statusSelect);
        const statusOption = await screen.findByText('Open');
        fireEvent.click(statusOption);

        const groupSelect = screen.getByLabelText('Group');
        fireEvent.mouseDown(groupSelect);
        const groupOption = await screen.findByText('Helpdesk');
        fireEvent.click(groupOption);


        newTask = await screen.findByText('Test title');
        expect(newTask).toBeInTheDocument();
    })
})