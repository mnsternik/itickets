import { screen, render } from "@testing-library/react";
import { renderWithProviders } from "../../util/test-utils";

import Sidebar from "./Sidebar";

describe('Sidebar component', () => {

    const userSectionsTitles = ['tasks', 'actions', 'settings'];
    const admninistrationSectionsTitle = ['administration'];

    const tablesLinksData = [
        { text: 'Assigned to user', path: '/user-tasks' },
        { text: 'Assigned to group', path: '/group-tasks' },
        { text: 'Created by user', path: '/user-created-tasks' },
    ];

    const actionsLinksData = [
        { text: 'Create task', path: '/newtask' },
        { text: 'Search', path: '/search' },
    ];

    const accountLinksData = [
        { text: 'Account', path: '/account' },
    ];

    const administrationLinksData = [
        { text: 'Register user', path: '/register-user' },
        { text: 'Manage users', path: '/manage-users' },
        { text: 'Manage groups ', path: '/manage-groups' },
        { text: 'Manage categories', path: '/manage-categories' }
    ];


    test('displays link sections for non-admin users', async () => {
        const initUserGroupState = {
            auth: {
                userData: {
                    group: 'Helpdesk'
                }
            }
        }


        renderWithProviders(<Sidebar />, {
            preloadedState: initUserGroupState
        })

        userSectionsTitles.forEach(title => {
            const sectionTitle = screen.getByText(title, { exact: false })
            expect(sectionTitle).toBeInTheDocument();
        })
    })

    test('displays link sections for administrators', async () => {
        const initUserGroupState = {
            auth: {
                userData: {
                    group: 'Helpdesk'
                }
            }
        }
        renderWithProviders(<Sidebar />, {
            preloadedState: initUserGroupState
        })

        admninistrationSectionsTitle.forEach(title => {
            const sectionTitle = screen.getByText(title, { exact: false })
            expect(sectionTitle).toBeInTheDocument();
        })
    })
})