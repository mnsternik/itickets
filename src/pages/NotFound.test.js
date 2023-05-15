import { screen, render } from "@testing-library/react";

import { debug } from 'jest-preview';

import * as apiModule from './../lib/api';

import NotFound from "./NotFound";

describe('NotFound component', () => {

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });

    test('displays "page not found" info', () => {
        render(<NotFound />)
        const notFoundInfo = screen.getByText('Page not found');
        expect(notFoundInfo).toBeInTheDocument()
    })

    test('readCategoriesData fetched data correctly', async () => {
        const mockCategories = [
            { name: 'Uprawnienia', id: 'uprawnienia' },
            { name: 'Inne', id: 'inne' }
        ];

        jest
            .spyOn(apiModule, 'readCategoriesData')
            .mockImplementationOnce((updateFunction) => {
                Promise.resolve(mockCategories).then(mockCategories => {
                    updateFunction(mockCategories)
                })
            })

        render(<NotFound />)
        //debug();

        const upr = await screen.findByText('Uprawnienia');
        expect(upr).toBeInTheDocument();
    })
});
