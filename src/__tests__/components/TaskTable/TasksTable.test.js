import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../util/test-utils";
import { camelize } from "../../../lib/api";
import { mockTasks } from "../../mocks/tasks";
import TasksTable from "../../../components/TasksTable/TasksTable";

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
    const labels = ['ID', 'Title', 'Priority', 'Category', 'Status', 'Current user', 'Modification date'];
    const noTasksMessage = 'There is no tasks with status "Open" assigned to group Helpdesk'

    test('displays error message when failed to fetch tasks', () => {
        renderWithProviders(<TasksTable
            error={true}
            tasks={[]}
            labels={labels}
            noTasksMessage={noTasksMessage}
        />, {
            preloadedState: initReduxState
        })
        const errorMessage = screen.getByText('Failed to fetched content');
        expect(errorMessage).toBeInTheDocument();
    });

    test('displays "no tasks..." info if no tasks found', () => {
        renderWithProviders(<TasksTable
            error={false}
            tasks={[]}
            labels={labels}
            noTasksMessage={noTasksMessage}
        />, {
            preloadedState: initReduxState
        })
        const message = screen.getByText(noTasksMessage);
        expect(message).toBeInTheDocument();
    });

    test('displays tasks in table', () => {
        const getPriorityByValue = (priorityValue) => {
            const priority = initReduxState.tasks.priorities.find(p => p.value === priorityValue);
            return priority.name
        };

        renderWithProviders(<TasksTable
            error={false}
            tasks={mockTasks}
            labels={labels}
            noTasksMessage={noTasksMessage}
        />, {
            preloadedState: initReduxState
        })


        mockTasks.forEach(task => {
            labels.forEach(label => {
                const taskPropertyText = label === 'Priority' ? getPriorityByValue(task[camelize(label)]) : task[camelize(label)];
                const taskPropertyElements = screen.getAllByText(taskPropertyText);
                expect(taskPropertyElements.length).toBeGreaterThan(0);
            })
        })
    });
})