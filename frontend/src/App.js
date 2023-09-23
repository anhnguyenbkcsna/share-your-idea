import { ConfigProvider } from "antd";
import "./App.css";
import CustomizedLayout from "./layout";

// Pages
import FormPage from "./pages/Form";

function App() {
	return (
		<ConfigProvider
			theme={{
				token: {
					// Seed Token
					colorPrimary: '#00b96b',
					borderRadius: 2,

					// Alias Token
					// colorBgContainer: '#f6ffed',
				},
			}}
		>
			<CustomizedLayout>
				<FormPage />
			</CustomizedLayout>
		</ConfigProvider>
	);
}

export default App;
