import styled from "styled-components";

export const EditorDiv = styled.div`
`;

export const EditHeader = styled.p`
  color: #55acee;
  font-size: 25px;
  margin-top: 15px;
`;

export const WriteArea = styled.textarea`
  resize: none;
  padding: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  background-color: #292f33;
  color: #e1e8ed;
  transition-duration: 0.5s;
  border: 1px solid #292f33;

  &:focus {
    outline: none;
    border: 1px solid #ccd6dd;
    border-radius: 5px;
  }
`;

export const SubmitButton = styled.button`
  background-color: #66757d;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  margin-top: 10px;
  transition-duration: 0.5s;

  &:hover {
    background-color: #55acee;
    cursor: pointer;
  }
`;

export const ConfirmText = styled.p`
  margin-top: 20px;
`;

export const HelpButton = styled.button`
  background-color: #66757d;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 16px;
  margin-top: 10px;
  margin-left: 20px;
  transition-duration: 0.5s;

  &:hover {
    background-color: #55acee;
    cursor: pointer;
  }
`;
