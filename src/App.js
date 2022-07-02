import React, { Suspense } from 'react'
import { Switch, Route, AuthRoute, NotFound } from '@fs/zion-router'
import { Tab, Tabs } from '@fs/zion-ui'
import { useFeatureFlag } from '@fs/zion-flags'
import ErrorBoundary from '@fs/zion-error-boundary'
import HomePageSkeleton from './components/example/HomePageSkeleton'
import RelativesAroundMe from './components/example/ram/RelativesAroundMe'

// Dynamically load components to reduce bundle size
// https://reactjs.org/docs/react-api.html#reactlazy

const HomePage = React.lazy(() => import('./components/example/HomePage'))
const UserInfoPage = React.lazy(() => import('./components/example/UserInfoPage'))
const I18nPage = React.lazy(() => import('./components/example/I18nPage'))
const FeatureFlagsPage = React.lazy(() => import('./components/example/FeatureFlagsPage'))
const MyProfile = React.lazy(() => import('./assets/MyProfile'))
const FavoriteMovies = React.lazy(() => import('./components/favorite_movies/FavoriteMoviesPage'))
const VendingMachine = React.lazy(() => import('./components/vending_machine/VendingMachine'))
const DadJokes = React.lazy(() => import('./components/dad_jokes/src/DadJokes'))

function App() {
  const frontier_craTemplate_flagTab = useFeatureFlag('frontier_craTemplate_flagTab')
  const displayFlags = frontier_craTemplate_flagTab.treatment !== 'off' && !frontier_craTemplate_flagTab.isControl
  return (
    <ErrorBoundary>
      <Suspense fallback={<HomePageSkeleton />}>
        <Tabs>
          <Tab title="Home" to="./" />
          <Tab title="User Info" to="/user" />
          <Tab title="I18n" to="/i18n" />
          <Tab title="RAM" to="/ram" />
          <Tab title="My Profile" to="/profile" />
          {displayFlags && <Tab title="flags" to="/flags" />}
        </Tabs>

        <Switch>
          <Route exact path="/" component={HomePage} />
          <AuthRoute path="/user" component={UserInfoPage} />
          <Route path="/i18n" component={I18nPage} />
          <AuthRoute path="/ram" component={RelativesAroundMe} />
          <Route exact path="/profile" component={MyProfile}>
            <Switch>
              <Route path="/profile/favorite-movies" component={FavoriteMovies} />
              <AuthRoute path="/profile/vending-machine" component={VendingMachine} />
              <Route path="/profile/dad-jokes" component={DadJokes} />
            </Switch>
          </Route>
          {displayFlags && <Route path="/flags" component={FeatureFlagsPage} />}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}
export default App
