import { createRoot } from 'react-dom/client'
import { Route, Routes } from 'react-router-dom'
import './styles/main.css'

import React from 'react'
import { Provider } from 'react-redux'
import ErrorBoundary from './components/errors/ErrorBoundary'
import PageOverlay from './components/overlay/PageOverlay'
import ProtectedWrapper from './components/rbac/ProtectedWrapper'
import UnProtectedWrapper from './components/rbac/UnProtectedWrapper'
import CustomRouter from './components/router/CustomBrowserRouter'
import customHistory from './components/router/CustomHistory'
import NotFoundPage from './pages/errors/NotFoundPage'
import store from './redux/store'
import allRoutes, { IRoute } from './utilities/routes.utility'
import { CookiesProvider } from 'react-cookie'

function renderComponent(route: IRoute) {
    if (route.component) {
        if (route.permissions.length > 0) {
            return (
                <ProtectedWrapper>
                    {renderOverlay(
                        React.createElement(route.component),
                        route.overlay
                    )}
                </ProtectedWrapper>
            )
        }
        return (
            <UnProtectedWrapper>
                {renderOverlay(
                    React.createElement(route.component),
                    route.overlay
                )}
            </UnProtectedWrapper>
        )
    }

    if (route.permissions.length > 0)
        return <ProtectedWrapper>{null}</ProtectedWrapper>
    return <UnProtectedWrapper>{null}</UnProtectedWrapper>
}

function renderOverlay(
    element: React.ReactElement,
    overlay: IRoute['overlay']
) {
    if (overlay) return <PageOverlay children={element} />
    return <>{element}</>
}

// ? to be used with react router
// export const router = createBrowserRouter(
//     createRoutesFromElements(
//         <Route
//             path={allRoutes.DEFAULT.url}
//             element={
//                 <UnProtectedWrapper>
//                     <div>
//                         <Outlet />
//                     </div>
//                 </UnProtectedWrapper>
//             }
//             errorElement={<ErrorPage />}
//         >
//             <Route
//                 path={allRoutes.CHATS.url}
//                 element={renderComponent(allRoutes.CHATS.component)}
//             ></Route>

//             <Route
//                 path={allRoutes.LOGIN.url}
//                 element={
//                     <UnProtectedWrapper>
//                         {renderComponent(allRoutes.LOGIN.component)}
//                     </UnProtectedWrapper>
//                 }
//             ></Route>
//         </Route>
//     )
// )

// update react 18
// https://react.dev/blog/2022/03/08/react-18-upgrade-guide
const container = document.getElementById('root')
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(
    <CookiesProvider>
        <Provider store={store}>
            {/* <RouterProvider router={router} /> */}
            <CustomRouter history={customHistory}>
                <ErrorBoundary>
                    <Routes>
                        <Route
                            path={allRoutes.DEFAULT.url}
                            element={<>{renderComponent(allRoutes.DEFAULT)}</>}
                        />
                        <Route
                            path={allRoutes.CHATS.url}
                            element={<>{renderComponent(allRoutes.CHATS)}</>}
                        ></Route>

                        <Route
                            path={allRoutes.LOGIN.url}
                            element={<>{renderComponent(allRoutes.LOGIN)}</>}
                        ></Route>

                        <Route
                            path="*"
                            element={
                                <UnProtectedWrapper>
                                    <NotFoundPage />
                                </UnProtectedWrapper>
                            }
                        />
                    </Routes>
                </ErrorBoundary>
            </CustomRouter>
        </Provider>
    </CookiesProvider>
)
