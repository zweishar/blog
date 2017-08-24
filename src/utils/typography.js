import Typography from 'typography'
import Alton from 'typography-theme-alton'

Alton.baseFontSize = '20px'
Alton.baseLineHeight = 1.5
Alton.scaleRatio = 2
Alton.includeNormalize = true

const typography = new Typography(Alton)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
