// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { useAuth } from '@redwoodjs/auth'
import { Router, Route, Set, Private } from '@redwoodjs/router'

import TerritoriesLayout from 'src/layouts/TerritoriesLayout'

import BaseLayout from './layouts/BaseLayout/BaseLayout'
import UserLayout from './layouts/UserLayout/UserLayout'

const Routes = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Router>
      <Set wrap={isAuthenticated ? UserLayout : BaseLayout}>
        <Private unauthenticated="home" roles="admin">
          <Set wrap={TerritoriesLayout}>
            <Route path="/admin/territories/new" page={TerritoryNewTerritoryPage} name="newTerritory" />
            <Route path="/admin/territories/{id}/edit" page={TerritoryEditTerritoryPage} name="editTerritory" />
            <Route path="/admin/territories/{id}" page={TerritoryTerritoryPage} name="territory" />
            <Route path="/admin/territories" page={TerritoryTerritoriesPage} name="territories" />
          </Set>
        </Private>
        <Route prerender path="/about" page={AboutPage} name="about" />
        <Route prerender path="/" page={HomePage} name="home" />
        <Private unauthenticated="home" roles={['user', 'admin']}>
          <Route path="/territory/{id}" page={TerritoryPage} name="territory" />
          <Route path="/my-territories" page={MyTerritoriesPage} name="myTerritories" />
          <Route path="/user-account" page={UserAccountPage} name="userAccount" />
          <Route path="/self-checkout" page={SelfCheckoutPage} name="selfCheckout" />
        </Private>

        <Private unauthenticated="home" roles="admin">
          <Route path="/issue-tracker" page={IssueTrackerPage} name="issueTracker" />
          <Route path="/assign-territory" page={AssignTerritoryPage} name="assignTerritory" />
          <Route path="/records" page={RecordsPage} name="records" />
        </Private>

        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />

      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
