export const useDomain = () => {
  const domain = window.location.host.slice(window.location.host.indexOf('.') + 1)
  const subDomain = window.location.host.split('.')[0]

  return { domain, subDomain }
}

