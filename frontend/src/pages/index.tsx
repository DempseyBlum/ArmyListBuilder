import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header/header";
import Homepage from "./homepage";
import DetachmentPage from "./detachment";
import FactionPage from "./faction";
import DatasheetListPage from "./datasheetListPage";
import DatasheetPage from "./datasheetPage";

// initialize apollo client
const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="w-screen bg-gray-100 h-screen overflow-y-auto">
          <div className="w-4/5 mx-auto mt-4">
            {/* <Header title={"Army Builder"} /> */}
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/faction/:contentId" element={<FactionPage />} />
              <Route
                path="/detachment/:contentId"
                element={<DetachmentPage />}
              />
              <Route
                path="/faction/:contentId/faction_datasheets/"
                element={<DatasheetListPage />}
              />
              <Route
                path="/faction/:contentId/unit/:unitId"
                element={<DatasheetPage />}
              />
            </Routes>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
