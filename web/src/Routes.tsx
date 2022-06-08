// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, Set } from '@redwoodjs/router'
import TerritoriesLayout from 'src/layouts/TerritoriesLayout'
import BaseLayout from './layouts/BaseLayout/BaseLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={TerritoriesLayout}>
        <Route path="/admin/territories/new" page={TerritoryNewTerritoryPage} name="newTerritory" />
        <Route path="/admin/territories/{id}/edit" page={TerritoryEditTerritoryPage} name="editTerritory" />
        <Route path="/admin/territories/{id}" page={TerritoryTerritoryPage} name="territory" />
        <Route path="/admin/territories" page={TerritoryTerritoriesPage} name="territories" />
      </Set>
      <Set wrap={BaseLayout}>
        <Route prerender path="/about" page={AboutPage} name="about" />
        <Route prerender path="/" page={HomePage} name="home" />
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
