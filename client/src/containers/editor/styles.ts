import styled from "styled-components";

export const EditorDiv = styled.div`
  height: 100%;
  width: 0;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  overflow: hidden;
  transition: 0.5s;
  border-right: 2px solid #ccd6dd;
  text-align: center;
  background-color: #292f33;
  white-space: nowrap;
`;

export const EditTitle = styled.p`
  color: #55acee;
  font-size: 25px;
  margin-top: 15px;
`;

export const WriteArea = styled.textarea`
  margin: auto;
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

export const EditInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 21px;
`;

export const EditPar = styled.p`
  color: #55acee;
  margin-left: 21px;
  text-align: left;
`;

export const CloseButton = styled.span`
  color: white;
  font-size: 20px;
  transition-duration: 0.5s;
  text-align: right;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    color: #55acee;
    cursor: pointer;
  }
`;
