import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../util/test-utils";
import { camelize } from "../../lib/api";
import TasksTable from "./TasksTable2";

describe('TasksTable component ', () => {

    const initReduxState = {
        tasks: {
            priorities: [
                { name: '1 - Low', value: 1 },
                { name: '2 - Medium', value: 2 },
                { name: '3 - High', value: 3 },
                { name: '4 - Very high', value: 4 }
            ],
        }
    };

    //props values
    const labels = ['ID', 'Title', 'Priority', 'Category', 'Status', 'Current user', 'Modification date'];
    const sortingItem = 'Priority';
    const sortingOrder = 'Ascending';
    const noTasksMessage = 'There is no tasks with status "Open" assigned to group Helpdesk'
    const tasks = [
        {
            author: "John Doe",
            authorId: "12345",
            category: "Testing",
            createDate: "12/21/2022, 4:26 AM",
            currentGroup: "Helpdesk",
            currentUser: "James Cole",
            currentUserId: "45453",
            description: "Test task",
            id: "T1",
            modificationDate: "12/21/2022, 4:26 AM",
            priority: 1,
            status: "In progress",
            title: "Write unit test",
        },
        {
            author: "Jane Smith",
            authorId: "67890",
            category: "Development",
            createDate: "13/21/2022, 5:26 AM",
            currentGroup: "Testerzy",
            currentUser: "Abraham Lincoln",
            currentUserId: "43432",
            description: "Develop new feature",
            id: "T2",
            modificationDate: "13/21/2022, 5:36 AM",
            priority: 2,
            status: "Open",
            title: "Add search functionality",
        }
    ];


    test('displays error message when failed to fetch tasks', () => {
        renderWithProviders(<TasksTable
            error={true}
            tasks={[]}
            labels={labels}
            sortingItem={sortingItem}
            sortingOrder={sortingOrder}
            noTasksMessage={noTasksMessage}
        />, {
            preloadedState: initReduxState
        })

        const errorMessage = screen.getByText('Failed to fetched content.');
        expect(errorMessage).toBeInTheDocument();
    });


    test('displays "no tasks..." info if no tasks found', () => {
        renderWithProviders(<TasksTable
            error={false}
            tasks={[]}
            labels={labels}
            sortingItem={sortingItem}
            sortingOrder={sortingOrder}
            noTasksMessage={noTasksMessage}
        />, {
            preloadedState: initReduxState
        })

        const message = screen.getByText(noTasksMessage);
        expect(message).toBeInTheDocument();
    });

    test('displays tasks correctly', () => {

        const getPriorityByValue = (priorityValue) => {
            const priority = initReduxState.tasks.priorities.find(p => p.value === priorityValue);
            return priority.name
        };

        renderWithProviders(<TasksTable
            error={false}
            tasks={tasks}
            labels={labels}
            sortingItem={sortingItem}
            sortingOrder={sortingOrder}
            noTasksMessage={noTasksMessage}
        />, {
            preloadedState: initReduxState
        })

        tasks.forEach(task => {
            labels.forEach(label => {
                const taskProperty = label === 'Priority' ? getPriorityByValue(task[camelize(label)]) : task[camelize(label)];
                expect(screen.getByText(taskProperty)).toBeInTheDocument();
            })
        })
    });
})