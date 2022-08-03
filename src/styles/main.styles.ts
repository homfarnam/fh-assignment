import { css } from "@emotion/css"
import styled from "@emotion/styled"

const MainDiv = styled.div`
  max-width: 600px;
  background-color: #fff;
  min-height: 640px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  > svg {
    margin: 16px;
    position: absolute;
    top: 0;
    z-index: 99;
  }
  h2 {
    margin: 16px;
    position: absolute;
    top: 120px;
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 36px;
    color: #36424f;
    width: 203px;
  }
`

const inputStyles = css`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

export { MainDiv, inputStyles }
