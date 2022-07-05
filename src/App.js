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
          <AuthRoute path="/profile">
            <MyProfile />
          </AuthRoute>

          {displayFlags && <Route path="/flags" component={FeatureFlagsPage} />}
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </ErrorBoundary>
  )
}
export default App
