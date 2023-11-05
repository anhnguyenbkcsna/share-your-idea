import React from 'react'
import { useRouteError } from 'react-router-dom'
import UnauthorizedPage from './E403'
import NotFoundPage from './E404'
import InternalServerErrorPage from './E500'

const ErrorBoundary = () => {
  const error = useRouteError()
  switch (error.status) {
  case 404:
    return <NotFoundPage />
  case 403:
    return <UnauthorizedPage />
  case 500:
    return <InternalServerErrorPage />
  default:
    return <NotFoundPage />
  }
}

export default ErrorBoundary
