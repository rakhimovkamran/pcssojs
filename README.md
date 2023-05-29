# pcsso.
A lightweight CSS in JS library that offers maximum flexibility. It allows full configuration to suit your needs and enables seamless integration with your project.

## Quick Start
Create `pcsso.config.ts` file in the root of your project.
```typescript
import { createPCSSO } from "pcssojs";

export const { css, apply, global } = createPCSSO({
  data: {
    spacings: {
      xl: "2rem"
    }
  },
  
  transformers: {
    mx: (value) => ({
      marginRight: value,
      marginLeft: value
    })
  },
});
```

Then use it in your application
```typescript jsx
import { css, apply } from "pcsso.config.ts"

const boxStyle = css((data) => ({
  mx: data.spacings.xl
}))

const Box = () => {
  return (
    <div className={apply(boxStyle)} />
  )
}
```