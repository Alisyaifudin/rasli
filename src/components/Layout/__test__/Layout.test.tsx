import React from "react";
import { render, screen, fireEvent } from "../../../utils/test/reduxRender";
import Layout from "../Layout";
import { createMockRouter } from "../../../utils/test/createMockRouter";
import { RouterContext } from "next/dist/shared/lib/router-context";

const MockChildren = () => {
	return <div>Test</div>;
};

const MockLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<RouterContext.Provider value={createMockRouter({})}>
			<Layout>{children}</Layout>
		</RouterContext.Provider>
	);
};

describe("Layout", () => {
	it("render without crashing", () => {
		render(<MockLayout children={<MockChildren />} />);
	});
  //TODO: Add setting button and title
});
