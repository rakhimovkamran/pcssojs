# pcsso.
A lightweight CSS in JS library that offers maximum flexibility. It allows full configuration to suit your needs and enables seamless integration with your project.

## Quick Start
Create `pcsso.config.ts` file in the root of your project.
```typescript
import { createPCSSO } from "pcssojs";

export const { css, apply, global } = createPCSSO({
  data: {
    colors: {
      gray: "gray",
      red: "red"
    },
    
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
import { css, apply, global, styled } from "pcsso.config.ts"

// Adding global styles using "global"
global((data) => ({
  "*": {
    boxSizing: "border-box"  
  },
  
  body: {
    background: data.colors.gray
  }
}))

// Create style using "css" function
const boxStyle = css((data) => ({
  mx: data.spacings.xl
}))

// Create component using "styled" function
const Button = styled("button", (data) => ({
  background: data.colors.red
}))

const App = () => {
  return (
    <>
      {/* Apply created style using "apply" function */}
      <div className={apply(boxStyle)} />

      {/* Use styled component "Button" */}
      <Button 
        onClick={() => alert("Clicked")}
      >
        Click Me
      </Button>
    </>
  )
}
```