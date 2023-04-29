import { screen, render } from "@testing-library/react";
import SignIn from "./SignIn";

describe('SignIn component', () => {

    test('renders SignIn window', () => {
        render(<SignIn />);
        const signInForm = screen.getByText('sign in', { exact: false });
        expect(signInForm).toBeInTheDocument()
    })
});

