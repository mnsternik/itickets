import { screen, render } from "@testing-library/react";
import { renderWithProviders } from "../../../util/test-utils";

import Sidebar from "../../../components/Sidebar/Sidebar";

describe('Sidebar component', () => {

    const nonAdminLinks = [
        { text: 'Assigned to user', path: '/user-tasks' },
        { text: 'Assigned to group', path: '/group-tasks' },
        { text: 'Created by user', path: '/user-created-tasks' },
        { text: 'Create task', path: '/newtask' },
        { text: 'Search', path: '/search' },
        { text: 'Account', path: '/account' },
    ]

    const adminLinks = [
        { text: 'Register user', path: '/register-user' },
        { text: 'Manage users', path: '/manage-users' },
        { text: 'Manage groups ', path: '/manage-groups' },
        { text: 'Manage categories', path: '/manage-categories' }
    ];


    test('displays link sections for non-admin users', async () => {
        const initUserGroupState = {
            auth: {
                userData: {
                    group: 'Testerzy'
                }
            }
        }
        renderWithProviders(<Sidebar />, {
            preloadedState: initUserGroupState
        })

        nonAdminLinks.forEach(title => {
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

        adminLinks.forEach(title => {
            const sectionTitle = screen.getByText(title, { exact: false })
            expect(sectionTitle).toBeInTheDocument();
        })
    })
})