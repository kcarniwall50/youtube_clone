import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, ThemeProvider } from "@mui/material";
import {
  Navbar,
  Feed,
  SearchFeed,
  ChannelDetail,
  VideoDetail,
} from "./components/index";
import theme from "./utils/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider  theme={theme} >
    <BrowserRouter>
      <Box sx={{
        backgroundColor:"black", 
        color:"white"
        }} >
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
        </Routes>
      </Box>
    </BrowserRouter>
    <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
