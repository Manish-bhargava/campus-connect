import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
import LandingPage from "./components/LandingPage";

import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CancellationRefundPolicy from "./pages/CancellationRefundPolicy";
import Pricing from "./pages/Pricing";
function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          {/* These pages do NOT have the app's NavBar or Footer */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
<Route path="/contact" element={<ContactUs />} />
<Route path="/privacy" element={<PrivacyPolicy />} />
<Route path="/terms" element={<TermsAndConditions />} />
<Route path="/cancellation-refund" element={<CancellationRefundPolicy />} />
<Route path="/pricing" element={<Pricing />} />
          {/* --- PROTECTED ROUTES --- */}
          {/* All app pages go inside this <Route> wrapper. */}
          {/* The <Body /> component will check for auth */}
          {/* and render the NavBar/Footer with the nested content */}
          <Route path="/" element={<Body />}>
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="connections" element={<Connections />} />
            <Route path="requests" element={<Requests />} />
            <Route path="premium" element={<Premium />} />
            <Route path="chat/:targetUserId" element={<Chat />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;