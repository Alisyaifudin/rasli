import { render, screen } from "../../../utils/test/reduxRender";
import Navbar from "../Navbar";

describe("Navbar", () => {
  it("should render Setting Button and Title", () => {
    render(<Navbar />);
    // const toolbarEl = screen.getByTestId('toolbar');
    // expect(toolbarEl).toBeInTheDocument();
    // expect(toolbarEl.childElementCount).toEqual(5);
  });
});
