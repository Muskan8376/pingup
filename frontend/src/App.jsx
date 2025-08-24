// import { Route, Routes } from 'react-router'
// import Login from './pages/Login'
// import Feed from './pages/Feed'
// import Messages from './pages/Messages'
// import Chatbox from './pages/Chatbox'
// import Connection from './pages/Connection'
// import Discover from './pages/Discover'
// import Profile from './pages/Profile'
// import CreatePost from './pages/CreatePost'
// import { useUser } from '@clerk/clerk-react'
// import Layout from './pages/Layout'

// const App = () => {
//   const {user} = useUser()
//   return (
//     <>
//       <Routes>
//         {/* Public route */}
//         <Route path="/" element={!user ?<Login /> : <Layout/>} />

//         {/* <Route path='/' element={<Login/>}/> */}

//         {/* App routes */}
//         <Route path="feed" element={<Feed />} />
//         {/* <Route index element={<Feed/>}/> */}
//         <Route path="messages" element={<Messages />} />
//         <Route path="messages/:userId" element={<Chatbox />} />
//         <Route path="connections" element={<Connection />} />
//         <Route path="discover" element={<Discover />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="profile/:profileId" element={<Profile />} />
//         <Route path="create-post" element={<CreatePost />} />
//       </Routes>
//     </>
//   )
// }

// export default App



import { Route, Routes } from "react-router";
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Messages from "./pages/Messages";
import Chatbox from "./pages/Chatbox";
import Discover from "./pages/Discover";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import { useUser } from "@clerk/clerk-react";
import Layout from "./pages/Layout";
import { Toaster } from "react-hot-toast";
import Connections from "./pages/Connections";

const App = () => {
  const { user } = useUser();

  return (
    <>
    <Toaster/>
      <Routes>
        {/* Public route */}
        {!user && <Route path="/" element={<Login />} />}

        {/* Protected routes with Layout */}
        {user && (
          <Route path="/" element={<Layout />}>
            <Route index element={<Feed />} /> {/* Default page */}
            <Route path="feed" element={<Feed />} />
            <Route path="messages" element={<Messages />} />
            <Route path="messages/:userId" element={<Chatbox />} />
            <Route path="connections" element={<Connections />} />
            <Route path="discover" element={<Discover />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/:profileId" element={<Profile />} />
            <Route path="create-post" element={<CreatePost />} />
          </Route>
        )}
      </Routes>
    </>
  );
};

export default App;

