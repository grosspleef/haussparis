/**
 * Performance optimizations injected in <head>
 * This component must be placed before <body> in the layout
 */
export function PerformanceHead() {
  return (
    <>
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* Preload critical font */}
      <link
        rel="preload"
        href="/fonts/Mona-Sans.var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Inline critical CSS for instant above-the-fold rendering */}
      <style
        precedence="default"
        href="critical-css"
        dangerouslySetInnerHTML={{
          __html: `
            @font-face{font-family:'Mona Sans';font-weight:200 900;font-display:swap;font-style:normal;font-stretch:75% 125%;src:url('/fonts/Mona-Sans.var.woff2') format('woff2')}
            html{height:100%;background-color:rgb(10,10,10);font-size:16px;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
            body{display:flex;min-height:100%;flex-direction:column;margin:0;font-family:Mona Sans,ui-sans-serif,system-ui,sans-serif}
            h1{font-family:Mona Sans,ui-sans-serif,system-ui,sans-serif;font-variation-settings:'wdth' 125;font-size:3rem;font-weight:500;line-height:1;letter-spacing:-0.025em;color:rgb(10,10,10)}
            @media (min-width:640px){h1{font-size:4.5rem}}
          `,
        }}
      />
    </>
  )
}
