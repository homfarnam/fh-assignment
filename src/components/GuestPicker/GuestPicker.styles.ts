import styled from "@emotion/styled"

const GuestPickerContainer = styled.div`
  width: 100%;
  height: 100%;
  z-index: 1000;
  position: absolute;
  background-color: white;
  top: 0;
  overflow: auto;
  padding: 0.5rem;
  h3 {
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 20px;
  }
`

export { GuestPickerContainer }
