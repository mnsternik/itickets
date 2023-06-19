import { screen, render } from "@testing-library/react";
import { renderWithProviders } from "./../util/test-utils";
import * as apiModule from './../lib/api';
import { debug } from 'jest-preview';


import GroupTasks from "./GroupTasks";

describe('GroupTasks component ', () => {

    const initGroupTasksState = {
        auth: {
            token: '4Eqfr2LNEjaZWo9WyQMPKKUa3zy1',
            userData: {
                name: 'Andrew Cole',
                group: 'Helpdesk'
            }
        },
        tasks: {
            statuses: [
                { name: 'Open', value: 'open' },
                { name: 'In progress', value: 'inProgress' },
                { name: 'Closed', value: 'closed' },
                { name: 'Failed', value: 'failed' }
            ]
        }
    };

    const mockUser = {
        email: "andrzej@test.pl",
        group: "Helpdesk",
        name: "Andrzej Kowalski",
        uid: "2pQhHsP0l4hxPIwdfIB2OfFz5PY2"
    };

    const mockTasks = [
        {
            author: "John Doe",
            authorId: "12345",
            category: "Testing",
            createDate: "12/21/2022, 4:26 AM",
            currentGroup: "Helpdesk",
            currentUser: "",
            currentUserId: "",
            description: "Test task",
            id: "T1",
            modificationDate: "12/21/2022, 4:26 AM",
            priority: 1,
            status: "Open",
            title: "Write unit test",
        },
        {
            author: "Jane Smith",
            authorId: "67890",
            category: "Development",
            createDate: "13/21/2022, 5:26 AM",
            currentGroup: "Helpdesk",
            currentUser: "",
            currentUserId: "",
            description: "Develop new feature",
            id: "T2",
            modificationDate: "13/21/2022, 5:36 AM",
            priority: 2,
            status: "Open",
            title: "Add search functionality",
        },
    ];

    const mockGroups = [
        { name: 'Helpdesk', id: 'helpdesk' },
        { name: 'Testerzy', id: 'testerzy' }
    ];

    // test('displays info "There is no task..." with status and group info if no tasks returned', async () => {
    //     renderWithProviders(<GroupTasks />, {
    //         preloadedState: initGroupTasksState
    //     })
    //     const t1Title = await screen.findByText("Write unit test", { exact: false });
    //     expect(t1Title).toBeInTheDocument()
    // })


    test('displays tasks in table with title, priority', async () => {

        jest.spyOn(apiModule, 'readAllTasksData')
            .mockImplementationOnce((updateFunction) => {
                Promise.resolve(mockTasks).then(mockTasks => {
                    updateFunction(mockTasks)
                })
            })

        jest.spyOn(apiModule, 'readAllGroupsData')
            .mockImplementationOnce((updateFunction) => {
                Promise.resolve(mockGroups).then(mockGroups => {
                    updateFunction(mockGroups)
                })
            })

        // jest.spyOn(apiModule, 'readUserData')
        //     .mockImplementationOnce((token, updateFunction) => {
        //         Promise.resolve(mockUser).then(mockUser => {
        //             updateFunction(mockUser)
        //         })
        //     })

        renderWithProviders(<GroupTasks />, {
            preloadedState: initGroupTasksState
        })
        mockTasks.forEach(async task => {
            const title = await screen.findByText(task.title)
            expect(title).toBeInTheDocument();
        })

        debug();

    })

})