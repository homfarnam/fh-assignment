import { css } from "@emotion/css"
import styled from "@emotion/styled"

const Form = styled.div`
  background-color: rgb(255 255 255 / 1);
  border-width: 1px;
  max-width: 91.666667%;
  width: 344px;
  height: 168px;
  justify-self: center;
  align-self: center;
  margin-top: 100px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const searchInput = css`
  width: 100%;
  padding-left: 2.5rem;
  padding-right: 2.5rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.5rem;
  border-width: 2px;
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
  caret-color: #000;
  color: black;

  ::placeholder {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }
`

const DatePickers = css`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-top: 5px;

  input {
    width: 100%;
    border-radius: 0.5rem;
    border-width: 2px;
  }
`

const NumberOfGuestsStyle = css`
  width: 60px;
  height: 40px;
  border: 1px solid rgb(209 213 219);
  border-radius: 0.5rem;
  border-width: 2px;
  caret-color: black;
  color: black;
  text-align: center;
`

const SearchButton = css`
  width: 100%;
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;
  background-color: #0077ff;
  font-weight: 700;
  color: white;
  border-radius: 0.5rem;
  padding-top: 0.5rem /* 8px */;
  padding-bottom: 0.5rem /* 8px */;
  padding-left: 1rem /* 16px */;
  padding-right: 1rem /* 16px */;
  :hover {
    --tw-bg-opacity: 1;
    background-color: rgb(29 78 216 / var(--tw-bg-opacity));
  }
`

export { Form, searchInput, DatePickers, NumberOfGuestsStyle, SearchButton }
