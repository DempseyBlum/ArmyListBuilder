import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header/header";
import Homepage from "./homepage";
import DetachmentPage from "./detachmentPage";
import FactionPage from "./factionPage";
import DatasheetPage from "./datasheetPage";
import UnitListPage from "./unitListPage";

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
        <div className="page_wrapper">
          <Header title={"Administratum"} />
          {/* <Header title={"Army Builder"} /> */}
          <div className="page_content_wrapper">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/faction/:contentId" element={<FactionPage />} />
              <Route
                path="/detachment/:contentId"
                element={<DetachmentPage />}
              />
              <Route
                path="/faction/:contentId/faction_datasheets/"
                element={<UnitListPage />}
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
