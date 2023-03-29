import { render, screen, cleanup, fireEvent} from '@testing-library/react';
import Home from './components/Home';

test('home page rendering', () =>{
  render(<Home />)
  expect(screen.getByRole("heading")).toHaveTextContent(/URL Shortner Application/);
  expect(screen.queryByPlaceholderText(/Enter your URL to be shortened/))
  expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
})


test("captures clicks", () => {
  function handleUrlSubmit() {
    done();
  }
  const { getByText } = render(
    <Home onClick={handleUrlSubmit}>Go</Home>
  );
  const node = getByText("Go");
  fireEvent.click(node);
});

afterEach(cleanup);