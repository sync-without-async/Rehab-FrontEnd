import { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { createImage } from "../../librarys/api/image.js";
import Conditional from "../Common/Conditional.jsx";

const UploadBox = styled.div`
  color: #878787;
  background-color: #dfdfdf;
  border: 1px solid #ababab;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  white-space: pre-wrap;
  cursor: pointer;
  overflow: hidden;
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  max-width: 240px;
  max-height: 158px;
  object-fit: contain;
`;

const InputImage = ({ onUpload, ...props }) => {
  const [preview, setPreview] = useState(null);
  const ref = useRef(null);

  const handleInputChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      handleUpload(reader.result, file);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async (image, file) => {
    setPreview(image);
    const response = await createImage(file);
    onUpload(response.link);
  };

  const handleClick = () => {
    if (ref) {
      ref.current.click();
    }
  };

  return (
    <UploadBox {...props} onClick={handleClick}>
      <Conditional
        condition={preview !== null}
        content={<ImagePreview src={preview} alt="Image preview" />}
        alternativeContent={"이미지\n등록하기"}
      />
      <HiddenInput ref={ref} type="file" onChange={handleInputChange} />
    </UploadBox>
  );
};

InputImage.propTypes = {
  onUpload: PropTypes.func,
};

export default InputImage;
