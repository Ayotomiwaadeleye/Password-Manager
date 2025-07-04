import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
// import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/dashboard/Dashboard.jsx';
import Vault from './pages/vault/Vault.jsx';
import Profile from './pages/profile/Profile.jsx';
import Settings from './pages/settings/Settings.jsx';
import EditProfile from './pages/editprofile/EditProfile.jsx';
import PasswordGenerator from './pages/generator/Generator.jsx';
import './App.css'

function App() {
  return (
    <div className="total">
      <Routes>
        <Route path="/sign-in/*" element={<SignIn routing="path" path="/sign-in" />} />
        <Route path="/sign-up/*" element={<SignUp routing="path" path="/sign-up" />} />

        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/vault"
          element={
            <>
              <SignedIn>
                <Vault />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <SignedIn>
                <Profile />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <SignedIn>
                <Settings />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <>
              <SignedIn>
                <EditProfile />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
        <Route
          path="/password-generator"
          element={
            <>
              <SignedIn>
                <PasswordGenerator />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
