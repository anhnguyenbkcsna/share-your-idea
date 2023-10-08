import { ConfigProvider } from "antd";
import "./App.css";
import CustomizedLayout from "./layout";

import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Sponsor from "./pages/Sponsor/index";
import FormPage from "./pages/Form/index";

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					// Seed Token
					colorPrimary: '#00b96b',
					borderRadius: 2,
					fontFamily: 'Nunito Sans',

					// Alias Token
					// colorBgContainer: '#f6ffed',
				},
			}}
		>
			<BrowserRouter>
				<CustomizedLayout>
					<Routes>
						<Route path="/userform" element={<FormPage />} />
						<Route path="/sponsorform" element={<Sponsor />} />
					</Routes>
					{/* <FormPage /> */}
				</CustomizedLayout>
			</BrowserRouter>
		</ConfigProvider>
	);
}

export default App;
