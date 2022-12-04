import './App.css'
import { useState, useEffect } from "react"
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import LoginContainer from './components/LoginFolder/LoginContainer'
import Login from './components/LoginFolder/Login'
import Signup from './components/LoginFolder/Signup'
import Home from './components/Home'
import Profile from './components/UserProfile/Profile'
import MyTrips from './components/MyTripsFolder/MyTrips'
import Explore from './components/ExploreFolder/Explore'
import EditTrip from './components/TripForms/EditTrip'
import EditProfile from './components/UserProfile/EditProfile'
import EditProfileImage from './components/UserProfile/EditProfileImage'
import ViewTrip from './components/MyTripsFolder/ViewTrip'
import TripImageFullPage from './components/MyTripsImages/TripImageFullPage'
import AddTripImages from './components/MyTripsImages/AddTripImages'
import ActivityForm from './components/MyActivities/ActivityForm'

function App() {
  const [user, setUser] = useState("")
  const[publicTrips, setPublicTrips] = useState([])
  const [search, setSearch] = useState("")
  const [refreshPage, setRefreshPage] = useState(false);

  // auto-login if user_id in session from previous login
  useEffect(() => {
    fetch("/auth").then((res) => {
      if (res.ok) {
        res.json().then((userData) => {
          setUser(userData)
          fetchPublicTrips()

        });
      }
    });

  }, [refreshPage]);

  //get all public trip posts to display on explore page
  function fetchPublicTrips () {
    fetch("/trips").then((res) => {
      if (res.ok) {
        res.json().then((tripData) => {
          setPublicTrips(tripData)
        });
      }
    });
  }
  
  console.log(publicTrips)

  if(!user) return <LoginContainer setUser={setUser}/>

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element ={ <Home user={user} setRefreshPage={setRefreshPage}/> } />
        {/* <Route path="login" element ={ <Login /> } />
        <Route path="signup" element ={ <Signup /> } /> */}
        <Route path="user/profile" element ={ <Profile user={user} setUser={setUser}/> } />
        <Route path="user/trips" element ={ <MyTrips user={user} search={search} setSearch={setSearch}/>} />
        <Route path="trips/publicTrips" element ={ <Explore user={user} publicTrips={publicTrips} search={search} setSearch={setSearch}/> } />
        <Route path="trips/:id" element ={ <ViewTrip user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/> } />
        <Route path="trips/:id/images" element ={ <TripImageFullPage user={user} refreshPage={refreshPage} setRefreshPage={setRefreshPage}/> } />
        <Route path="trips/:id/addImages" element ={ <AddTripImages user={user} setRefreshPage={setRefreshPage}/> } />
        <Route path="trips/:id/edit" element ={ <EditTrip setRefreshPage={setRefreshPage} /> } />
        <Route path="user/:id/profile/edit" element ={ <EditProfile setRefreshPage={setRefreshPage} user={user}/> } />
        <Route path="user/:id/profile/editImage" element ={ <EditProfileImage setRefreshPage={setRefreshPage} user={user}/> } />

        <Route path="trip/:tripId/add-activity" element ={ <ActivityForm setRefreshPage={setRefreshPage}/> } />

        <Route path="activities/:activityId/edit" element ={ <ActivityForm setRefreshPage={setRefreshPage}/> } />

      </Routes>
    </div>
  );
}
export default App;
